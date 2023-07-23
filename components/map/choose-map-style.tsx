import { atom, useAtom } from "jotai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ButtonMap from "./button-map";
import { Stack } from "@/assets/phosphor-icons";
import Image from "next/image";
import { MapStyleObject, MapStyles } from "@/types/map/generic";
import { entries } from "lodash";
import { cn } from "@/lib/utils";

export const activeMapStyleAtom = atom<MapStyles>("outdoor");

export const mapStyles: MapStyleObject = {
  outdoor: {
    label: "Outdoor",
    url: "https://api.maptiler.com/maps/outdoor-v2/style.json?key=JD0dQfo7nF5PATG7r3XA",
  },
  topo: {
    label: "Topographic",
    url: "https://api.maptiler.com/maps/topo/style.json?key=JD0dQfo7nF5PATG7r3XA",
  },
  satellite: {
    label: "Satellite",
    url: "https://api.maptiler.com/maps/hybrid/style.json?key=JD0dQfo7nF5PATG7r3XA",
  },
};

const ChooseMapStyle = () => {
  const [activeMapStyle, setActiveMapStyle] = useAtom(activeMapStyleAtom);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonMap>
          <Stack className="w-4 h-4" />
        </ButtonMap>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Map style</DialogTitle>
          <DialogDescription>
            Choose a different style to apply to the map
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 grid grid-cols-3 gap-x-4">
          {entries(mapStyles).map(([key, option]) => (
            <button
              key={key}
              className={cn(
                "rounded-md overflow-hidden w-full h-20 relative",
                activeMapStyle === key && "ring-2 ring-ring"
              )}
              onClick={() => setActiveMapStyle(key as MapStyles)}
            >
              <Image
                src={`/${key}-style.png`}
                alt="Outdoor map style"
                fill
                className={cn(
                  key === "satellite" ? "brightness-150" : "brightness-105"
                )}
              />
              <div className="absolute bottom-0 w-full bg-white/40 backdrop-blur-sm p-1">
                <p className="text-sm text-left pl-2">{option.label}</p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseMapStyle;
