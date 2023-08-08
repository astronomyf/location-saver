import { MapPin, Mountains, Park } from "@/assets/phosphor-icons";
import Kbd from "../ui/keyboard";
import { isMacOS } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandFooter,
} from "../ui/command";
import { Button } from "../ui/button";
import FlagButton from "./flag-button";
import SearchListItem from "./search-list-item";
import { WaterfallIcon } from "@/assets/categories-icons";
import { IconSearch } from "@tabler/icons-react";

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
          <IconSearch stroke={1.7} className="w-5 h-5" />
        </div>
        <span className="text-slate-400 pl-8 pr-4">
          Search country, location or landmark
        </span>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-x-1">
          <Kbd singleKey={isMacSystem}>{isMacSystem ? "⌘" : "ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </div>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search country, location or landmark" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Popular countries">
            <div className="flex items-center gap-2 flex-wrap px-2">
              <CommandItem unstyled>
                <FlagButton countryCode="us">United States</FlagButton>
              </CommandItem>
              <CommandItem unstyled>
                <FlagButton countryCode="is">Iceland</FlagButton>
              </CommandItem>
              <CommandItem unstyled>
                <FlagButton countryCode="nz">New Zealand</FlagButton>
              </CommandItem>
              <CommandItem unstyled>
                <FlagButton countryCode="tz">Tanzania</FlagButton>
              </CommandItem>
              <CommandItem unstyled>
                <FlagButton countryCode="no">Norway</FlagButton>
              </CommandItem>
              <CommandItem unstyled>
                <FlagButton countryCode="np">Nepal</FlagButton>
              </CommandItem>
              <CommandItem unstyled>
                <FlagButton countryCode="ca">Canada</FlagButton>
              </CommandItem>
            </div>
          </CommandGroup>
          <CommandGroup heading="Search by continent">
            <div className="flex items-center gap-2 flex-wrap px-2">
              <CommandItem unstyled>
                <Button
                  size="sm"
                  variant="outline"
                  className="group-aria-selected:bg-accent"
                >
                  Africa
                </Button>
              </CommandItem>
              <CommandItem unstyled>
                <Button
                  size="sm"
                  variant="outline"
                  className="group-aria-selected:bg-accent"
                >
                  Antarctica
                </Button>
              </CommandItem>
              <CommandItem unstyled>
                <Button
                  size="sm"
                  variant="outline"
                  className="group-aria-selected:bg-accent"
                >
                  Asia
                </Button>
              </CommandItem>
              <CommandItem unstyled>
                <Button
                  size="sm"
                  variant="outline"
                  className="group-aria-selected:bg-accent"
                >
                  Europe
                </Button>
              </CommandItem>
              <CommandItem unstyled>
                <Button
                  size="sm"
                  variant="outline"
                  className="group-aria-selected:bg-accent"
                >
                  North America
                </Button>
              </CommandItem>
              <CommandItem unstyled>
                <Button
                  size="sm"
                  variant="outline"
                  className="group-aria-selected:bg-accent"
                >
                  Oceania
                </Button>
              </CommandItem>
              <CommandItem unstyled>
                <Button
                  size="sm"
                  variant="outline"
                  className="group-aria-selected:bg-accent"
                >
                  South America
                </Button>
              </CommandItem>
            </div>
          </CommandGroup>
          <CommandGroup heading="Trending locations">
            <CommandItem>
              <SearchListItem
                icon={<Mountains />}
                title="Mount Everest"
                description="A mountain in the Hymalayas"
              />
            </CommandItem>
            <CommandItem>
              <SearchListItem
                icon={<Park />}
                title="Yellowstone National Park"
                description="A national park in the United States"
              />
            </CommandItem>
            <CommandItem>
              <SearchListItem
                icon={<WaterfallIcon className="!w-[14px] !h-[14px]" />}
                title="Angels Falls"
                description="A waterfall in Venezuela"
              />
            </CommandItem>
            <CommandItem>
              <SearchListItem
                icon={<MapPin />}
                title="Lofoten Islands"
                description="An archipelago in Norway"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <CommandFooter>
          <div className="flex items-center gap-x-2 select-none">
            <span className="text-xs flex gap-x-2 items-center text-slate-400 font-medium">
              <Kbd className="text-foreground">esc</Kbd> to close
            </span>
            <hr className="h-4 w-[1px] border-0 bg-slate-200 mx-1" />
            <span className="text-xs flex gap-x-2 items-center text-slate-400 font-medium">
              <Kbd className="text-foreground">↑</Kbd>
              <Kbd className="-ml-1 text-foreground">↓</Kbd> to navigate
            </span>
            <hr className="h-4 w-[1px] border-0 bg-slate-200 mx-1" />
            <span className="text-xs flex gap-x-2 items-center text-slate-400 font-medium">
              <Kbd className="text-foreground">↵</Kbd> to select
            </span>
          </div>
        </CommandFooter>
      </CommandDialog>
    </>
  );
};

export default Search;
