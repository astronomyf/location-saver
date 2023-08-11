"use client";

import MapView, {
  MapProvider,
  Marker,
  MapLayerMouseEvent,
  Source,
  Layer,
} from "react-map-gl/maplibre";
import type { MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { atom, useAtom, useAtomValue } from "jotai";
import MapControls from "./controls";
import { addPointModeAtom } from "./actions";
import MarkerCustom from "./marker";
import { MarkerCustomType } from "@/types/map/marker";
import { activeMapStyleAtom, mapStyles } from "./choose-map-style";
import { useEffect, useRef } from "react";
import PointPreview from "./point-preview";
import { useLoadInitialMarkers } from "@/lib/hooks/map/useLoadInitialMarkers";
import Loader from "../ui/loading";
import { detailLocationIdAtom, detailOpenAtom } from "../discover/details";
import { cn } from "@/lib/utils";
import { Transition } from "@headlessui/react";
import { useGetSymbolLayer } from "@/lib/hooks/map/useGetSymbolLayer";
import bbox from "@turf/bbox";

export const enlargeMapAtom = atom<boolean>(false);
export const markersAtom = atom<MarkerCustomType[]>([]);

const Map = () => {
  const mapRef = useRef<MapRef | null>(null);

  const [markers, setMarkers] = useAtom(markersAtom);
  const activeMapStyle = useAtomValue(activeMapStyleAtom);
  const [addPointMode, setAddPointMode] = useAtom(addPointModeAtom);

  const detailOpen = useAtomValue(detailOpenAtom);
  const detailLocationId = useAtomValue(detailLocationIdAtom);

  const symbolLayerId = useGetSymbolLayer(mapRef.current);

  const { data, loading: markersLoading } = useLoadInitialMarkers();
  const targetLocation = data.find(
    (item) => item.location === detailLocationId
  );

  useEffect(() => {
    if (!mapRef.current || !targetLocation) return;

    if (detailOpen) {
      const feature = targetLocation?.feature?.features;
      const [minLng, minLat, maxLng, maxLat] = bbox(feature[0]);
      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        {
          padding: { top: 0, right: 512 + 50, bottom: 50, left: 50 },
          duration: 300,
        }
      );
    } else {
      mapRef.current.easeTo({
        padding: { top: 48, right: 0 },
        duration: 300,
      });
    }
  }, [detailOpen, targetLocation]);

  const handleOnMapClick = (event: MapLayerMouseEvent) => {
    if (!addPointMode) return;

    const { lngLat } = event;

    setMarkers([{ latitude: lngLat.lat, longitude: lngLat.lng }]);
    mapRef.current?.flyTo({ center: [lngLat.lng, lngLat.lat] });
    setAddPointMode(false);
  };

  if (markersLoading)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );

  return (
    <div
      className={cn(
        "flex flex-1 relative overflow-hidden transition-transform ease-in-out duration-300"
      )}
    >
      <MapProvider>
        <MapView
          id="map"
          ref={mapRef}
          initialViewState={{
            longitude: 0,
            latitude: 0,
            zoom: 0,
            padding: { top: 48, bottom: 0, left: 0, right: 0 },
          }}
          mapStyle={mapStyles[activeMapStyle].url}
          style={{ flex: 1 }}
          cursor={addPointMode ? "crosshair" : undefined}
          onClick={handleOnMapClick}
        >
          <Transition
            show={!detailLocationId}
            enter="transform transition-all duration-300 ease-in-out"
            enterFrom="scale-0"
            enterTo="scale-100"
            leave="transform transition-all duration-300 ease-in-out"
            leaveFrom="scale-100"
            leaveTo="scale-0 "
          >
            {markers.map(({ latitude, longitude, title, imageUrl }, i) => (
              <Marker key={i} latitude={latitude} longitude={longitude}>
                <MarkerCustom
                  locationId={title || "example"}
                  title={title || "Example"}
                  imageUrl={imageUrl || ""}
                />
              </Marker>
            ))}
          </Transition>
          {targetLocation?.feature && (
            <Source type="geojson" data={targetLocation.feature}>
              <Layer
                {...{
                  id: "detail-layer-outline",
                  type: "line",
                  paint: {
                    "line-color": "#2563eb",
                    "line-width": 2,
                  },
                }}
                beforeId={symbolLayerId}
              />
              <Layer
                {...{
                  id: "detail-layer-fill",
                  type: "fill",
                  paint: {
                    "fill-color": "#2563eb",
                    "fill-outline-color": "#2563eb",
                    "fill-opacity": 0.3,
                  },
                }}
                beforeId={symbolLayerId}
              />
            </Source>
          )}
        </MapView>
        <div
          className={cn(
            "absolute transition-all ease-in-out duration-300",
            detailOpen
              ? "right-[calc(512px+16px)] top-4"
              : "right-4 top-[calc(48px+16px)]"
          )}
        >
          <MapControls />
        </div>
        {/* <div className="absolute top-4 left-4">
          <div className="flex flex-1 flex-col gap-y-2">
            <MapActions />
            <PointPreview mapInstance={mapRef.current} />
          </div>
        </div> */}
      </MapProvider>
    </div>
  );
};

export default Map;
