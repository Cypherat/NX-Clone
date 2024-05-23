// import { db } from "../firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const fetchProducts = async () => {
//   const products = [];

//   try {
//     // Log the value of db
//     console.log("Firestore instance:", db);

//     const productsCollection = collection(db, "products");
//     const q = query(productsCollection, where("active", "==", true));
//     const querySnapshot = await getDocs(q);

//     for (const doc of querySnapshot.docs) {
//       const productData = doc.data();
//       const pricesCollection = collection(doc.ref, "prices");
//       const priceSnap = await getDocs(pricesCollection);

//       const prices = priceSnap.docs.map((priceDoc) => ({
//         id: priceDoc.id,
//         ...priceDoc.data(),
//       }));

//       products.push({
//         id: doc.id,
//         ...productData,
//         prices,
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }

//   return products;
// };

// export default fetchProducts;


// new test 

// fetchProducts.ts
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const fetchProducts = async (): Promise<any[]> => {
  const products: any[] = [];

  try {
    // Log the value of db
    console.log('Firestore instance:', db);

    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, where('active', '==', true));
    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      const productData = doc.data();
      const pricesCollection = collection(doc.ref, 'prices');
      const priceSnap = await getDocs(pricesCollection);

      const prices = priceSnap.docs.map((priceDoc) => ({
        id: priceDoc.id,
        ...priceDoc.data(),
      }));

      products.push({
        id: doc.id,
        ...productData,
        prices,
      });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return products;
};

export default fetchProducts;
