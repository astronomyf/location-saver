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
import MapActions, { addPointModeAtom } from "./actions";
import MarkerCustom from "./marker";
import { MarkerCustomType } from "@/types/map/marker";
import { activeMapStyleAtom, mapStyles } from "./choose-map-style";
import { useRef } from "react";
import PointPreview from "./point-preview";
import { useLoadInitialMarkers } from "@/lib/hooks/map/useLoadInitialMarkers";
import Loader from "../ui/loading";

export const enlargeMapAtom = atom<boolean>(false);
export const markersAtom = atom<MarkerCustomType[]>([]);

const Map = () => {
  const mapRef = useRef<MapRef | null>(null);

  const [markers, setMarkers] = useAtom(markersAtom);
  const activeMapStyle = useAtomValue(activeMapStyleAtom);
  const [addPointMode, setAddPointMode] = useAtom(addPointModeAtom);

  const { loading: markersLoading } = useLoadInitialMarkers();

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
    <div className="flex flex-1 relative overflow-hidden">
      <MapProvider>
        <MapView
          id="map"
          ref={mapRef}
          initialViewState={{
            longitude: 0,
            latitude: 0,
            zoom: 0,
          }}
          mapStyle={mapStyles[activeMapStyle].url}
          style={{ flex: 1 }}
          cursor={addPointMode ? "crosshair" : undefined}
          onClick={handleOnMapClick}
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
          {/* <Source type="geojson" data={data}>
            <Layer
              {...{
                id: "point",
                type: "circle",
                paint: {
                  "circle-radius": 10,
                  "circle-color": "#007cbf",
                  "circle-stroke-width": 1,
                  "circle-stroke-color": "#fff",
                },
              }}
            />
          </Source> */}
        </MapView>
        <div className="absolute top-4 right-4">
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
