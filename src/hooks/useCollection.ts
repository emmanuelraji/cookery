import { useEffect, useRef, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  Query,
  WhereFilterOp,
  orderBy,
  OrderByDirection,
} from "firebase/firestore";

export const useCollection = (
  c: string,
  _q: [string, WhereFilterOp, string],
  _o: [string, OrderByDirection]
) => {
  const [documents, setDocuments] = useState<[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // set up query
  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const q = useRef(_q).current;
  const o = useRef(_o).current;

  useEffect(() => {
    let ref: Query = collection(db, c);

    if (q) {
      // declare tuple instead of array
      const tuple: [string, WhereFilterOp, string] = [...q];
      ref = query(ref, where(...tuple));
    }
    if (o) {
      // declare tuple instead of array
      const tuple: [string, OrderByDirection] = [...o];
      ref = query(ref, orderBy(...tuple));
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        let results: any = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [c, q, o]);

  return { documents, error };
};
