import { useMap } from "react-map-gl/maplibre";

export type MapInstance = ReturnType<typeof useMap>[""];

export type MapStyles = "outdoor" | "topo" | "satellite";
export type MapStyleObject = {
  [key in MapStyles]: {
    label: string;
    url: string;
  };
};
