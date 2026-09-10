import { Head, Link, router } from '@inertiajs/react';
import { Heart, MapPin, Phone, Plus, Search, Trash2, X } from 'lucide-react';
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
            <div className="min-h-screen bg-[#F9F9F9] font-['Poppins']">
                {/* Header */}
                <header className="border-b border-[#D9D9D9] bg-white">
                    <div className="mx-auto max-w-6xl px-6 py-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-black">Direktori Bisnis Turen</h1>
                                <p className="text-sm font-light text-[#A6A6A6]">Temukan usaha &amp; layanan di Kecamatan Turen</p>
                            </div>
                            <Link
                                href="/bisnis/tambah"
                                className="flex items-center gap-1.5 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                            >
                                <Plus className="h-4 w-4" />
                                Tambah Data
                            </Link>
                        </div>

                        {/* Search bar ala "Hotel Search" */}
                        <div className="relative mt-6">
                            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#A6A6A6]" />
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Cari nama usaha atau desa..."
                                className="h-14 rounded-xl border-[#D9D9D9] pl-12 text-base"
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery('')}
                                    className="absolute top-1/2 right-4 -translate-y-1/2 text-[#A6A6A6]"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>

                        {/* Filter kategori ala radio "all / Hotels / Flights / Multi" */}
                        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        'shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold capitalize transition-colors',
                                        activeCategory === cat
                                            ? 'border-black bg-black text-white'
                                            : 'border-[#D9D9D9] bg-white text-black hover:border-black',
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-6xl px-6 py-8">
                    <p className="mb-4 text-sm font-medium text-black">
                        {filtered.length} lokasi ditemukan
                    </p>

                    {filtered.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[#D9D9D9] bg-white py-16 text-center text-[#A6A6A6]">
                            <p className="font-medium">Belum ada data yang cocok.</p>
                            <Link href="/bisnis/tambah" className="mt-2 inline-block text-sm font-semibold text-black underline">
                                Tambah data baru
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {filtered.map((b) => (
                                <div
                                    key={b.id}
                                    className="group relative flex flex-col gap-2 rounded-lg border border-[#D9D9D9] bg-white p-2 pb-5"
                                >
                                    <div className="relative h-[150px] w-full shrink-0 overflow-hidden rounded-t-[4px]">
                                        {b.photo_url ? (
                                            <img src={b.photo_url} alt={b.name} className="size-full object-cover" />
                                        ) : (
                                            <div className="flex size-full items-center justify-center bg-[#F9F9F9]">
                                                <MapPin className="h-8 w-8 text-[#D9D9D9]" />
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2 flex size-[25px] items-center justify-center rounded-full bg-black/70">
                                            <Heart className="h-3.5 w-3.5 text-white" />
                                        </div>
                                        <button
                                            onClick={() => handleDelete(b.id)}
                                            className="absolute bottom-2 right-2 rounded-full bg-white/90 p-1.5 opacity-0 shadow transition-opacity group-hover:opacity-100"
                                        >
                                            <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-0.5 px-1">
                                        <h3 className="text-lg font-bold text-black">{b.name}</h3>
                                        <p className="text-sm font-semibold text-[#A6A6A6] capitalize">{b.category}</p>
                                    </div>

                                    {b.village && (
                                        <p className="px-1 text-xs font-medium text-black capitalize">Desa {b.village}</p>
                                    )}

                                    {b.description && (
                                        <p className="line-clamp-2 px-1 text-[10px] font-light text-black">{b.description}</p>
                                    )}

                                    {b.phone && (
                                        <a
                                            href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mx-1 mt-1 flex items-center justify-center gap-2 rounded-lg bg-green-600 py-2 text-sm font-semibold text-white hover:bg-green-700"
                                        >
                                            <Phone className="h-4 w-4" />
                                            WhatsApp
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
