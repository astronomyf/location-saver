import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export const signInUserWithEmail = async (email: string, password: string) => {
  try {
    // Sign in user
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};
