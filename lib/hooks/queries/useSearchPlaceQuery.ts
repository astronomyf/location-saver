import { QueryPlacesRoot } from "@/types/map/places-query";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetch a list of places using the Geocoding API from a query string
 */
export const useSearchPlaceQuery = (query: string) =>
  useQuery({
    queryKey: ["searchPlace", query],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/places/search/${query}`);
        const data = (await response.json()) as QueryPlacesRoot;

        return data;
      } catch (err) {
        console.error(err);
        return { features: [] };
      }
    },
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
