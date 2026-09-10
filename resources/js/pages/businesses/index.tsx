import { Head, Link, router } from '@inertiajs/react';
import { MapPin, Phone, Plus, Search, Trash2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Business {
    id: number;
    name: string;
    category: string;
    village: string | null;
    description: string | null;
    address: string | null;
    phone: string | null;
    latitude: number | null;
    longitude: number | null;
    photo_url: string | null;
}

interface PageProps {
    businesses: Business[];
}

export default function BusinessIndex({ businesses }: PageProps) {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('semua');

    const categories = useMemo(() => {
        const unique = Array.from(new Set(businesses.map((b) => b.category)));
        return ['semua', ...unique];
    }, [businesses]);

    const filtered = useMemo(() => {
        return businesses.filter((b) => {
            const matchesCategory = activeCategory === 'semua' || b.category === activeCategory;
            const matchesQuery =
                query.trim() === '' ||
                b.name.toLowerCase().includes(query.trim().toLowerCase()) ||
                b.village?.toLowerCase().includes(query.trim().toLowerCase());
            return matchesCategory && matchesQuery;
        });
    }, [businesses, activeCategory, query]);

    function handleDelete(id: number) {
        if (confirm('Hapus data ini?')) {
            router.delete(`/bisnis/${id}`);
        }
    }

    return (
        <>
            <Head title="Direktori Bisnis Kecamatan Turen" />
            <div className="min-h-screen bg-neutral-50">
                <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/95 backdrop-blur">
                    <div className="mx-auto max-w-5xl px-4 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-semibold text-neutral-900">Direktori Bisnis Turen</h1>
                            <Link
                                href="/bisnis/tambah"
                                className="flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
                            >
                                <Plus className="h-4 w-4" />
                                Tambah
                            </Link>
                        </div>

                        <div className="relative mt-4">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Cari nama usaha atau desa..."
                                className="rounded-full pl-9"
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

                        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors',
                                        activeCategory === cat
                                            ? 'bg-neutral-900 text-white'
                                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-5xl px-4 py-6">
                    {filtered.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-neutral-300 py-16 text-center text-neutral-500">
                            <p>Belum ada data yang cocok.</p>
                            <Link href="/bisnis/tambah" className="mt-2 inline-block text-sm font-medium text-neutral-900 underline">
                                Tambah data baru
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((b) => (
                                <div
                                    key={b.id}
                                    className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                                >
                                    {b.photo_url ? (
                                        <img src={b.photo_url} alt={b.name} className="h-36 w-full object-cover" />
                                    ) : (
                                        <div className="flex h-36 w-full items-center justify-center bg-neutral-100">
                                            <MapPin className="h-8 w-8 text-neutral-300" />
                                        </div>
                                    )}

                                    <button
                                        onClick={() => handleDelete(b.id)}
                                        className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 opacity-0 shadow transition-opacity group-hover:opacity-100"
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </button>

                                    <div className="p-4">
                                        <span className="inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 capitalize">
                                            {b.category}
                                        </span>
                                        <h3 className="mt-2 font-semibold text-neutral-900">{b.name}</h3>
                                        {b.village && <p className="text-xs text-neutral-500">Desa {b.village}</p>}
                                        {b.address && <p className="mt-1 text-sm text-neutral-600">{b.address}</p>}
                                        {b.description && (
                                            <p className="mt-1 line-clamp-2 text-sm text-neutral-500">{b.description}</p>
                                        )}

                                        {b.phone && (
                                            <a
                                                href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700"
                                            >
                                                <Phone className="h-4 w-4" />
                                                WhatsApp
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
