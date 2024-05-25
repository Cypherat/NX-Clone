import { db } from "@/firebase";
import { Movie } from "@/typings";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

function useList(uid: string | undefined) {
  const [list, setList] = useState<Movie[]>([]);

  useEffect(() => {
    if (!uid) return;

    return onSnapshot(
      collection(db, "customers", uid, "myList"),
      (snapshot) => {
        setList(
          snapshot.docs.map((doc) => {
            const movieData = doc.data() as Movie; // Explicitly cast to Movie
            return movieData;
          })
        );
      }
    );
  }, [db, uid]);

  return list;
}

export default useList;
