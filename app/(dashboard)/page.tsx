"use client";

import LocationDetails from "@/components/discover/details";
import PopularDestinations from "@/components/discover/popular-destinations";
import Map, { enlargeMapAtom } from "@/components/map";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";

export default function MapPage() {
  const enlargeMap = useAtomValue(enlargeMapAtom);

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
      <ScrollContainer className="absolute bottom-5 pb-2 left-0 pl-6 h-fit w-full">
        <PopularDestinations />
      </ScrollContainer>
      <LocationDetails />
    </div>
  );
}
