import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore/lite";

export const createUserWithEmail = async (email: string, password: string) => {
  try {
    // Create user
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Add user to db
    await addDoc(collection(db, "users"), {
      email: user.email,
      name: user?.displayName,
      createdAt: Date.now(),
    });
  } catch (err) {
    console.error(err);
    // Add toast here
  }
};
