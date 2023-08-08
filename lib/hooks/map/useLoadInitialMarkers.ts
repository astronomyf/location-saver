import { markersAtom } from "@/components/map";
import { MarkerCustomType } from "@/types/map/marker";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";

export const useLoadInitialMarkers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const setMarkers = useSetAtom(markersAtom);

  useEffect(() => {
    const loadInitialMarkers = async () => {
      try {
        setLoading(true);

        const response = await fetch(`api/load?fileName=popular-destinations`, {
          method: "GET",
        });

        const data = JSON.parse(await response.json());

        const filtered: MarkerCustomType[] = data
          .filter((data: any) => !!data?.feature)
          .flatMap((data: any) =>
            data.feature.features.map((f: any) => ({
              latitude: f.geometry.coordinates[1],
              longitude: f.geometry.coordinates[0],
              title: data.location,
              imageUrl: data.url,
            }))
          );

        setMarkers(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialMarkers();
  }, []);

  return loading;
};
