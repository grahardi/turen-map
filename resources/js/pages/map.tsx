import { Head } from '@inertiajs/react';
import { LocateFixed, MapPin, Phone, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import MapGL, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { MapFeature, VillageBoundary } from '@/types';

interface MapPageProps {
    features: MapFeature[];
    boundaries: VillageBoundary[];
}

const TUREN_CENTER = { longitude: 112.690201, latitude: -8.184302, zoom: 14 };

const CATEGORIES = [
    { id: 'semua', label: 'Semua' },
    { id: 'sekolah', label: 'Sekolah' },
    { id: 'pasar', label: 'Pasar' },
    { id: 'kantor', label: 'Kantor' },
    { id: 'masjid', label: 'Masjid' },
    { id: 'kesehatan', label: 'Kesehatan' },
];

export default function TurenMap({ features }: MapPageProps) {
    const [selected, setSelected] = useState<MapFeature | null>(null);
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('semua');
    const [viewState, setViewState] = useState({ ...TUREN_CENTER, pitch: 0, bearing: 0 });

    const filtered = useMemo(() => {
        return features.filter((f) => {
            const matchesCategory = activeCategory === 'semua' || f.category === activeCategory;
            const matchesQuery = query.trim() === '' || f.name.toLowerCase().includes(query.trim().toLowerCase());
            return matchesCategory && matchesQuery;
        });
    }, [features, activeCategory, query]);

    const searchResults = query.trim() === '' ? [] : filtered.slice(0, 6);

    function flyToFeature(feature: MapFeature) {
        setSelected(feature);
        setQuery('');
        setViewState((v) => ({ ...v, longitude: feature.longitude, latitude: feature.latitude, zoom: 16 }));
    }

    function locateMe() {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition((pos) => {
            setViewState((v) => ({
                ...v,
                longitude: pos.coords.longitude,
                latitude: pos.coords.latitude,
                zoom: 16,
            }));
        });
    }

    return (
        <>
            <Head title="Peta Kecamatan Turen" />
            <div className="relative h-screen w-screen overflow-hidden bg-white">
                <MapGL
                    {...viewState}
                    onMove={(e) => setViewState(e.viewState)}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle="/styles/turen-light.json"
                    onClick={() => setSelected(null)}
                >
                    <NavigationControl position="bottom-right" showCompass={false} style={{ marginBottom: 90 }} />

                    {filtered.map((feature) => (
                        <Marker
                            key={feature.id}
                            longitude={feature.longitude}
                            latitude={feature.latitude}
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                flyToFeature(feature);
                            }}
                        >
                            <button
                                className={cn(
                                    'flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-md transition-transform',
                                    selected?.id === feature.id
                                        ? 'scale-125 bg-red-500'
                                        : 'bg-neutral-800 hover:scale-110',
                                )}
                            >
                                <MapPin className="h-4 w-4 text-white" />
                            </button>
                        </Marker>
                    ))}
                </MapGL>

                {/* Search bar + filter kategori mengambang di atas */}
                <div className="absolute top-4 left-1/2 w-[92%] max-w-md -translate-x-1/2 sm:left-4 sm:w-80 sm:translate-x-0">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari lokasi di Turen..."
                            className="rounded-full border-none bg-white/95 pl-9 shadow-lg backdrop-blur"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {searchResults.length > 0 && (
                        <div className="mt-2 overflow-hidden rounded-2xl bg-white/95 shadow-lg backdrop-blur">
                            {searchResults.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => flyToFeature(f)}
                                    className="flex w-full items-center gap-3 border-b border-neutral-100 px-4 py-3 text-left last:border-b-0 hover:bg-neutral-50"
                                >
                                    <MapPin className="h-4 w-4 shrink-0 text-neutral-400" />
                                    <div>
                                        <p className="text-sm font-medium text-neutral-900">{f.name}</p>
                                        <p className="text-xs text-neutral-500 capitalize">{f.category}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={cn(
                                    'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium shadow-md transition-colors',
                                    activeCategory === cat.id
                                        ? 'bg-neutral-900 text-white'
                                        : 'bg-white/95 text-neutral-700 backdrop-blur hover:bg-white',
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tombol lokasi saya */}
                <button
                    onClick={locateMe}
                    className="absolute right-4 bottom-24 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg hover:bg-neutral-50 sm:bottom-6"
                >
                    <LocateFixed className="h-5 w-5 text-blue-600" />
                </button>

                {/* Bottom sheet detail lokasi, ala Apple Maps */}
                <div
                    className={cn(
                        'absolute inset-x-0 bottom-0 rounded-t-2xl bg-white shadow-2xl transition-transform duration-300',
                        selected ? 'translate-y-0' : 'translate-y-full',
                    )}
                >
                    {selected && (
                        <div className="p-5 pb-8">
                            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-neutral-200" />
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-neutral-900">{selected.name}</h2>
                                    <span className="mt-1 inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 capitalize">
                                        {selected.category}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setSelected(null)}
                                    className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {selected.address && <p className="mt-3 text-sm text-neutral-600">{selected.address}</p>}

                            {selected.description && (
                                <p className="mt-2 text-sm text-neutral-500">{selected.description}</p>
                            )}

                            {selected.phone && (
                                <a
                                    href={`https://wa.me/${selected.phone.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-green-600 py-3 text-sm font-medium text-white hover:bg-green-700"
                                >
                                    <Phone className="h-4 w-4" />
                                    Hubungi via WhatsApp
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
