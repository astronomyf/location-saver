import { useAtomValue } from "jotai";
import { markerAtom } from ".";
import { MapInstance } from "@/types/map/generic";
import { useSearchPlaceCoords } from "@/lib/hooks/queries/useSearchPlaceCoords";
import { getLocationProperties } from "@/lib/getLocationProperties";
import { Button } from "../ui/button";
import { Plus } from "@/assets/phosphor-icons";

interface PointPreviewProps {
  mapInstance?: MapInstance | null;
}

const PointPreview = ({ mapInstance }: PointPreviewProps) => {
  const marker = useAtomValue(markerAtom);
  const { latitude, longitude } = marker || {};

  const { data, isLoading, status } = useSearchPlaceCoords(longitude, latitude);
  const features = status === "success" ? data.features : [];

  const location = getLocationProperties(features);

  if (!mapInstance || !marker) return null;

  return (
    <div className="flex flex-1 flex-wrap bg-background rounded-md shadow-md border border-slate-200 flex-col">
      {isLoading ? (
        <div className="flex flex-col gap-y-3 p-4">
          <div className="animate-pulse w-full h-6 rounded-md bg-slate-200" />
          <div className="animate-pulse w-52 h-4 rounded-md bg-slate-200 mt-1" />
          <div className="animate-pulse w-40 h-4 rounded-md bg-slate-200" />
        </div>
      ) : (
        <div className="flex flex-col p-4 gap-y-1">
          <h1 className="text-lg font-semibold whitespace-pre-wrap max-w-[250px] break-words">
            {location.name}
          </h1>
          <div className="flex bg-primary-soft text-primary text-xs p-1 px-2 rounded-sm w-fit">
            {location.region}
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            {latitude?.toFixed(5)}, {longitude?.toFixed(5)}
          </p>
        </div>
      )}
      {!isLoading && (
        <div className="grid grid-cols-2 gap-x-2 border-t border-slate-200 p-4">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Quick add
          </Button>
          <Button variant="secondary">Clear</Button>
        </div>
      )}
    </div>
  );
};

export default PointPreview;
