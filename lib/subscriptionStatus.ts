

// import { FirebaseApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import {
//   collection,
//   getFirestore,
//   onSnapshot,
//   query,
//   where,
// } from "firebase/firestore";

// export const getSubscriptionStatus = async (app: FirebaseApp) => {
//   const auth = getAuth(app);
//   const userId = auth.currentUser?.uid;
//   if (!userId) throw new Error("User not logged in");

//   const db = getFirestore(app);
//   const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
//   const q = query(
//     subscriptionsRef,
//     where("status", "in", ["trialing", "active"])
//   );

//   return new Promise<boolean>((resolve, reject) => {
//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         // In this implementation we only expect one active or trialing subscription to exist.
//         console.log("Subscription snapshot", snapshot.docs.length);
//         if (snapshot.docs.length === 0) {
//           console.log("No active or trialing subscriptions found");
//           resolve(false);
//         } else {
//           console.log("Active or trialing subscription found");
//           resolve(true);
//         }
//         unsubscribe();
//       },
//       reject
//     );
//   });
// };


// new try with createDate  THIS WORKS ! BUT NO PLAN SHOWN 
// import { FirebaseApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import {
//   collection,
//   getFirestore,
//   onSnapshot,
//   query,
//   where,
// } from "firebase/firestore";

// interface SubscriptionStatus {
//   active: boolean;
//   created: string | null;
// }

// export const getSubscriptionStatus = async (app: FirebaseApp): Promise<SubscriptionStatus> => {
//   const auth = getAuth(app);
//   const userId = auth.currentUser?.uid;
//   if (!userId) throw new Error("User not logged in");

//   const db = getFirestore(app);
//   const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
//   const q = query(
//     subscriptionsRef,
//     where("status", "in", ["trialing", "active"])
//   );

//   return new Promise<SubscriptionStatus>((resolve, reject) => {
//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         if (snapshot.docs.length === 0) {
//           resolve({ active: false, created: null });
//         } else {
//           const subscription = snapshot.docs[0].data();
//           resolve({ active: true, created: subscription.created });
//         }
//         unsubscribe();
//       },
//       reject
//     );
//   });
// };


import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

interface SubscriptionStatus {
  active: boolean;
  created: string | null;
}

export const getSubscriptionStatus = async (app: FirebaseApp): Promise<SubscriptionStatus> => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User not logged in");

  const db = getFirestore(app);
  const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
  const q = query(
    subscriptionsRef,
    where("status", "in", ["trialing", "active"])
  );

  return new Promise<SubscriptionStatus>((resolve, reject) => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.docs.length === 0) {
          resolve({ active: false, created: null });
        } else {
          const subscription = snapshot.docs[0].data();
          const created = subscription.created ? new Date(subscription.created.seconds * 1000).toISOString() : null;
          resolve({ active: true, created });
        }
        unsubscribe();
      },
      reject
    );
  });
};
