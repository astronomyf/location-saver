"use client";

import MapView, {
  MapProvider,
  Marker,
  MapLayerMouseEvent,
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

export const enlargeMapAtom = atom<boolean>(true);
export const markerAtom = atom<MarkerCustomType | null>(null);

const Map = () => {
  const mapRef = useRef<MapRef>(null);

  const [marker, setMarker] = useAtom(markerAtom);
  const activeMapStyle = useAtomValue(activeMapStyleAtom);
  const [addPointMode, setAddPointMode] = useAtom(addPointModeAtom);

  const handleOnMapClick = (event: MapLayerMouseEvent) => {
    if (!addPointMode) return;

    const { lngLat } = event;

    setMarker({ latitude: lngLat.lat, longitude: lngLat.lng });
    mapRef.current?.flyTo({ center: [lngLat.lng, lngLat.lat] });
    setAddPointMode(false);
  };

  return (
    <div className="flex flex-1 relative">
      <MapProvider>
        <MapView
          id="map"
          ref={mapRef}
          initialViewState={{
            longitude: 146.6639,
            latitude: -42.6685,
            zoom: 11,
          }}
          mapStyle={mapStyles[activeMapStyle].url}
          style={{ flex: 1 }}
          cursor={addPointMode ? "crosshair" : undefined}
          onClick={handleOnMapClick}
        >
          {marker && (
            <Marker latitude={marker.latitude} longitude={marker.longitude}>
              <MarkerCustom />
            </Marker>
          )}
        </MapView>
        <div className="absolute top-4 right-4">
          <MapControls />
        </div>
        <div className="absolute top-4 left-4">
          <div className="flex flex-1 flex-col gap-y-2">
            <MapActions />
            <PointPreview mapInstance={mapRef.current} />
          </div>
        </div>
      </MapProvider>
    </div>
  );
};

export default Map;
