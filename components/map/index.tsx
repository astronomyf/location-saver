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
import { useEffect, useRef, useState } from "react";
import PointPreview from "./point-preview";

export const enlargeMapAtom = atom<boolean>(false);
export const markerAtom = atom<MarkerCustomType | null>(null);

const Map = () => {
  const mapRef = useRef<MapRef | null>(null);

  const [marker, setMarker] = useAtom(markerAtom);
  const activeMapStyle = useAtomValue(activeMapStyleAtom);
  const [addPointMode, setAddPointMode] = useAtom(addPointModeAtom);

  const [data, setData] = useState<any>(null);

  const handleOnMapClick = (event: MapLayerMouseEvent) => {
    if (!addPointMode) return;

    const { lngLat } = event;

    setMarker({ latitude: lngLat.lat, longitude: lngLat.lng });
    mapRef.current?.flyTo({ center: [lngLat.lng, lngLat.lat] });
    setAddPointMode(false);
  };

  useEffect(() => {
    // fetch("../lib/mock/popular-destinations.json")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const filtered = data
    //       .filter((d: any) => !!d?.feature)
    //       .map((d: any) => d.feature);
    //     setData(filtered);
    //   });
    const data: any[] = [
      {
        type: "Feature",
        properties: {
          place_id: 307947224,
          osm_type: "relation",
          osm_id: 1629146,
          display_name: "Azores, Portugal",
          place_rank: 8,
          category: "boundary",
          type: "administrative",
          importance: 0.6280815785083296,
          address: {
            archipelago: "Azores",
            "ISO3166-2-lvl4": "PT-20",
            country: "Portugal",
            country_code: "pt",
          },
        },
        bbox: [-31.2756316, 36.9276305, -24.7798488, 39.7272503],
        geometry: {
          type: "Point",
          coordinates: [-25.473137391245295, 37.80855645],
        },
      },
      {
        type: "Feature",
        properties: {
          place_id: 309519110,
          osm_type: "node",
          osm_id: 32059197,
          display_name:
            "Uhuru Peak, Rombo, Kilimanjaro, Northern Zone, Tanzania",
          place_rank: 18,
          category: "natural",
          type: "peak",
          importance: 0.5374025205734663,
          address: {
            natural: "Uhuru Peak",
            state_district: "Rombo",
            state: "Kilimanjaro",
            "ISO3166-2-lvl4": "TZ-09",
            region: "Northern Zone",
            country: "Tanzania",
            country_code: "tz",
          },
        },
        bbox: [37.3539487, -3.0764584, 37.3540487, -3.0763584],
        geometry: {
          type: "Point",
          coordinates: [37.3539987, -3.0764084],
        },
      },
    ];

    setData({ type: "FeatureCollection", features: data });
  }, []);

  return (
    <div className="flex flex-1 relative">
      <MapProvider>
        <MapView
          id="map"
          ref={mapRef}
          initialViewState={{
            longitude: 146.6639,
            latitude: -42.6685,
            zoom: 1,
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
          <Source type="geojson" data={data}>
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
          </Source>
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
