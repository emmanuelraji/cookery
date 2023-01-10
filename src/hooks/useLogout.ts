import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  async function logout() {
    setIsLoading(true);
    setError(null);

    try {
      await signOut(auth);

      // dispatch login action
      dispatch && dispatch({ type: "LOGOUT" });

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

  return { isLoading, logout, error };
};

export default useLogout;
