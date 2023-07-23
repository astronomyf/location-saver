import { QueryPlacesFeature } from "@/types/map/places-query";
import { isEmpty, values } from "lodash";

type LocationProperties = {
  name: string;
  region: string;
};

export const getLocationProperties = (
  features: QueryPlacesFeature[]
): LocationProperties => {
  if (isEmpty(features)) return { name: "", region: "" };

  // First feature is the most relevant
  const target = features.filter(
    (feature) => !feature.id.includes("address")
  )[0];

  const region = target.context.reduce((acc: string[], context) => {
    const text = context.text;
    const id = context.id;

    if (
      id.includes("county") ||
      id.includes("region") ||
      id.includes("country")
    )
      return [...acc, text];

    return acc;
  }, []);

  const formatFullLocation = region.join(", ");

  return { name: target.text, region: formatFullLocation };
};
