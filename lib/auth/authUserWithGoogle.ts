import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore/lite";

export const authUserWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();

    auth.useDeviceLanguage();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    // Add user to db
    await addDoc(collection(db, "users"), {
      email: user.email,
      name: user?.displayName,
      photoURL: user?.photoURL,
      createdAt: Date.now(),
    });
  } catch (err) {
    console.error(err);
    // Add toast here
  }
};
