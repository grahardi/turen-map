import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MapGL, { Layer, Marker, NavigationControl, Popup, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { MapFeature, VillageBoundary } from '@/types';

interface MapPageProps {
    features: MapFeature[];
    boundaries: VillageBoundary[];
}

// Titik tengah perkiraan Kecamatan Turen — sesuaikan lagi setelah data OSM masuk.
const TUREN_CENTER = { longitude: 112.6706, latitude: -8.1642, zoom: 13.5 };

export default function TurenMap({ features, boundaries }: MapPageProps) {
    const [selected, setSelected] = useState<MapFeature | null>(null);

    const boundaryCollection: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: boundaries.map((b) => ({
            type: 'Feature',
            properties: { name: b.name },
            geometry: b.geometry,
        })),
    };

    return (
        <>
            <Head title="Peta Kecamatan Turen" />
            <div className="relative h-screen w-screen">
                <MapGL
                    initialViewState={TUREN_CENTER}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle="https://map.turen.id/styles/basic-preview/style.json"
                >
                    <NavigationControl position="top-right" />

                    {boundaries.length > 0 && (
                        <Source id="village-boundaries" type="geojson" data={boundaryCollection}>
                            <Layer
                                id="village-boundaries-fill"
                                type="fill"
                                paint={{ 'fill-color': '#3b82f6', 'fill-opacity': 0.08 }}
                            />
                            <Layer
                                id="village-boundaries-line"
                                type="line"
                                paint={{ 'line-color': '#3b82f6', 'line-width': 1.5 }}
                            />
                        </Source>
                    )}

                    {features.map((feature) => (
                        <Marker
                            key={feature.id}
                            longitude={feature.longitude}
                            latitude={feature.latitude}
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                setSelected(feature);
                            }}
                        >
                            <div className="h-3 w-3 cursor-pointer rounded-full border-2 border-white bg-red-500 shadow" />
                        </Marker>
                    ))}

                    {selected && (
                        <Popup
                            longitude={selected.longitude}
                            latitude={selected.latitude}
                            anchor="bottom"
                            onClose={() => setSelected(null)}
                            closeOnClick={false}
                        >
                            <div className="min-w-[180px] p-1">
                                <p className="font-semibold">{selected.name}</p>
                                <p className="text-sm text-muted-foreground">{selected.category}</p>
                                {selected.address && <p className="mt-1 text-sm">{selected.address}</p>}
                                {selected.phone && (
                                    <a
                                        href={`https://wa.me/${selected.phone.replace(/[^0-9]/g, '')}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-1 inline-block text-sm text-green-600 underline"
                                    >
                                        Hubungi via WhatsApp
                                    </a>
                                )}
                            </div>
                        </Popup>
                    )}
                </MapGL>

                <div className="absolute top-4 left-4 rounded-lg bg-white/90 px-4 py-2 shadow backdrop-blur">
                    <h1 className="text-sm font-semibold">Peta Kecamatan Turen</h1>
                    <p className="text-xs text-muted-foreground">{features.length} lokasi terdaftar</p>
                </div>
            </div>
        </>
    );
}
