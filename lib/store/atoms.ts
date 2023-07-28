import { User } from "@/types/firestore";
import { atom } from "jotai";
import { auth } from "../firebase/config";

// Auth
export const userAtom = atom<User | null>(null);
