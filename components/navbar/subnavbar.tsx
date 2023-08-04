import {
  BeachIcon,
  DesertIcon,
  ForestIcon,
  VolcanoIcon,
  WaterfallIcon,
} from "@/assets/categories-icons";
import { CaretRight, Mountains, Park } from "@/assets/phosphor-icons";
import { cn } from "@/lib/utils";
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

// Add lakes, maybe let's take out the desert icon

const Subnavbar = () => {
  return (
    <div className="w-full h-fit relative">
      <ScrollContainer className="flex w-full border-b border-slate-200 py-2.5 px-6 shadow-sm gap-x-3 overflow-y-hidden pr-24">
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
      <div className="absolute top-0 right-0 w-28 h-full bg-gradient-to-l from-white from-55% flex justify-end pr-6">
        <button className="rounded-full border-slate-200 hover:shadow-lg flex justify-center items-center border bg-white w-8 h-8 mt-2">
          <CaretRight weight="bold" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Subnavbar;
