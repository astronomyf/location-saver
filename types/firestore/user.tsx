import { FirestoreDocument } from ".";

export interface User extends FirestoreDocument {
  email: string;
  name: string;
  photoUrl?: string;
}
