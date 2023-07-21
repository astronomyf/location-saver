import { useAtom, useSetAtom } from "jotai";
import { searchOpenAtom } from "./actions";
import { QueryPlacesFeature } from "@/types/map/places-query";
import { MapPin } from "@/assets/phosphor-icons";

interface SuggestionsProps {
  data: QueryPlacesFeature[];
  hidden?: boolean;
}

const Suggestions = ({ data, hidden }: SuggestionsProps) => {
  const setSearchOpen = useSetAtom(searchOpenAtom);

  if (hidden) return null;

  return (
    <ul
      tabIndex={1}
      onBlur={() => {
        setSearchOpen(false);
      }}
      className="px-3 py-2 bg-background shadow-sm rounded-b-md flex flex-col gap-y-4 border-b border-x border-slate-200"
    >
      {data.map((suggestion) => {
        const mainName = suggestion.place_name.trim().split(",")[0];
        const restOfAddress = suggestion.place_name
          .trim()
          .split(",")
          .slice(1)
          .join(",");

        return (
          <li
            key={suggestion.id}
            className="flex gap-x-2 -mx-3 pl-3 -my-2 py-2 text-sm items-center hover:bg-slate-100 last:hover:rounded-b-md cursor-pointer transition-all ease-in-out"
          >
            <MapPin className="!w-4 !h-4 text-slate-400" weight="fill" />
            <div className="flex whitespace-nowrap max-w-[230px]">
              <b>{mainName}</b>
              <span className="truncate">,{restOfAddress}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Suggestions;
