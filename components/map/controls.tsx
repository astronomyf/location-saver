import { useAtom } from "jotai";
import { enlargeMapAtom } from ".";
import {
  ArrowsIn,
  ArrowsOut,
  Minus,
  Plus,
  Stack,
} from "@/assets/phosphor-icons";
import { Map } from "maplibre-gl";
import { useMapZoomDisabled } from "@/lib/hooks/useMapZoomDisabled";

interface MapControlsProps {
  mapInstance: Map | null;
}

const MapControls = ({ mapInstance }: MapControlsProps) => {
  const [enlargeMap, setEnlargeMap] = useAtom(enlargeMapAtom);

  const { zoomInDisabled, zoomOutDisabled } = useMapZoomDisabled(mapInstance);

  if (!mapInstance) return null;

  return (
    <div className="w-8 flex flex-col rounded-md shadow-sm">
      <button
        type="button"
        disabled={zoomInDisabled}
        className="p-1.5 inline-flex justify-center items-center gap-2 rounded-t-md border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-ring transition-all text-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        onClick={() => mapInstance.zoomIn()}
      >
        <Plus className="w-4 h-4" />
      </button>
      <button
        type="button"
        disabled={zoomOutDisabled}
        className="-mt-px p-1.5 inline-flex justify-center items-center gap-2 border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-ring transition-all text-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        onClick={() => mapInstance.zoomOut()}
      >
        <Minus className="w-4 h-4" />
      </button>
      <button
        type="button"
        className="-mt-px p-1.5 inline-flex justify-center items-center gap-2 rounded-b-md border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-ring transition-all text-sm"
      >
        <Stack className="w-4 h-4" />
      </button>
      {/* <button
        type="button"
        className="-mt-px p-1.5 inline-flex justify-center items-center gap-2 rounded-b-md border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-ring transition-all text-sm"
        onClick={() => setEnlargeMap((prev) => !prev)}
      >
        {enlargeMap ? (
          <ArrowsIn className="w-4 h-4" />
        ) : (
          <ArrowsOut className="w-4 h-4" />
        )}
      </button> */}
    </div>
  );
};

export default MapControls;
