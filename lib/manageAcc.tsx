import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

export const getPortalUrl = async (app: FirebaseApp): Promise<string> => {
    const auth = getAuth(app);
    const user = auth.currentUser;
  
    let dataWithUrl: any;
    try {
      const functions = getFunctions(app, "europe-west3");
      const functionRef = httpsCallable(
        functions,
        "ext-firestore-stripe-payments-createPortalLink"
      );
      const { data } = await functionRef({
        customerId: user?.uid,
        returnUrl: window.location.origin,
      });
  
      // Add a type to the data
      dataWithUrl = data as { url: string };
      console.log("Reroute to Stripe portal: ", dataWithUrl.url);
    } catch (error) {
      console.error(error);
    }
  
    return new Promise<string>((resolve, reject) => {
      if (dataWithUrl.url) {
        resolve(dataWithUrl.url);
      } else {
        reject(new Error("No url returned"));
      }
    });
  };