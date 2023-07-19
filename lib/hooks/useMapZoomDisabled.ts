import { Map } from "maplibre-gl";
import { useEffect, useState } from "react";

export const useMapZoomDisabled = (mapInstance?: Map | null) => {
  const [zoomInDisabled, setZoomInDisabled] = useState<boolean>(false);
  const [zoomOutDisabled, setZoomOutDisabled] = useState<boolean>(false);

  const checkCurrentZoom = (mapInstance: Map) => {
    const shouldDisableZoomIn =
      Math.round(mapInstance.getZoom()) === mapInstance.getMaxZoom();

    const shouldDisableZoomOut = Math.round(mapInstance.getZoom()) === 0;

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
