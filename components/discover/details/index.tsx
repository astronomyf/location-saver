import { highlightMarkerAtom } from "@/components/map/marker";
import Card from "@/components/ui/card";
import { useLoadInitialMarkers } from "@/lib/hooks/map/useLoadInitialMarkers";
import { useSetAtom } from "jotai";
import {
  SyntheticEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Transition } from "@headlessui/react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

const LocationDetails = ({
  containerRef,
}: {
  containerRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  const { data, loading } = useLoadInitialMarkers();
  const setHighlightMarker = useSetAtom(highlightMarkerAtom);

  const detailRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef<number>(0);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!containerRef?.current) return;

    const storeScrollPosition = (e: Event) => {
      if (!e?.target) return;

      const scrollTopPosition = (e.target as HTMLDivElement).scrollTop;
      if (!scrollTopPosition || scrollTopPosition <= 0) return;

      console.log("scrollTopPosition", scrollTopPosition);
      scrollPosition.current = (e.target as HTMLDivElement).scrollTop || 0;
    };

    const scrollableContainer = containerRef.current;
    scrollableContainer.addEventListener("scroll", storeScrollPosition);

    return () => {
      scrollableContainer.removeEventListener("scroll", storeScrollPosition);
    };
  }, []);

  return (
    <>
      {/* <Transition
        show={!open}
        ref={containerRef}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="flex flex-col gap-y-4 pt-2 w-full"
        afterEnter={() => {
          console.log("scrollPosition.current", scrollPosition.current);
          containerRef?.current?.scrollTo({
            top: scrollPosition.current,
            behavior: "instant",
          });
        }}
      > */}
      <div className="flex flex-col gap-y-4 pt-2 w-full">
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
      {/* </Transition> */}
      {/* <Transition
        show={open}
        ref={detailRef}
        enter="transform transition duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className="w-full h-full bg-white p-4 flex absolute top-0 right-0 z-10 shadow-[-14px_0px_15px_-16px_rgba(0,0,0,0.1)]"
        beforeEnter={() =>
          detailRef?.current?.scrollTo({ top: 0, behavior: "instant" })
        }
      > */}
      <SwipeableDrawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        hideBackdrop
        anchor="right"
        className="w-full max-w-lg relative"
        sx={{
          ".MuiDrawer-root": {
            position: "absolute",
          },
          ".MuiPaper-root": {
            position: "absolute",
          },
        }}
      >
        <div className="w-full h-full" onClick={() => setOpen(false)}>
          <h1>Heading</h1>
        </div>
      </SwipeableDrawer>
      {/* </Transition> */}
    </>
  );
};

export default LocationDetails;
