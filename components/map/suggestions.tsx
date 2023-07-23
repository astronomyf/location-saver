import { useSetAtom } from "jotai";
import { searchOpenAtom, searchQueryAtom } from "./actions";
import { LngLat, QueryPlacesFeature } from "@/types/map/places-query";
import { MapPin } from "@/assets/phosphor-icons";
import { splitAddressName } from "@/lib/splitAddressName";
import { useMap } from "react-map-gl/maplibre";
import { markerAtom } from ".";

interface SuggestionsProps {
  data: QueryPlacesFeature[];
  hidden?: boolean;
}

const Suggestions = ({ data, hidden = false }: SuggestionsProps) => {
  const setSearchOpen = useSetAtom(searchOpenAtom);
  const setSearchQuery = useSetAtom(searchQueryAtom);
  const setMarker = useSetAtom(markerAtom);

  const { map } = useMap();

  if (hidden || !map) return null;

  return (
    <ul
      tabIndex={1}
      onBlur={() => {
        setSearchOpen(false);
      }}
      className="px-3 py-2 bg-background shadow-sm rounded-b-md flex flex-col gap-y-4 border-b border-x border-slate-200"
    >
      {data.map(({ place_name, id, geometry }) => {
        const [mainName, restOfAddress] = splitAddressName(place_name);

        return (
          <li
            key={id}
            className="flex gap-x-2 -mx-3 pl-3 -my-2 py-2 text-sm items-center hover:bg-slate-100 last:hover:rounded-b-md cursor-pointer transition-all ease-in-out"
            onClick={() => {
              setSearchQuery(place_name);
              setSearchOpen(false);

              const coords: LngLat = [
                geometry.coordinates[0],
                geometry.coordinates[1],
              ];

              map.jumpTo({
                center: coords,
              });

              setMarker({
                latitude: coords[1],
                longitude: coords[0],
                label: mainName,
              });
            }}
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
