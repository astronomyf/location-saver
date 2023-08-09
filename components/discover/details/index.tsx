import { highlightMarkerAtom } from "@/components/map/marker";
import Card from "@/components/ui/card";
import { useLoadInitialMarkers } from "@/lib/hooks/map/useLoadInitialMarkers";
import { useSetAtom } from "jotai";
import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

const LocationDetails = () => {
  const { data, loading } = useLoadInitialMarkers();
  const setHighlightMarker = useSetAtom(highlightMarkerAtom);

  const [open, setOpen] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  if (open)
    return (
      <CSSTransition
        nodeRef={nodeRef}
        in={open}
        timeout={200}
        classNames={{
          appear:
            "transform transition delay-500 duration-200 ease-in-out -translate-x-full",
          appearActive: "translate-x-0",
          appearDone: "translate-x-0",
          exit: "transform transition duration-200 ease-in-out",
          exitActive: "-translate-x-full",
          exitDone: "-translate-x-full",
        }}
      >
        <div
          ref={nodeRef}
          onClick={() => setOpen(false)}
          className="w-full p-4 flex"
        >
          <h1>Heading</h1>
        </div>
      </CSSTransition>
    );

  return (
    <div className="flex flex-col max-h-[calc(100vh-121px)] gap-y-4 pt-2 w-full">
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
    </div>
  );
};

export default LocationDetails;
