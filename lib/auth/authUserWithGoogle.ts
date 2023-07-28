import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore/lite";
import { fetchDocument } from "../firebase/utils";
import { User } from "@/types/firestore";

export const authUserWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  auth.useDeviceLanguage();
  const result = await signInWithPopup(auth, provider);

  const authUser = result.user;

  const user = await fetchDocument<User>("users", authUser.uid);
  if (user) return user;

  // Add user to db
  const { email, displayName: name, photoURL } = authUser;
  const newUser = {
    email,
    name,
    photoUrl: photoURL,
    providerId: provider.providerId,
    createdAt: Date.now(),
  };

  await setDoc(doc(db, "users", authUser.uid), newUser);

  return { id: authUser.uid, ...newUser } as User;
};
