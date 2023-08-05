import {
  BeachIcon,
  DesertIcon,
  ForestIcon,
  VolcanoIcon,
  WaterfallIcon,
} from "@/assets/categories-icons";
import {
  CaretLeft,
  CaretRight,
  Mountains,
  Park,
} from "@/assets/phosphor-icons";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";

const mapCategories = [
  {
    name: "Mountains",
    icon: <Mountains className="w-5 h-5" />,
    colors:
      "bg-yellow-800/10 text-yellow-800 border-yellow-800/30 hover:bg-yellow-800/20 font-medium",
  },
  {
    name: "National Parks",
    icon: <Park className="w-5 h-5" />,
    colors:
      "bg-green-50 text-green-600 border-green-600/30 hover:bg-green-100 font-medium",
  },
  {
    name: "Forests",
    icon: <ForestIcon className="w-4 h-4" />,
    colors:
      "bg-emerald-50 text-emerald-700 border-emerald-700/30 hover:bg-emerald-100 font-medium",
  },
  {
    name: "Beaches",
    icon: <BeachIcon className="w-4 h-4" />,
    colors:
      "bg-yellow-50 text-yellow-600 border-yellow-600/30 hover:bg-yellow-100 font-medium",
  },
  {
    name: "Waterfalls",
    icon: (
      <WaterfallIcon className="w-[16px] h-[16px] text-sky-600 fill-current" />
    ),
    colors:
      "bg-sky-50 text-sky-600 border-sky-600/30 hover:bg-sky-100 font-medium",
  },
  {
    name: "Volcanoes",
    icon: <VolcanoIcon className="w-4 h-4" />,
    colors:
      "bg-red-50 text-red-600 border-red-600/30 hover:bg-red-100 font-medium",
  },
  {
    name: "Deserts",
    icon: <DesertIcon className="w-4 h-4" />,
  },
  {
    name: "Islands",
  },
  {
    name: "Caves",
  },
];

// Add lakes, maybe let's take out the desert icon, add transition to chevrons

const Subnavbar = () => {
  const scrollContainer = useRef<HTMLElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState<boolean>(false);
  const [showRightScroll, setShowRightScroll] = useState<boolean>(true);

  const handleScroll = () => {
    const distance = scrollContainer?.current?.scrollLeft || 0;
    const maxDistance =
      (scrollContainer?.current?.scrollWidth || 0) -
      (scrollContainer?.current?.clientWidth || 0);

    if (distance >= maxDistance) void setShowRightScroll(false);
    if (distance < maxDistance) void setShowRightScroll(true);

    setShowLeftScroll(distance > 0);
  };

  useEffect(() => {
    if (!scrollContainer?.current) return;

    // Access the scrollable container with scrollContainerRef.current
    const scrollContainerElement = scrollContainer.current;
    scrollContainerElement.addEventListener("scroll", handleScroll);

    return () => {
      // Remove the event listener when the component unmounts
      scrollContainerElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full h-fit relative border-b border-slate-200">
      <ScrollContainer
        // @ts-ignore
        ref={scrollContainer}
        className="flex w-full py-2.5 px-6 shadow-sm gap-x-3 overflow-y-hidden pr-24"
      >
        {mapCategories.map(({ colors, icon, name }) => (
          <div
            key={name}
            className={cn(
              "flex items-center justify-center py-0.5 px-2 cursor-pointer rounded-full border-[1.5px] ",
              colors ? colors : "text-gray-800 hover:bg-slate-100"
            )}
          >
            {icon}
            <span className={cn("text-sm whitespace-nowrap", icon && "ml-2")}>
              {name}
            </span>
          </div>
        ))}
        {mapCategories.map(({ colors, icon, name }) => (
          <div
            key={name}
            className={cn(
              "flex items-center justify-center py-0.5 px-2 cursor-pointer rounded-full border-[1.5px] ",
              colors ? colors : "text-gray-800 hover:bg-slate-100"
            )}
          >
            {icon}
            <span className={cn("text-sm whitespace-nowrap", icon && "ml-2")}>
              {name}
            </span>
          </div>
        ))}
      </ScrollContainer>
      {showRightScroll && (
        <div className="absolute top-0 right-0 w-28 h-full bg-gradient-to-l from-white from-55% flex justify-end pr-6">
          <button className="rounded-full border-slate-200 hover:shadow-lg flex justify-center items-center border bg-white w-8 h-8 mt-2">
            <CaretRight weight="bold" className="w-4 h-4" />
          </button>
        </div>
      )}
      {showLeftScroll && (
        <div className="absolute top-0 left-0 w-28 h-full bg-gradient-to-r from-white from-55% flex justify-start pl-6">
          <button className="rounded-full border-slate-200 hover:shadow-lg flex justify-center items-center border bg-white w-8 h-8 mt-2">
            <CaretLeft weight="bold" className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Subnavbar;
