"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/config";

export const useAuthState = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return [user, loading] as [typeof user, boolean];
};
