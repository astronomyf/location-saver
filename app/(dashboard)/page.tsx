"use client";

import Map, { enlargeMapAtom } from "@/components/map";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";

export default function MapPage() {
  const enlargeMap = useAtomValue(enlargeMapAtom);

  return (
    <div className="flex w-full justify-between gap-x-4">
      <div
        className={cn(
          "bg-background rounded-md flex flex-auto overflow-hidden",
          enlargeMap ? "w-full" : "w-3/4"
        )}
      >
        <Map />
      </div>
      <div
        className={cn(
          "bg-background rounded-md p-4 flex flex-auto",
          enlargeMap ? "hidden" : "w-1/4"
        )}
      >
        <h1>Detail</h1>
      </div>
    </div>
  );
}
