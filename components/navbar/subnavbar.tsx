import { CaretLeft, CaretRight } from "@/assets/phosphor-icons";
import { cn } from "@/lib/utils";
import { ComponentPropsWithRef, useEffect, useRef, useState } from "react";
import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import {
  BeachIcon,
  ForestIcon,
  LakeIcon,
  VolcanoIcon,
  WaterfallIcon,
} from "@/assets/categories-icons";
import { Park } from "@/assets/phosphor-icons";
import { IconMountain } from "@tabler/icons-react";
import { Transition } from "@headlessui/react";
import { useAtomValue } from "jotai";
import { detailOpenAtom } from "../discover/details";

export const subnavItems = [
  {
    name: "Mountains",
    icon: <IconMountain size={20} stroke={1.7} />,
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
    name: "Lakes",
    icon: <LakeIcon className="w-4 h-4 text-blue-600 fill-current" />,
    colors:
      "bg-blue-50 text-blue-600 border-blue-600/30 hover:bg-blue-100 font-medium",
  },
  {
    name: "Deserts",
  },
  {
    name: "Islands",
  },
  {
    name: "Caves",
  },
];

type ScrollContainerRef = ComponentPropsWithRef<typeof ScrollContainer>["ref"];

const Subnavbar = () => {
  const scrollContainer = useRef<HTMLElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState<boolean>(false);
  const [showRightScroll, setShowRightScroll] = useState<boolean>(true);

  const detailOpen = useAtomValue(detailOpenAtom);

  const SCROLL_AMOUNT = 800;

  const handleScroll = () => {
    const distance = scrollContainer?.current?.scrollLeft || 0;
    const maxDistance =
      (scrollContainer?.current?.scrollWidth || 0) -
      (scrollContainer?.current?.clientWidth || 0);

    if (distance >= maxDistance) void setShowRightScroll(false);
    if (distance < maxDistance) void setShowRightScroll(true);

    setShowLeftScroll(distance > 0);
  };

  const handleRightScroll = () => {
    scrollContainer.current?.scrollBy({
      left: SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  const handleLeftScroll = () => {
    scrollContainer.current?.scrollBy({
      left: -SCROLL_AMOUNT,
      behavior: "smooth",
    });
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
    <Transition
      show={!detailOpen}
      enter="transform transition-all duration-300"
      enterFrom="-translate-y-full opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transform transition-all duration-300"
      leaveFrom="translate-y-0 opacity-100"
      leaveTo="-translate-y-full opacity-0"
      className="absolute -bottom-[48px] left-0 max-w-[100vw]"
    >
      <div className="w-full h-fit bg-white relative border-b border-slate-200">
        <ScrollContainer
          ref={scrollContainer as ScrollContainerRef}
          className="flex w-full py-2.5 px-6 shadow-sm gap-x-3 overflow-y-hidden pr-24"
        >
          {subnavItems.map(({ colors, icon, name }) => (
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
          {subnavItems.map(({ colors, icon, name }) => (
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
        <div
          className={cn(
            "absolute top-0 right-0 w-28 h-full bg-gradient-to-l from-white from-55% flex justify-end pr-6 transition-opacity ease-in-out duration-200",
            showRightScroll ? "visible opacity-100" : "invisible opacity-0"
          )}
        >
          <button
            onClick={handleRightScroll}
            className="rounded-full border-slate-200 hover:shadow-lg flex justify-center items-center border bg-white w-8 h-8 mt-2"
          >
            <CaretRight weight="bold" className="w-4 h-4" />
          </button>
        </div>

        <div
          className={cn(
            "absolute top-0 left-0 w-28 h-full bg-gradient-to-r from-white from-55% flex justify-start pl-6 transition-opacity ease-in-out duration-200",
            showLeftScroll ? "visible opacity-100" : "invisible opacity-0"
          )}
        >
          <button
            onClick={handleLeftScroll}
            className="rounded-full border-slate-200 hover:shadow-lg flex justify-center items-center border bg-white w-8 h-8 mt-2"
          >
            <CaretLeft weight="bold" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Transition>
  );
};

export default Subnavbar;
