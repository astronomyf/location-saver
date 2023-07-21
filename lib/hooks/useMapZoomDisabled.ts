import { Map } from "maplibre-gl";
import { useEffect, useState } from "react";

export const useMapZoomDisabled = (mapInstance?: Map | null) => {
  const [zoomInDisabled, setZoomInDisabled] = useState<boolean>(false);
  const [zoomOutDisabled, setZoomOutDisabled] = useState<boolean>(false);

  const checkCurrentZoom = (mapInstance: Map) => {
    const currentZoom = Math.round(mapInstance.getZoom());

    const shouldDisableZoomIn = currentZoom === mapInstance.getMaxZoom();
    const shouldDisableZoomOut = currentZoom === 0;

    if (shouldDisableZoomIn) void setZoomInDisabled(shouldDisableZoomIn);
    if (shouldDisableZoomOut) void setZoomOutDisabled(shouldDisableZoomOut);
  };

  useEffect(() => {
    if (!mapInstance) return;

    mapInstance.on("zoom", () => checkCurrentZoom(mapInstance));

    // Cleanup
    return () => {
      mapInstance.off("zoom", () => checkCurrentZoom(mapInstance));
    };
  }, [mapInstance]);

  return { zoomInDisabled, zoomOutDisabled };
};
