import { MapRef } from "react-map-gl/maplibre";

export const useGetSymbolLayer = (
  mapRef: MapRef | null
): string | undefined => {
  if (!mapRef) return undefined;

  const layers = mapRef?.getStyle()?.layers || [];

  const findFirstSymbol = layers.find(
    (layer) => layer.type === "symbol" && layer.id.includes("Airport labels")
  );
  if (!findFirstSymbol) return undefined;

  return findFirstSymbol.id;
};
