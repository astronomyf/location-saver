import { LngLat, QueryPlacesRoot } from "@/types/map/places-query";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetch a list of places using the Geocoding API from a coordinate
 */
export const useSearchPlaceCoords = (lon?: number, lat?: number) =>
  useQuery({
    queryKey: ["searchCoordinate", lon, lat],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/places/search/coordinates`, {
          method: "POST",
          body: JSON.stringify({ coordinates: [lon, lat] as LngLat }),
        });

        const data = (await response.json()) as QueryPlacesRoot;

        return data;
      } catch (err) {
        console.error(err);
        return { features: [] };
      }
    },
    enabled: !!lon && !!lat,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
