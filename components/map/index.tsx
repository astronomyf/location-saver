"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { atom, useAtom } from "jotai";
import MapControls from "./controls";
import MapActions from "./actions";

export const enlargeMapAtom = atom<boolean>(true);
export const mapInstanceAtom = atom<maplibregl.Map | null>(null);

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useAtom(mapInstanceAtom);

  useEffect(() => {
    if (mapInstance) return;
    if (!mapContainer.current) return;

    // Init map
    const initMap = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/outdoor-v2/style.json?key=JD0dQfo7nF5PATG7r3XA`, // JD0dQfo7nF5PATG7r3XA
      center: [146.6639, -42.6685],
      zoom: 11,
    });

    setMapInstance(initMap);
  }, [mapInstance, setMapInstance]);

  return (
    <div className="flex flex-1 relative">
      <div ref={mapContainer} className="flex flex-1" />
      <div className="absolute top-4 right-4">
        <MapControls mapInstance={mapInstance} />
      </div>
      <div className="absolute top-4 left-4">
        <MapActions />
      </div>
    </div>
  );
};

export default Map;
