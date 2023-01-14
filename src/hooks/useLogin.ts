import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  async function login(password: string, email: string) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // console.log("user signed up: ", response);
      if (!response) throw Error;

      // dispatch login action
      dispatch && dispatch({ type: "LOGIN", payload: response.user });

      // update state
      if (!isCancelled) {
        setIsLoading(false);
        setError(null);
      }

      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        if (!isCancelled) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { isLoading, signUp: login, error };
};

export default useLogin;
