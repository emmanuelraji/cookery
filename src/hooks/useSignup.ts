import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { updateProfile } from "firebase/auth";

const useSignUp = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  async function signUp(password: string, email: string, displayName: string) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log('user signed up: ', response);

      if (!response) throw Error;

      // add display name to user
      updateProfile(response.user, {
        displayName: displayName,
      });

      // dispatch login action
      dispatch && dispatch({ type: "LOGIN", payload: response });

      // update state
      if (!isCancelled) {
        setIsLoading(false);
        setError(null);
      }

      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        const message = error.message;
        if (!isCancelled) {
          setError(message);
          setIsLoading(false);
        }
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { isLoading, signUp, error };
};

export default useSignUp;
