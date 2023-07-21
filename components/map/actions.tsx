import {
  Binoculars,
  MagnifyingGlass,
  MapPin,
  Plus,
} from "@/assets/phosphor-icons";
import { Input } from "../ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

const MapActions = () => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { currentTarget, relatedTarget } = e;
    if (!relatedTarget) void setSearchOpen(false);

    const parentInputElement =
      currentTarget.parentElement?.parentElement?.parentElement;

    if (parentInputElement === relatedTarget?.parentElement) return;

    setSearchOpen(false);
  };

  return (
    <div className={cn("flex flex-col", searchOpen && "shadow-md rounded-md")}>
      <Input
        type="text"
        placeholder="Search for a location"
        icon={<MagnifyingGlass className="w-5 h-5" />}
        onFocus={() => setSearchOpen(true)}
        onBlur={handleOnBlur}
        className={cn(
          "focus-visible:!ring-0 focus-visible:!ring-offset-0",
          searchOpen && "!rounded-b-none"
        )}
        containerClassName={cn(
          searchOpen && "!rounded-t-md !rounded-none !shadow-none"
        )}
        actions={[
          {
            icon: (
              <div className="relative">
                <MapPin weight="fill" className="w-5 h-5" />
                <div className="absolute bottom-0 left-3 text-primary w-2.5 h-2.5 bg-white rounded-full flex justify-center items-center">
                  <Plus weight="bold" className="text-primary w-2 h-2" />
                </div>
              </div>
            ),
            tooltipText: "Add a new location",
          },
          {
            icon: <Binoculars weight="fill" className="w-5 h-5" />,
            tooltipText: "Add explorer's levels",
            className: cn(searchOpen && "!rounded-b-none"),
          },
        ]}
      />
      {searchOpen && (
        <ul
          tabIndex={1}
          onBlur={() => setSearchOpen(false)}
          onMouseDown={() => setSearchOpen(true)}
          className="px-3 py-2 bg-background shadow-sm rounded-b-md flex flex-col gap-y-2 border-b border-x border-slate-200"
        >
          <li className="flex gap-x-2 text-sm items-center">
            <MapPin className="w-4 h-4 text-slate-400" weight="fill" />
            <b>Torino</b>
          </li>
        </ul>
      )}
    </div>
  );
};

export default MapActions;
