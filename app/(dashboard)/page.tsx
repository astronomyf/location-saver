"use client";

import LocationDetails from "@/components/discover/details";
import PopularDestinations from "@/components/discover/popular-destinations";
import Map, { enlargeMapAtom } from "@/components/map";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { useRef } from "react";

export default function MapPage() {
  const enlargeMap = useAtomValue(enlargeMapAtom);
  const detailContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full justify-between relative">
      <div
        className={cn(
          "bg-background flex flex-auto overflow-hidden",
          enlargeMap ? "w-full" : "w-4/6"
        )}
      >
        <Map />
      </div>
      <div className="absolute bottom-6 left-6 max-w-[calc(100%-24px)] overflow-x-scroll">
        <PopularDestinations />
      </div>
      {/* <div
        id="detail-container"
        ref={detailContainerRef}
        className={cn(
          "bg-background p-4 flex flex-auto border-l h-full max-h-[calc(100vh-121px)] overflow-y-scroll border-slate-200 relative z-50 shadow-[-14px_0px_15px_-16px_rgba(0,0,0,0.1)]",
          enlargeMap ? "hidden" : "w-2/6"
        )}
      >
        <LocationDetails containerRef={detailContainerRef} />
      </div> */}
    </div>
  );
}
