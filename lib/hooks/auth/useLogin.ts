import { authUserWithGoogle } from "@/lib/auth/authUserWithGoogle";
import { auth } from "@/lib/firebase/config";
import { fetchDocument } from "@/lib/firebase/utils";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { userAtom } from "@/lib/store/atoms";
import { User } from "@/types/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useLogin = () => {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);

  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const authWrapper = async (fn: () => Promise<User>) => {
    try {
      const user = await fn();

      setUser(user);
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
      setGoogleLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) =>
    await authWrapper(async () => {
      setLoading(true);

      const { user: credentials } = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = await fetchDocument<User>("users", credentials.uid);
      if (!user) throw new Error("User not found");

      return user;
    });

  const signInWithGoogle = async () =>
    await authWrapper(() => {
      setGoogleLoading(true);
      return authUserWithGoogle();
    });

  return { signInWithEmail, signInWithGoogle, loading, googleLoading };
};
