import { useLoadInitialMarkers } from "@/lib/hooks/map/useLoadInitialMarkers";
import { useAtom, useSetAtom } from "jotai";
import { highlightMarkerAtom } from "../map/marker";
import Card from "../ui/card";
import { detailLocationIdAtom, detailOpenAtom } from "./details";
import { Transition } from "@headlessui/react";
import { useEffect, useRef } from "react";
import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import { ScrollContainerRef } from "../navbar/subnavbar";

const PopularDestinations = () => {
  const scrollContainer = useRef<HTMLElement>(null);
  const lastScrollPosition = useRef<number>(0);

  const { data, loading } = useLoadInitialMarkers();
  const setHighlightMarker = useSetAtom(highlightMarkerAtom);

  const [openDetail, setDetailOpen] = useAtom(detailOpenAtom);
  const setDetailLocationId = useSetAtom(detailLocationIdAtom);

  const handleScroll = () => {
    const distance = scrollContainer?.current?.scrollLeft || 0;
    if (distance <= 0) return;

    lastScrollPosition.current = distance;
  };

  useEffect(() => {
    if (openDetail) return;
    setTimeout(
      () =>
        scrollContainer.current?.scrollTo({ left: lastScrollPosition.current }),
      0
    );
  }, [openDetail]);

  useEffect(() => {
    if (!scrollContainer?.current) return;

    // Access the scrollable container with scrollContainerRef.current
    const scrollContainerElement = scrollContainer.current;
    scrollContainerElement.addEventListener("scroll", handleScroll);

    return () => {
      // Remove the event listener when the component unmounts
      scrollContainerElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollContainer
      ref={scrollContainer as ScrollContainerRef}
      className="absolute bottom-5 pb-2 left-0 pl-6 h-fit w-full"
    >
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
    </ScrollContainer>
  );
};

export default PopularDestinations;
