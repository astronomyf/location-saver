import {
  Binoculars,
  CircleNotch,
  MagnifyingGlass,
  MapPin,
  Plus,
} from "@/assets/phosphor-icons";
import { Input } from "../ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useDebounce } from "usehooks-ts";
import { useSearchPlaceQuery } from "@/lib/hooks/queries/useSearchPlaceQuery";
import { atom, useAtom } from "jotai";
import Suggestions from "./suggestions";

export const searchOpenAtom = atom<boolean>(false);

const MapActions = () => {
  const [searchOpen, setSearchOpen] = useAtom(searchOpenAtom);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const debouncedQuery = useDebounce(searchQuery, 500);
  const { data, status, isLoading, isFetching } =
    useSearchPlaceQuery(debouncedQuery);

  const suggestions = status === "success" ? data.features : [];
  const loading = isLoading && isFetching;

  const hasSuggestions = searchOpen && searchQuery.length > 2;

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { currentTarget, relatedTarget } = e;
    if (!relatedTarget) void setSearchOpen(false);

    const parentInputElement = currentTarget.closest(
      "#navigation-input-wrapper"
    );

    if (parentInputElement === relatedTarget?.parentElement) return;

    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <div
      id="navigation-input-wrapper"
      className={cn("flex flex-col", hasSuggestions && "shadow-md rounded-md")}
    >
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a location"
        icon={
          loading ? (
            <CircleNotch className="w-5 h-5 animate-spin" />
          ) : (
            <MagnifyingGlass className="w-5 h-5" />
          )
        }
        onFocus={() => setSearchOpen(true)}
        onBlur={handleOnBlur}
        className={cn(
          "focus-visible:!ring-0 focus-visible:!ring-offset-0",
          hasSuggestions && "!rounded-b-none"
        )}
        containerClassName={cn(
          hasSuggestions && "!rounded-t-md !rounded-none !shadow-none"
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
            className: cn(hasSuggestions && "!rounded-b-none"),
          },
        ]}
      />
      <Suggestions data={suggestions} hidden={!hasSuggestions} />
    </div>
  );
};

export default MapActions;
