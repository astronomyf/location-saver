import { MagnifyingGlass } from "@/assets/phosphor-icons";
import Kbd from "../ui/keyboard";
import { isMacOS } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from "../ui/command";
import { Button } from "../ui/button";
import FlagButton from "./flag-button";

const Search = () => {
  const [open, setOpen] = useState<boolean>(false);
  const isMacSystem = isMacOS();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full px-4 py-2 rounded-full select-none cursor-pointer bg-white border border-slate-200 hover:shadow-sm relative flex items-center"
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <MagnifyingGlass className="w-5 h-5" />
        </div>
        <span className="text-slate-400 pl-8 pr-4">
          Search country, location or landmark
        </span>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-x-1">
          <Kbd singleKey={isMacSystem}>{isMacSystem ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </div>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search country, location or landmark" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Popular countries">
            <div className="flex items-center gap-2 flex-wrap px-2">
              <FlagButton countryCode="us">United States</FlagButton>
              <FlagButton countryCode="is">Iceland</FlagButton>
              <FlagButton countryCode="nz">New Zealand</FlagButton>
              <FlagButton countryCode="tz">Tanzania</FlagButton>
              <FlagButton countryCode="no">Norway</FlagButton>
              <FlagButton countryCode="np">Nepal</FlagButton>
              <FlagButton countryCode="ca">Canada</FlagButton>
            </div>
          </CommandGroup>
          <CommandGroup heading="Search by continent">
            <div className="flex items-center gap-2 flex-wrap px-2">
              <Button size="sm" variant="outline">
                Africa
              </Button>
              <Button size="sm" variant="outline">
                Antarctica
              </Button>
              <Button size="sm" variant="outline">
                Asia
              </Button>
              <Button size="sm" variant="outline">
                Europe
              </Button>
              <Button size="sm" variant="outline">
                North America
              </Button>
              <Button size="sm" variant="outline">
                Oceania
              </Button>
              <Button size="sm" variant="outline">
                South America
              </Button>
            </div>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Search;
