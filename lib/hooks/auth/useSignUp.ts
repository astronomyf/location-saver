import { auth } from "@/lib/firebase/config";
import { fetchDocument } from "@/lib/firebase/utils";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { userAtom } from "@/lib/store/atoms";
import { User } from "@/types/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useSignUp = () => {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);

  const [loading, setLoading] = useState<boolean>(false);

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
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    confirmPassword: string
  ) =>
    await authWrapper(async () => {
      setLoading(true);

      if (password !== confirmPassword)
        throw new Error("Passwords do not match");

      const { user: credentials } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = await fetchDocument<User>("users", credentials.uid);
      if (!user) throw new Error("User not found");

      return user;
    });

  return { signUpWithEmail, loading };
};
