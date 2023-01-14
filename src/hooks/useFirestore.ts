import { useReducer, useEffect, useState } from "react";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  DocumentData,
} from "firebase/firestore";
import { db, timestamp } from "../lib/firebase";
import { useAuthContext } from "./useAuthContext";

type firestoreState = {
  document: any | null;
  isPending: boolean;
  error: string | null;
  success: boolean | null;
};

type firestoreAction = {
  type: string;
  payload?: any;
};

const firestoreReducer = (state: firestoreState, action: firestoreAction) => {
  switch (action.type) {
    case "IS_PENDING":
      return { success: false, isPending: true, error: null, document: null };
    case "ERROR":
      return {
        success: false,
        isPending: false,
        error: action.payload,
        document: null,
      };
    case "ADDED_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: action.payload,
      };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null };
    default:
      return state;
  }
};

export const useFirestore = (c: string) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [response, dispatch] = useReducer(firestoreReducer, {
    document: null,
    isPending: false,
    error: null,
    success: null,
  });

  // current user
  const { user } = useAuthContext();

  // collection ref
  const ref = collection(db, c);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action: firestoreAction) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (doc: DocumentData) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await addDoc(ref, {
        ...doc,
        uid: user.uid,
        createdAt,
      });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
      }
    }
  };

  // delete a document
  const deleteDocument = async (id: string) => {
    dispatch({ type: "IS_PENDING" });

    try {
      // get reference to the document in our db
      const ref = doc(db, "foodstuffs", id);
      const deletedDocument = await deleteDoc(ref);

      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
        payload: deletedDocument,
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
