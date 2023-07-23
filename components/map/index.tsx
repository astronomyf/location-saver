"use client";

import MapView, { MapProvider, Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { atom, useAtomValue } from "jotai";
import MapControls from "./controls";
import MapActions from "./actions";
import MarkerCustom from "./marker";
import { MarkerCustomType } from "@/types/map/marker";
import { activeMapStyleAtom, mapStyles } from "./choose-map-style";

export const enlargeMapAtom = atom<boolean>(true);
export const markerAtom = atom<MarkerCustomType | null>(null);

const Map = () => {
  const marker = useAtomValue(markerAtom);
  const activeMapStyle = useAtomValue(activeMapStyleAtom);

  return (
    <div className="flex flex-1 relative">
      <MapProvider>
        <MapView
          id="map"
          initialViewState={{
            longitude: 146.6639,
            latitude: -42.6685,
            zoom: 11,
          }}
          mapStyle={mapStyles[activeMapStyle].url}
          style={{ flex: 1 }}
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
          <MapActions />
        </div>
      </MapProvider>
    </div>
  );
};

export default Map;
