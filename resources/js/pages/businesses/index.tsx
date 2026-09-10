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

const SOCIALS = ['IG', 'FB', 'WA'];

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
                {/* Hero penuh, gradasi hijau sawah dengan overlay */}
                <section className="relative overflow-hidden bg-[#1F4D3A] pt-16 pb-36">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at 15% 20%, #E8A33D 0%, transparent 35%), radial-gradient(circle at 85% 60%, #FFFFFF 0%, transparent 30%)',
                        }}
                    />
                    <div className="relative mx-auto max-w-4xl px-6 text-center">
                        <p className="text-sm font-medium tracking-wide text-[#E8A33D]">
                            Kecamatan Turen · Kabupaten Malang
                        </p>
                        <h1 className="mt-3 font-['Fraunces'] text-4xl font-semibold text-white sm:text-5xl">
                            Semua yang dicari ada di Turen
                        </h1>
                        <p className="mx-auto mt-3 max-w-md text-sm text-[#CFE0D6]">
                            Direktori usaha, layanan, dan lokasi penting di seluruh desa se-Kecamatan Turen.
                        </p>
                    </div>
                </section>

                {/* Search card mengambang, overlap ke hero */}
                <div className="relative z-10 mx-auto -mt-20 max-w-4xl px-6">
                    <div className="rounded-xl bg-white p-5 shadow-[0_20px_50px_-15px_rgba(31,77,58,0.35)]">
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#8A8478]" />
                                <Input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Cari nama usaha atau desa..."
                                    className="h-12 rounded-md border-[#E5DFD1] pl-12 text-base text-[#2A2118] shadow-none"
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
                                className="flex h-12 shrink-0 items-center gap-2 rounded-md bg-[#E8A33D] px-5 text-sm font-semibold text-[#2A2118] hover:bg-[#dc9530]"
                            >
                                <Plus className="h-4 w-4" />
                                <span className="hidden sm:inline">Tambah</span>
                            </Link>
                        </div>

                        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        'shrink-0 rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors',
                                        activeCategory === cat
                                            ? 'bg-[#1F4D3A] text-white'
                                            : 'bg-[#F3EEE3] text-[#2A2118] hover:bg-[#e9e1cd]',
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Konten */}
                <main className="mx-auto max-w-5xl px-6 pt-10 pb-16">
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
                                    className="group relative flex flex-col overflow-hidden rounded-md border border-[#EFEAE0] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_10px_30px_rgba(31,77,58,0.12)]"
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

                {/* Footer — ikon sosial bulat, info kontak */}
                <footer className="bg-[#1F4D3A] px-6 py-10">
                    <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                        <div>
                            <p className="font-['Fraunces'] text-xl font-semibold text-white">Direktori Turen</p>
                            <p className="mt-1 max-w-xs text-sm text-[#9FB8AA]">
                                Dirawat oleh warga untuk warga Kecamatan Turen, Kabupaten Malang, Jawa Timur.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            {SOCIALS.map((s) => (
                                <div
                                    key={s}
                                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white transition-colors hover:bg-[#E8A33D] hover:text-[#2A2118]"
                                >
                                    {s}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mx-auto mt-6 max-w-5xl border-t border-white/10 pt-4 text-xs text-[#9FB8AA]">
                        Kantor Kecamatan Turen · Jl. Panglima Sudirman, Turen, Kabupaten Malang
                    </div>
                </footer>
            </div>
        </>
    );
}
