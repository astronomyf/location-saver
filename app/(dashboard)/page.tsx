"use client";

import LocationDetails from "@/components/discover/details";
import Map, { enlargeMapAtom } from "@/components/map";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";

export default function MapPage() {
  const enlargeMap = useAtomValue(enlargeMapAtom);

  return (
    <div className="flex w-full justify-between">
      <div
        className={cn(
          "bg-background flex flex-auto overflow-hidden",
          enlargeMap ? "w-full" : "w-3/4"
        )}
      >
        <Map />
      </div>
      <div
        id="map-container"
        className={cn(
          "bg-background p-4 flex flex-auto border-l h-full max-h-[calc(100vh-121px)] overflow-y-scroll border-slate-200 relative z-50 shadow-[-14px_0px_15px_-16px_rgba(0,0,0,0.1)]",
          enlargeMap ? "hidden" : "w-2/4"
        )}
      >
        <LocationDetails />
      </div>
    </div>
  );
}
