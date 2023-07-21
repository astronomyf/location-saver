"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { atom } from "jotai";
import MapControls from "./controls";
import MapActions from "./actions";

export const enlargeMapAtom = atom<boolean>(true);

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);

  useEffect(() => {
    if (mapInstance) return;
    if (!mapContainer.current) return;

    // Init map
    const initMap = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/outdoor-v2/style.json?key=`, // JD0dQfo7nF5PATG7r3XA
      center: [146.6639, -42.6685],
      zoom: 11,
    });

    setMapInstance(initMap);
  }, [mapInstance]);

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
