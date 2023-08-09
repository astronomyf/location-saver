import { highlightMarkerAtom } from "@/components/map/marker";
import Card from "@/components/ui/card";
import { useLoadInitialMarkers } from "@/lib/hooks/map/useLoadInitialMarkers";
import { useSetAtom } from "jotai";
import { useRef, useState } from "react";
import { Transition } from "@headlessui/react";

const LocationDetails = () => {
  const { data, loading } = useLoadInitialMarkers();
  const setHighlightMarker = useSetAtom(highlightMarkerAtom);

  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Transition
        show={!open}
        ref={containerRef}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="flex flex-col max-h-[calc(100vh-121px)] gap-y-4 pt-2 w-full"
      >
        <h1 className="text-2xl font-semibold">
          Discover <span className="text-primary">popular destinations</span>
        </h1>
        <div className="grid grid-cols-1 gap-y-4 pb-8 mt-2">
          {data.map(({ location, url }) => (
            <Card
              key={location}
              title={location}
              imageUrl={url}
              onMouseEnter={() => setHighlightMarker(location)}
              onMouseLeave={() => setHighlightMarker(null)}
              onClick={() => setOpen(true)}
            />
          ))}
        </div>
      </Transition>
      <Transition
        show={open}
        enter="transform transition duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className="w-full h-full bg-white p-4 flex absolute top-0 right-0 z-10 shadow-[-14px_0px_15px_-16px_rgba(0,0,0,0.1)]"
      >
        <div className="w-full h-full" onClick={() => setOpen(false)}>
          <h1>Heading</h1>
        </div>
      </Transition>
    </>
  );
};

export default LocationDetails;
