"use client";

import Map, { enlargeMapAtom } from "@/components/map";
import { useAuthState } from "@/lib/hooks/firebase/useAuthState";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";

export default function MapPage() {
  const enlargeMap = useAtomValue(enlargeMapAtom);

  const [user, loading] = useAuthState();

  return (
    <div className="flex w-full justify-between">
      <div
        className={cn(
          "bg-background flex flex-auto overflow-hidden",
          enlargeMap ? "w-full" : "w-4/6"
        )}
      >
        <Map />
      </div>
      <div
        className={cn(
          "bg-background p-4 flex flex-auto border-l border-slate-200",
          enlargeMap ? "hidden" : "w-2/6"
        )}
      >
        <h1 className="text-xl font-semibold">Discover</h1>
      </div>
    </div>
  );
}
