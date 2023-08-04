"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/config";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/store/atoms";
import { fetchDocument } from "@/lib/firebase/utils";
import { User } from "@/types/firestore";

export const useAuthState = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [atomUser, setAtomUser] = useAtom(userAtom);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCurrentUser = async (userId: string) => {
    try {
      const user = await fetchDocument<User>("users", userId);
      setAtomUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setLoading(true);

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await fetchCurrentUser(user.uid);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return [atomUser || user, loading] as [typeof user, boolean];
};
