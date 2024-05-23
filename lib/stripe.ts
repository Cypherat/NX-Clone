// import {
//     createCheckoutSession,
//     getStripePayments,
//   } from '@stripe/firestore-stripe-payments'
//   import { getFunctions, httpsCallable } from '@firebase/functions'
//   import app from '../firebase'
  

//   const payments = getStripePayments(app, {
//     productsCollection: 'products',
//     customersCollection: 'customers'
//   })

//   const loadCheckout = async (priceId: string) => {
//     await createCheckoutSession(payments, {
//         price: priceId,
//         success_url: window.location.origin,
//         cancel_url: window.location.origin,
//     }).then((snapshot) => window.location.assign(snapshot.url)).catch((error) => console.log(error.message))
//   }

//   export { loadCheckout }
//   export default payments
// // old code 

// new test 

// import { createCheckoutSession, getStripePayments } from '@stripe/firestore-stripe-payments';
// import { getFunctions, httpsCallable } from '@firebase/functions';
// import app from '../firebase';
// import { db } from '../firebase'; // Import the Firestore instance

// // Initialize Stripe payments with Firestore instance
// const payments = getStripePayments(app, {
//   productsCollection: 'products',
//   customersCollection: 'customers'
// });

// // Type guard to check if error is an instance of Error
// function isErrorWithMessage(error: unknown): error is { message: string } {
//   return (
//     typeof error === 'object' &&
//     error !== null &&
//     'message' in error &&
//     typeof (error as any).message === 'string'
//   );
// }

// const loadCheckout = async (priceId: string) => {
//   try {
//     const session = await createCheckoutSession(payments, {
//       price: priceId,
//       success_url: window.location.origin,
//       cancel_url: window.location.origin,
//     });
//     window.location.assign(session.url);
//   } catch (error) {
//     if (isErrorWithMessage(error)) {
//       console.error('Error creating checkout session:', error.message);
//     } else {
//       console.error('Unknown error:', error);
//     }
//   }
// };

// export { loadCheckout };
// export default payments;


// try from github 

// import {
//   createCheckoutSession,
//   getStripePayments,
// } from '@stripe/firestore-stripe-payments'
// import { getFunctions, httpsCallable } from '@firebase/functions'
// import app from '../firebase'

// const payments = getStripePayments(app, {
//   productsCollection: 'products',
//   customersCollection: 'customers',
// })

// const loadCheckout = async (priceId: string) => {
//   await createCheckoutSession(payments, {
//     price: priceId,
//     success_url: window.location.origin,
//     cancel_url: window.location.origin,
//   })
//     .then((snapshot) => window.location.assign(snapshot.url))
//     .catch((error) => console.log(error.message))
// }

// const goToBillingPortal = async () => {
//   const instance = getFunctions(app, 'us-central1')
//   const functionRef = httpsCallable(
//     instance,
//     'ext-firestore-stripe-payments-createPortalLink'
//   )

//   await functionRef({
//     returnUrl: `${window.location.origin}/account`,
//   })
//     .then(({ data }: any) => window.location.assign(data.url))
//     .catch((error) => console.log(error.message))
// }

// export { loadCheckout, goToBillingPortal }
// export default payments

// with fetchfile 


import { collection, addDoc, doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';

const createCheckoutSession = async (priceId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user found.');

  const uid = user.uid;

  // Create a checkout session in Firestore
  const col = collection(db, 'customers', uid, 'checkout_sessions');
  const docRef = await addDoc(col, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });

  
// Listen for the checkout session to be created and fetch the URL

return new Promise<string>((resolve, reject) => {
    const unsub = onSnapshot(doc(db, 'customers', uid, 'checkout_sessions', docRef.id), (snap) => {
      const data = snap.data();
      if (data?.url) {
        unsub();
        resolve(data.url);
      } else if (data?.error) {
        unsub();
        reject(new Error(`An error occurred: ${data.error.message}`));
      }
    });
  });
};

export default createCheckoutSession;