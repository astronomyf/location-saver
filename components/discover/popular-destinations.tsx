import { useLoadInitialMarkers } from "@/lib/hooks/map/useLoadInitialMarkers";
import { useSetAtom } from "jotai";
import { highlightMarkerAtom } from "../map/marker";
import Card from "../ui/card";

const PopularDestinations = () => {
  const { data, loading } = useLoadInitialMarkers();
  const setHighlightMarker = useSetAtom(highlightMarkerAtom);

  return (
    <div className="flex w-full items-center gap-x-4 flex-nowrap">
      {data.map(({ location, url }) => (
        <Card
          key={location}
          title={location}
          imageUrl={url}
          onMouseEnter={() => setHighlightMarker(location)}
          onMouseLeave={() => setHighlightMarker(null)}
          className="max-w-fit"
        />
      ))}
    </div>
  );
};

export default PopularDestinations;
