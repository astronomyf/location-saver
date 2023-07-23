import {
  Binoculars,
  CircleNotch,
  MagnifyingGlass,
  MapPin,
  Plus,
  X,
} from "@/assets/phosphor-icons";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useDebounce } from "usehooks-ts";
import { useSearchPlaceQuery } from "@/lib/hooks/queries/useSearchPlaceQuery";
import { atom, useAtom, useSetAtom } from "jotai";
import Suggestions from "./suggestions";
import { isEmpty } from "lodash";
import { markerAtom } from ".";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const searchOpenAtom = atom<boolean>(false);
export const searchQueryAtom = atom<string>("");
export const addPointModeAtom = atom<boolean>(false);

const MapActions = () => {
  const [searchOpen, setSearchOpen] = useAtom(searchOpenAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

  const setMarker = useSetAtom(markerAtom);
  const setAddPointMode = useSetAtom(addPointModeAtom);

  const queryClient = useQueryClient();

  const debouncedQuery = useDebounce(searchQuery, 500);
  const { data, status, isLoading, isFetching } =
    useSearchPlaceQuery(debouncedQuery);

  const suggestions = status === "success" ? data.features : [];
  const loading = isLoading && isFetching;

  const hasSuggestions =
    searchOpen && searchQuery.length > 2 && !isEmpty(suggestions);

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

  const resetSearch = () => {
    setMarker(null);
    setSearchOpen(false);
    searchQuery && setSearchQuery("");

    queryClient.invalidateQueries({ queryKey: ["searchPlace"] });
    queryClient.setQueryData(["searchPlace"], { features: [] });
  };

  useEffect(() => {
    if (searchQuery) return;

    resetSearch();
  }, [searchQuery]);

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
          ) : searchQuery ? (
            <X
              className="w-5 h-5 hover:opacity-50 cursor-pointer"
              onClick={resetSearch}
            />
          ) : (
            <MagnifyingGlass className="w-5 h-5" />
          )
        }
        onFocus={() => setSearchOpen(true)}
        onBlur={handleOnBlur}
        className={cn(
          hasSuggestions &&
            "!rounded-b-none focus-visible:!ring-0 focus-visible:!ring-offset-0"
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
            onClick: () => setAddPointMode(true),
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
