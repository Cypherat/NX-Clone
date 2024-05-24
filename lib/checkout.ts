// import { createCheckoutSession } from '@stripe/firestore-stripe-payments';
// import fetchProducts from './fetchProducts'; // Import the fetchProducts function
// import payments from '../lib/stripe';

// // Function to create a checkout session
// const loadCheckout = async (priceId: string) => {
//   try {
//     const session = await createCheckoutSession(payments, {
//       price: priceId,
//       success_url: window.location.origin,
//       cancel_url: window.location.origin,
//     });
//     window.location.assign(session.url);
//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//   }
// };

// // Function to fetch products
// const fetchAndLoadCheckout = async () => {
//   try {
//     // Fetch products
//     const products = await fetchProducts();

//     // Log the fetched products
//     // console.log('Fetched products:', products);

//     // Check if there are any products available
//     if (products.length > 0) {
//       // Use the first price ID to initiate checkout
//       const priceId = products[0]?.prices[0]?.id;
//       if (priceId) {
//         // Call loadCheckout function with the price ID
//         loadCheckout(priceId);
//       } else {
//         console.error('No price ID found for the first product.');
//       }
//     } else {
//       console.error('No products found.');
//     }
//   } catch (error) {
//     console.error('Error fetching and loading checkout:', error);
//   }
// };

// export { loadCheckout, fetchAndLoadCheckout };


import { createCheckoutSession } from '@stripe/firestore-stripe-payments';
import fetchProducts from './fetchProducts'; // Import the fetchProducts function
import { StripePayments, getStripePayments } from '@stripe/firestore-stripe-payments';
import firebaseApp from '../firebase';

// Initialize Stripe Payments with the Firebase app
const payments: StripePayments = getStripePayments(firebaseApp, {
  productsCollection: 'products',
  customersCollection: 'customers',
});

// Function to create a checkout session
const loadCheckout = async (priceId: string) => {
  try {
    const session = await createCheckoutSession(payments, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
    window.location.assign(session.url);
  } catch (error) {
    console.error('Error creating checkout session:', error);
  }
};

// Function to fetch products
const fetchAndLoadCheckout = async () => {
  try {
    // Fetch products
    const products = await fetchProducts();

    // Log the fetched products
    // console.log('Fetched products:', products);

    // Check if there are any products available
    if (products.length > 0) {
      // Use the first price ID to initiate checkout
      const priceId = products[0]?.prices[0]?.id;
      if (priceId) {
        // Call loadCheckout function with the price ID
        loadCheckout(priceId);
      } else {
        console.error('No price ID found for the first product.');
      }
    } else {
      console.error('No products found.');
    }
  } catch (error) {
    console.error('Error fetching and loading checkout:', error);
  }
};

export { loadCheckout, fetchAndLoadCheckout };
