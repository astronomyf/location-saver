export interface QueryPlacesRoot {
  type: string;
  features: QueryPlacesFeature[];
  query: string[];
  attribution: string;
}

export interface QueryPlacesFeature {
  type: string;
  properties: QueryPlacesProperties;
  geometry: QueryPlacesGeometry;
  bbox: number[];
  center: number[];
  place_name: string;
  place_type: string[];
  relevance: number;
  context: QueryPlacesContext[];
  id: string;
  text: string;
}

export interface QueryPlacesProperties {
  ref: string;
  country_code: string;
  kind: string;
  "osm:place_type"?: string;
}

export interface QueryPlacesGeometry {
  type: string;
  coordinates: number[];
}

export interface QueryPlacesContext {
  ref: string;
  country_code: string;
  kind?: string;
  id: string;
  text: string;
  "osm:place_type"?: string;
}
