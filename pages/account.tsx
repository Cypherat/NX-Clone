// import Head from "next/head"
// import Link from "next/link"
// import { getSubscriptionStatus } from "@/lib/subscriptionStatus"
// import useAuth from "@/hooks/useAuth"
// import { getAuth } from "firebase/auth";
// import { FirebaseApp } from "firebase/app";
// import { getFunctions, httpsCallable } from "firebase/functions";

// // function Account() {
// //   const {user} = useAuth()
// //     const subscriptionStatus = getSubscriptionStatus(user)
// // // fk that

// export const getPortalUrl = async (app: FirebaseApp): Promise<string> => {
//   const auth = getAuth(app);
//   const user = auth.currentUser;

//   let dataWithUrl: any;
//   try {
//     const functions = getFunctions(app, "nam5");
//     const functionRef = httpsCallable(
//       functions,
//       "ext-firestore-stripe-payments-createPortalLink"
//     );
//     const { data } = await functionRef({
//       customerId: user?.uid,
//       returnUrl: window.location.origin,
//     });

//     // Add a type to the data
//     dataWithUrl = data as { url: string };
//     console.log("Reroute to Stripe portal: ", dataWithUrl.url);
//   } catch (error) {
//     console.error(error);
//   }

//   return new Promise<string>((resolve, reject) => {
//     if (dataWithUrl.url) {
//       resolve(dataWithUrl.url);
//     } else {
//       reject(new Error("No url returned"));
//     }
//     return (
//       <div><Head>
//       <title>Account Settings - Netflix</title>
//       <link rel="icon" href='/nxIconGreen.ico' />
//     </Head>
//     <header className={`bg-[#141414]`}>
//           <Link href="/">
//             <img
//               src="https://rb.gy/ulxxee"
//               width={120}
//               height={120}
//               className="cursor-pointer object-contain"
//             />
//           </Link>
//           <Link href="/account">
//             <img
//               src="https://rb.gy/g1pwyx"
//               alt=""
//               className="cursor-pointer rounded"
//             />
//           </Link>
//         </header>

//       <main className="pt-24">
//           <div>
//               <h1 className="text-3xl md:text-4xl">Account</h1>
//           </div>
//           <img src="" alt="" />
//           <p>Member since {getSubscriptionStatus.}</p>
//       </main>

//     </div>
//     )
//   });
// };

// new try with subscription created

// import Head from "next/head";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { getSubscriptionStatus } from "@/lib/subscriptionStatus";
// import useAuth from "@/hooks/useAuth";
// import { FirebaseApp, initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFunctions, httpsCallable } from "firebase/functions";
// import { firebaseConfig } from "../firebase";

// const app = initializeApp(firebaseConfig);

// function Account() {
//   const { user, logout } = useAuth();
//   const [subscriptionStatus, setSubscriptionStatus] = useState<{ active: boolean; created: string | null }>({
//     active: false,
//     created: null,
//   });

//   useEffect(() => {
//     if (user) {
//       getSubscriptionStatus(app)
//         .then((status) => setSubscriptionStatus(status))
//         .catch((error) => console.error("Error fetching subscription status:", error));
//     }
//   }, [user]);

//   const getPortalUrl = async () => {
//     const auth = getAuth(app);
//     const user = auth.currentUser;

//     try {
//       const functions = getFunctions(app, "nam5");
//       const functionRef = httpsCallable(functions, "ext-firestore-stripe-payments-createPortalLink");
//       const { data } = await functionRef({
//         customerId: user?.uid,
//         returnUrl: window.location.origin,
//       });

//       const dataWithUrl = data as { url: string };
//       console.log("Reroute to Stripe portal: ", dataWithUrl.url);
//       return dataWithUrl.url;
//     } catch (error) {
//       console.error(error);
//       throw new Error("Error creating portal link");
//     }
//   };

//   return (
//     <div>
//       <Head>
//         <title>Account Settings - Netflix</title>
//         <link rel="icon" href="/nxIconGreen.ico" />
//       </Head>
//       <header className="bg-[#141414]">
//         <Link href="/">
//           <img
//             src="https://rb.gy/ulxxee"
//             width={120}
//             height={120}
//             className="cursor-pointer object-contain"
//           />
//         </Link>
//         <Link href="/account">
//           <img
//             src="https://rb.gy/g1pwyx"
//             alt=""
//             className="cursor-pointer rounded"
//           />
//         </Link>
//       </header>

//       <main className="pt-24">
//         <div>
//           <h1 className="text-3xl md:text-4xl">Account</h1>
//         </div>
//         <img src="" alt="" />
//         <p>Member since {subscriptionStatus.created.}</p>
//         <button onClick={logout}>Sign out of all devices</button>
//       </main>
//     </div>
//   );
// }

// export default Account;

// test with date
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSubscriptionStatus } from "@/lib/subscriptionStatus";
import useAuth from "@/hooks/useAuth";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseConfig } from "../firebase";
import { GetStaticProps } from "next";
import { Product, getProducts, getStripePayments } from "@stripe/firestore-stripe-payments";
import firebaseApp from '../firebase';
import { useRouter } from "next/router";
import { getPortalUrl } from "@/lib/manageAcc";

const app = initializeApp(firebaseConfig);

function Account() {
  const { user, logout } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    active: boolean;
    created: string | null;
  } | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      getSubscriptionStatus(app)
        .then((status) => setSubscriptionStatus(status))
        .catch((error) =>
          console.error("Error fetching subscription status:", error)
        );
    }
  }, [user]);

  const handleManageSubscription = async () => {
    try {
      const portalUrl = await getPortalUrl(app);
      router.push(portalUrl);
      console.log("Manage Subscription");
    } catch (error) {
      console.error("Error opening subscription portal:", error);
    }
  };

  return (
    <div>
      <Head>
        <title>Account Settings - Netflix</title>
        <link rel="icon" href="/nxIconGreen.ico" />
      </Head>
      <header className="bg-[#141414]">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            width={120}
            height={120}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </header>

      <main className="pt-24">
        <div>
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" />
            <p className="text-xs font-semibold text-[#555]">Member since:</p>
            {subscriptionStatus &&
            typeof subscriptionStatus.created === "string" ? (
              <p>{subscriptionStatus.created}</p>
            ) : (
              <p className="text-xs font-semibold text-[#555]">
                No membership start date is available at the moment. Firebase
                and Google Cloud services are actively working to resolve the
                issues with the Stripe imports.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleManageSubscription}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Manage Subscription
          </button>
        </div>

        {/* <Membership/> */}

        <div>
          <h4>Plan Details</h4>
          {/* Find the current Plan */}
          <div>
            
          </div>
        </div>
      </main>
    </div>
  );
}

export default Account;
