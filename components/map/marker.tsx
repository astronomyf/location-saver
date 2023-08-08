import { MapPin } from "@/assets/phosphor-icons";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import Image from "next/image";
import { Button } from "../ui/button";
import { IconBookmark, IconX } from "@tabler/icons-react";
import { PopoverClose } from "@radix-ui/react-popover";

interface MarkerCustomProps {
  title: string;
  description?: string;
  imageUrl: string;
}

const MarkerCustom = ({
  title,
  description = "A location in the world.",
  imageUrl,
}: MarkerCustomProps) => {
  const container = document.getElementById("map");
  if (!container) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="group w-6 h-6 border border-slate-200 rounded-full bg-white cursor-pointer aria-expanded:border-white aria-expanded:scale-110 aria-expanded:bg-primary hover:scale-110 transition-transform ease-in-out flex items-center justify-center p-1 shadow-md">
          <MapPin
            weight="fill"
            className="w-4 h-4 text-primary group-aria-expanded:text-white"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        className="!p-0 !border-0 !rounded-lg !shadow-lg w-[250px] relative"
        container={container}
      >
        <div className="w-full h-32 overflow-clip relative rounded-t-lg border-b border-slate-200">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
        <div className="p-3">
          <h1 className="text-base font-semibold">{title}</h1>
          <p className="text-slate-400 text-sm">{description}</p>

          <div className="flex justify-between gap-x-2 pt-6">
            <Button className="flex-1 whitespace-nowrap">Show details</Button>
            <Button className="w-fit" variant="soft">
              <IconBookmark size={20} className="text-primary" />
            </Button>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <PopoverClose asChild>
            <div className="rounded-full bg-white border border-slate-200 flex justify-center items-center w-6 h-6 shadow-sm cursor-pointer">
              <IconX size={16} />
            </div>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MarkerCustom;
