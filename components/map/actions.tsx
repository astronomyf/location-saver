import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useDebounce } from "usehooks-ts";
import { useSearchPlaceQuery } from "@/lib/hooks/queries/useSearchPlaceQuery";
import { atom, useAtom, useSetAtom } from "jotai";
import Suggestions from "./suggestions";
import { isEmpty } from "lodash";
import { markersAtom } from ".";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../ui/loading";
import { IconMapPlus, IconPin, IconSearch, IconX } from "@tabler/icons-react";

export const searchOpenAtom = atom<boolean>(false);
export const searchQueryAtom = atom<string>("");
export const addPointModeAtom = atom<boolean>(false);

const MapActions = () => {
  const [searchOpen, setSearchOpen] = useAtom(searchOpenAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

  const setMarkers = useSetAtom(markersAtom);
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
    setMarkers([]);
    setSearchOpen(false);
    searchQuery && setSearchQuery("");

    queryClient.invalidateQueries({ queryKey: ["searchPlace"] });
    queryClient.setQueryData(["searchPlace"], { features: [] });
  };

  // useEffect(() => {
  //   if (searchQuery) return;

  //   resetSearch();
  // }, [searchQuery]);

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
            <Loader className="!fill-current" />
          ) : searchQuery ? (
            <IconX
              className="w-5 h-5 hover:opacity-50 cursor-pointer"
              onClick={resetSearch}
            />
          ) : (
            <IconSearch size={20} />
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
                <IconPin size={20} />
              </div>
            ),
            tooltipText: "Add a new location",
            onClick: () => setAddPointMode(true),
          },
          {
            icon: <IconMapPlus size={20} />,
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
