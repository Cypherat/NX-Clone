// import { movieState } from "@/atoms/moduleAtom";
// import { db } from "@/firebase";
// import useAuth from "@/hooks/useAuth";
// import { deleteDoc, doc, setDoc } from "firebase/firestore";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useRecoilState } from "recoil";

// function handleList() {
//   const { user } = useAuth();
//   const [addedToList, setAddedToList] = useState(false);
//   const [movie, setMovie] = useRecoilState(movieState);

//   const handleList = async () => {
//     if (addedToList) {
//       await deleteDoc(
//         doc(db, "customers", user!.uid, "myList", movie?.id.toString()!)
//       );

//       toast(
//         `${movie?.title || movie?.original_name} has been removed from My List`,
//         {
//           duration: 8000,
//           // style: toastStyle
//         }
//       );
//     } else {
//       await setDoc(
//         doc(db, "customers", user!.uid, "myList", movie?.id.toString()!),
//         { ...movie }
//       )

//       toast(
//         `${movie?.title || movie?.original_name} has been added from My List`,
//         {
//           duration: 8000,
//           // style: toastStyle
//         }
//       );

//       toast(
//         `${movie?.title || movie?.original_name} has been added to My List`,
//         {
//           duration: 8000,
//           // style: toastStyle
//         }
//       );
//     }

//     setAddedToList(!addedToList);
//   };

//   return handleList;
// }

// export default handleList;
