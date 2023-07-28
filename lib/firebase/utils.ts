import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "./config";
import { omit } from "lodash";

/**
 * Fetch a Firestore document by collection name and document ID
 * @param collection - The name of the collection
 * @param id - The ID of the document
 * @returns The document data
 */
export const fetchDocument = async <T>(collection: string, id: string) => {
  const ref = doc(db, collection, id);
  const docSnap = await getDoc(ref);

  if (!docSnap.exists()) return null;

  return omit(docSnap.data()) as T;
};
