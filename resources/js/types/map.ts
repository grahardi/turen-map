export interface MapFeature {
    id: number;
    name: string;
    category: string;
    village: string | null;
    description: string | null;
    address: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
}

export interface VillageBoundary {
    id: number;
    name: string;
    geometry: GeoJSON.Geometry;
}
