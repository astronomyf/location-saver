import { useLoadInitialMarkers } from "@/lib/hooks/map/useLoadInitialMarkers";
import { useAtom, useSetAtom } from "jotai";
import { highlightMarkerAtom } from "../map/marker";
import Card from "../ui/card";
import { detailLocationIdAtom, detailOpenAtom } from "./details";
import { Transition } from "@headlessui/react";

const PopularDestinations = () => {
  const { data, loading } = useLoadInitialMarkers();
  const setHighlightMarker = useSetAtom(highlightMarkerAtom);

  const [openDetail, setDetailOpen] = useAtom(detailOpenAtom);
  const setDetailLocationId = useSetAtom(detailLocationIdAtom);

  return (
    <Transition
      show={!openDetail}
      enter="transform transition-all duration-300"
      enterFrom="translate-y-full opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transform transition-all duration-300"
      leaveFrom="translate-y-0 opacity-100"
      leaveTo="translate-y-full opacity-0"
    >
      <div className="flex w-full items-center gap-x-4 flex-nowrap">
        {data.map(({ location, url, feature }) => (
          <Card
            key={location}
            title={location}
            imageUrl={url}
            onMouseEnter={() => setHighlightMarker(location)}
            onMouseLeave={() => setHighlightMarker(null)}
            className="max-w-fit"
            onClick={() => {
              setHighlightMarker(null);
              setDetailLocationId(location);
              setDetailOpen(true);
            }}
          />
        ))}
      </div>
    </Transition>
  );
};

export default PopularDestinations;
