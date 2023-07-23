import { useAtomValue } from "jotai";
import { markerAtom } from ".";
import { MapInstance } from "@/types/map/generic";

interface PointPreviewProps {
  mapInstance?: MapInstance | null;
}

const PointPreview = ({ mapInstance }: PointPreviewProps) => {
  const marker = useAtomValue(markerAtom);

  if (!mapInstance || !marker) return null;

  const { latitude, longitude } = marker;

  const point = mapInstance.project([longitude, latitude]);

  const feature = mapInstance.queryRenderedFeatures(point)[0];
  const featureName = feature?.properties?.name;

  return (
    <div className="flex flex-1 flex-wrap bg-background rounded-md shadow-md border border-slate-200 flex-col p-2 gap-y-2">
      <h1 className="font-semibold whitespace-pre-wrap max-w-[250px] break-words">
        {featureName}
      </h1>
      <p className="text-muted-foreground text-sm">
        {latitude.toFixed(5)}, {longitude.toFixed(5)}
      </p>
    </div>
  );
};

export default PointPreview;
