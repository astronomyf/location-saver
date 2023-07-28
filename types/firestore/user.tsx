import { FirestoreDocument } from ".";

export interface User extends FirestoreDocument {
  email: string;
  name: string;
  photoUrl?: string;
  /** Provider used to authenticate e.g. "google.com" or "email" */
  providerId?: string;
}
