"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { atom } from "jotai";
import MapControls from "./controls";

export const enlargeMapAtom = atom<boolean>(false);

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;

    // Init map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/topo-v2/style.json?key=JD0dQfo7nF5PATG7r3XA`,
      center: [146.6639, -42.6685],
      zoom: 11,
    });
  }, []);

  return (
    <div className="flex flex-1 relative">
      <div ref={mapContainer} className="flex flex-1" />
      <div className="absolute top-4 right-4">
        <MapControls mapInstance={map.current} />
      </div>
    </div>
  );
};

export default Map;