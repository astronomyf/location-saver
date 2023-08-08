import { MapPin } from "@/assets/phosphor-icons";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import Image from "next/image";

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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-6 h-6 border border-slate-200 rounded-full bg-white cursor-pointer hover:scale-110 transition-transform ease-in-out flex items-center justify-center p-1 shadow-md">
          <MapPin weight="fill" className="w-4 h-4 text-primary" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        className="!p-0 !border-0 !rounded-lg !shadow-lg w-[250px]"
      >
        <div className="w-full h-32 overflow-clip relative rounded-t-lg">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
        <div className="p-2 pb-6">
          <h1 className="font-semibold">{title}</h1>
          <p className="text-slate-400 text-sm">{description}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MarkerCustom;
