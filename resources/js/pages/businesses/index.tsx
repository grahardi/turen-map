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

// Strip dekoratif bergerigi ala umbul-umbul/bunting pasar, jadi pemisah sebelum footer.
function BuntingDivider() {
    return (
        <svg viewBox="0 0 100 6" preserveAspectRatio="none" className="block h-3 w-full text-[#1F4D3A]">
            <polygon points="0,0 3,6 6,0" fill="currentColor" />
            <polygon points="8,0 11,6 14,0" fill="currentColor" />
            <polygon points="16,0 19,6 22,0" fill="currentColor" />
            <polygon points="24,0 27,6 30,0" fill="currentColor" />
            <polygon points="32,0 35,6 38,0" fill="currentColor" />
            <polygon points="40,0 43,6 46,0" fill="currentColor" />
            <polygon points="48,0 51,6 54,0" fill="currentColor" />
            <polygon points="56,0 59,6 62,0" fill="currentColor" />
            <polygon points="64,0 67,6 70,0" fill="currentColor" />
            <polygon points="72,0 75,6 78,0" fill="currentColor" />
            <polygon points="80,0 83,6 86,0" fill="currentColor" />
            <polygon points="88,0 91,6 94,0" fill="currentColor" />
            <polygon points="96,0 99,6 100,4" fill="currentColor" />
        </svg>
    );
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
            <div className="min-h-screen bg-white font-['Work_Sans']">
                {/* Header — gapura hijau membingkai halaman */}
                <header className="bg-[#1F4D3A] px-6 pt-10 pb-8">
                    <div className="mx-auto max-w-5xl">
                        <p className="text-sm font-medium tracking-wide text-[#E8A33D]">Kecamatan Turen, Kabupaten Malang</p>
                        <h1 className="mt-1 font-['Fraunces'] text-4xl font-semibold text-white sm:text-5xl">
                            Direktori Turen
                        </h1>
                        <p className="mt-2 max-w-md text-sm text-[#CFE0D6]">
                            Kumpulan usaha, layanan, dan lokasi penting di seluruh desa se-Kecamatan Turen.
                        </p>

                        {/* Search bar — kotak putih tegas, tertanam di pita hijau */}
                        <div className="mt-6 flex items-center gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#8A8478]" />
                                <Input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Cari nama usaha atau desa..."
                                    className="h-14 rounded-md border-none bg-white pl-12 text-base text-[#2A2118] shadow-none"
                                />
                                {query && (
                                    <button
                                        onClick={() => setQuery('')}
                                        className="absolute top-1/2 right-4 -translate-y-1/2 text-[#8A8478]"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                            <Link
                                href="/bisnis/tambah"
                                className="flex h-14 shrink-0 items-center gap-2 rounded-md bg-[#E8A33D] px-5 text-sm font-semibold text-[#2A2118] hover:bg-[#dc9530]"
                            >
                                <Plus className="h-4 w-4" />
                                <span className="hidden sm:inline">Tambah Data</span>
                            </Link>
                        </div>

                        {/* Filter kategori — tab underline */}
                        <div className="mt-6 flex gap-6 overflow-x-auto border-b border-white/15 [scrollbar-width:none]">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        'shrink-0 border-b-2 pb-3 text-sm font-medium capitalize transition-colors',
                                        activeCategory === cat
                                            ? 'border-[#E8A33D] text-white'
                                            : 'border-transparent text-[#9FB8AA] hover:text-white',
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                {/* Konten */}
                <main className="mx-auto max-w-5xl px-6 py-10">
                    <p className="mb-5 text-sm text-[#8A8478]">{filtered.length} lokasi ditemukan</p>

                    {filtered.length === 0 ? (
                        <div className="rounded-md border border-dashed border-[#E5DFD1] bg-[#F3EEE3] py-16 text-center text-[#8A8478]">
                            <p>Belum ada data yang cocok.</p>
                            <Link href="/bisnis/tambah" className="mt-2 inline-block text-sm font-semibold text-[#1F4D3A] underline">
                                Tambah data baru
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((b) => (
                                <div
                                    key={b.id}
                                    className="group relative flex flex-col overflow-hidden rounded-md border border-[#E5DFD1] bg-white"
                                >
                                    <div className="relative h-40 w-full shrink-0 bg-[#F3EEE3]">
                                        {b.photo_url ? (
                                            <img src={b.photo_url} alt={b.name} className="size-full object-cover" />
                                        ) : (
                                            <div className="flex size-full items-center justify-center">
                                                <MapPin className="h-8 w-8 text-[#D8CFBB]" />
                                            </div>
                                        )}
                                        <button
                                            onClick={() => handleDelete(b.id)}
                                            className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 opacity-0 shadow transition-opacity group-hover:opacity-100"
                                        >
                                            <Trash2 className="h-3.5 w-3.5 text-red-600" />
                                        </button>
                                    </div>

                                    <div className="flex flex-1 flex-col gap-2 p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-['Fraunces'] text-lg leading-snug font-semibold text-[#2A2118]">
                                                {b.name}
                                            </h3>
                                            <span className="mt-1 shrink-0 rounded-sm bg-[#F3EEE3] px-2 py-0.5 text-xs font-medium text-[#1F4D3A] capitalize">
                                                {b.category}
                                            </span>
                                        </div>

                                        {b.village && <p className="text-xs text-[#8A8478] capitalize">Desa {b.village}</p>}
                                        {b.address && <p className="text-sm text-[#4A4438]">{b.address}</p>}
                                        {b.description && (
                                            <p className="line-clamp-2 text-sm text-[#8A8478]">{b.description}</p>
                                        )}

                                        {b.phone && (
                                            <a
                                                href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mt-auto flex items-center justify-center gap-2 border-t-2 border-[#E8A33D] pt-3 text-sm font-semibold text-[#1F4D3A] hover:text-[#163828]"
                                            >
                                                <Phone className="h-4 w-4" />
                                                Hubungi via WhatsApp
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>

                <BuntingDivider />

                {/* Footer — gapura hijau, cermin dari header */}
                <footer className="bg-[#1F4D3A] px-6 py-10">
                    <div className="mx-auto flex max-w-5xl flex-col justify-between gap-6 sm:flex-row">
                        <div>
                            <p className="font-['Fraunces'] text-xl font-semibold text-white">Direktori Turen</p>
                            <p className="mt-1 max-w-xs text-sm text-[#9FB8AA]">
                                Dirawat oleh warga untuk warga Kecamatan Turen, Kabupaten Malang, Jawa Timur.
                            </p>
                        </div>
                        <div className="text-sm text-[#9FB8AA]">
                            <p className="font-medium text-white">Kantor Kecamatan Turen</p>
                            <p className="mt-1">Jl. Panglima Sudirman, Turen, Kabupaten Malang</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
