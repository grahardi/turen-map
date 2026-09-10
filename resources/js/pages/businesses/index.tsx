import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, ChevronRight, Clock, Compass, Heart, MapPin, PlusCircle, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Business {
    id: number;
    slug: string;
    name: string;
    category: string;
    village: string | null;
    description: string | null;
    address: string | null;
    phone: string | null;
    hours: string | null;
    is_verified: boolean;
    latitude: number | null;
    longitude: number | null;
    photo_url: string | null;
}

interface Category {
    key: string;
    label: string;
}

interface PageProps {
    businesses: Business[];
    categories: Category[];
}

const QUICK_TAGS = [
    { label: '🍜 Bakso Turen', query: 'bakso' },
    { label: '🕌 Masjid Tiban', query: 'masjid tiban' },
    { label: '🏭 PT Pindad', query: 'pindad' },
    { label: '🏥 RS Bokor', query: 'rs bokor' },
];

const VILLAGES = ['Turen Kota', 'Sananrejo', 'Sedayu', 'Gedog Wetan', 'Kedok', 'Tanggungharjo', 'Paringan', 'Jeru'];

export default function BusinessIndex({ businesses, categories }: PageProps) {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('semua');

    const filtered = useMemo(() => {
        return businesses.filter((b) => {
            const matchesCategory = activeCategory === 'semua' || b.category === activeCategory;
            const q = query.trim().toLowerCase();
            const matchesQuery =
                q === '' ||
                b.name.toLowerCase().includes(q) ||
                b.village?.toLowerCase().includes(q) ||
                b.address?.toLowerCase().includes(q);
            return matchesCategory && matchesQuery;
        });
    }, [businesses, activeCategory, query]);

    return (
        <>
            <Head title="TurenID — Direktori Usaha & Destinasi Turen" />
            <div className="flex min-h-screen flex-col bg-slate-50 font-['Inter'] text-slate-800">
                {/* Header sticky */}
                <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 text-xl font-black text-white shadow-md shadow-emerald-500/20">
                                T
                            </div>
                            <div>
                                <span className="block text-xl font-bold tracking-tight text-slate-900">
                                    Turen<span className="text-emerald-600">ID</span>
                                </span>
                                <span className="block text-[10px] font-medium tracking-wider text-slate-500 uppercase">
                                    Direktori Turen Malang
                                </span>
                            </div>
                        </Link>

                        <div className="mx-4 hidden max-w-md flex-1 md:flex">
                            <div className="relative w-full">
                                <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Cari toko, kuliner, atau jasa di Turen..."
                                    className="rounded-full border-transparent bg-slate-100 pl-10 focus:border-emerald-500 focus:bg-white"
                                />
                            </div>
                        </div>

                        <Link
                            href="/bisnis/tambah"
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-700"
                        >
                            <PlusCircle className="h-4 w-4" />
                            <span className="hidden sm:inline">Tambah Usaha</span>
                        </Link>
                    </div>
                </header>

                <main className="flex-grow">
                    {/* Hero */}
                    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 py-12 text-white lg:py-16">
                        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

                        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-emerald-300 uppercase">
                                <MapPin className="h-3.5 w-3.5" /> Kecamatan Turen, Kab. Malang
                            </div>
                            <h1 className="mx-auto max-w-3xl text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                                Temukan usaha, kuliner &amp; jasa lokal terbaik di{' '}
                                <span className="bg-gradient-to-r from-emerald-300 via-emerald-200 to-amber-300 bg-clip-text text-transparent">
                                    Turen
                                </span>
                            </h1>
                            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
                                Direktori warga untuk UMKM, wisata religi, industri, dan layanan publik di seluruh
                                desa Kecamatan Turen.
                            </p>

                            <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl border border-white/20 bg-white p-2 shadow-2xl shadow-black/40 sm:flex-row">
                                <div className="relative flex flex-grow items-center">
                                    <Search className="ml-4 h-4 w-4 text-slate-400" />
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Cari nama toko, warung, rumah sakit, alamat..."
                                        className="w-full py-3 pr-4 pl-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                                    />
                                </div>
                                <button className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-700">
                                    Cari Sekarang
                                </button>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
                                <span className="mr-1 font-medium text-slate-400">Pencarian Populer:</span>
                                {QUICK_TAGS.map((tag) => (
                                    <button
                                        key={tag.query}
                                        onClick={() => setQuery(tag.query)}
                                        className="rounded-full border border-white/10 bg-white/10 px-3 py-1 transition-colors hover:bg-white/20"
                                    >
                                        {tag.label}
                                    </button>
                                ))}
                            </div>

                            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 border-t border-slate-800 pt-8 text-center sm:grid-cols-4">
                                <div>
                                    <div className="text-2xl font-bold text-emerald-400">{businesses.length}+</div>
                                    <div className="mt-0.5 text-xs text-slate-400">Usaha Terdaftar</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-emerald-400">{VILLAGES.length}</div>
                                    <div className="mt-0.5 text-xs text-slate-400">Kelurahan / Desa</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-amber-400">
                                        {businesses.filter((b) => b.is_verified).length}
                                    </div>
                                    <div className="mt-0.5 text-xs text-slate-400">Terverifikasi</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-emerald-400">{categories.length}</div>
                                    <div className="mt-0.5 text-xs text-slate-400">Kategori</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Floating filter bar */}
                    <section className="relative z-10 mx-auto -mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:p-5">
                            <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                                <button
                                    onClick={() => setActiveCategory('semua')}
                                    className={cn(
                                        'inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all',
                                        activeCategory === 'semua'
                                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                                    )}
                                >
                                    Semua
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat.key}
                                        onClick={() => setActiveCategory(cat.key)}
                                        className={cn(
                                            'inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all',
                                            activeCategory === cat.key
                                                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                                        )}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Card grid */}
                    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <p className="mb-5 text-sm text-slate-500">
                            Menampilkan <strong>{filtered.length}</strong> usaha
                        </p>

                        {filtered.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
                                    <Search className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">Tidak ada usaha yang cocok</h3>
                                <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                                    Coba ubah kata kunci pencarian atau kategori filter.
                                </p>
                                <Link
                                    href="/bisnis/tambah"
                                    className="mt-4 inline-block rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                                >
                                    Tambah data baru
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filtered.map((b) => (
                                    <Link
                                        href={`/@${b.slug}`}
                                        key={b.id}
                                        className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
                                    >
                                        <div className="relative h-48 overflow-hidden bg-slate-100">
                                            {b.photo_url ? (
                                                <img
                                                    src={b.photo_url}
                                                    alt={b.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <MapPin className="h-8 w-8 text-slate-300" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                                            <div className="absolute top-3 left-3">
                                                <span className="rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-800 capitalize backdrop-blur">
                                                    {b.category}
                                                </span>
                                            </div>

                                            {b.hours && (
                                                <div className="absolute bottom-3 left-3">
                                                    <span className="inline-flex items-center gap-1 rounded bg-black/40 px-2 py-0.5 text-[10px] font-medium text-slate-200 backdrop-blur">
                                                        <Clock className="h-3 w-3" /> {b.hours}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-grow flex-col justify-between space-y-3 p-5">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between">
                                                    {b.village && (
                                                        <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                                                            Desa {b.village}
                                                        </span>
                                                    )}
                                                    {b.is_verified && (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-500">
                                                            <CheckCircle2 className="h-3 w-3" /> Resmi
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="line-clamp-2 text-base leading-snug font-bold text-slate-900 transition-colors group-hover:text-emerald-600">
                                                    {b.name}
                                                </h3>
                                                {b.address && (
                                                    <p className="flex items-start gap-1.5 text-xs text-slate-500">
                                                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500" />
                                                        <span className="line-clamp-2">{b.address}</span>
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                                                {b.description ? (
                                                    <span className="line-clamp-1 text-xs text-slate-400">{b.description}</span>
                                                ) : (
                                                    <span />
                                                )}
                                                <span className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-all group-hover:bg-emerald-600 group-hover:text-white">
                                                    Detail
                                                    <ChevronRight className="h-3 w-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Spotlight CTA */}
                    <section className="my-8 bg-gradient-to-r from-emerald-900 to-slate-900 py-12 text-white">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                                <div className="max-w-xl space-y-3">
                                    <span className="inline-block rounded-md border border-amber-400/20 bg-amber-500/20 px-3 py-1 text-xs font-bold tracking-wider text-amber-300 uppercase">
                                        Pusat Industri &amp; Pariwisata
                                    </span>
                                    <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                                        Punya usaha atau toko di Turen?
                                    </h2>
                                    <p className="text-sm leading-relaxed text-slate-300">
                                        Daftarkan usaha secara gratis di direktori TurenID agar mudah ditemukan
                                        warga Turen dan wisatawan.
                                    </p>
                                </div>
                                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                                    <Link
                                        href="/bisnis/tambah"
                                        className="rounded-xl bg-amber-500 px-6 py-3 text-center text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-600"
                                    >
                                        Daftarkan Gratis
                                    </Link>
                                    <a
                                        href="https://maps.google.com/?q=Turen+Malang"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-white/20"
                                    >
                                        <Compass className="h-4 w-4" /> Jelajahi Peta Turen
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="border-t border-slate-800 bg-slate-900 text-xs text-slate-400">
                    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-lg font-bold text-white">
                                        T
                                    </div>
                                    <span className="text-lg font-bold text-white">
                                        Turen<span className="text-emerald-500">ID</span>
                                    </span>
                                </div>
                                <p className="leading-relaxed text-slate-400">
                                    Direktori bisnis, UMKM, dan destinasi terlengkap untuk wilayah Kecamatan Turen,
                                    Kabupaten Malang, Jawa Timur.
                                </p>
                            </div>

                            <div>
                                <h4 className="mb-3 text-[11px] font-bold tracking-wider text-white uppercase">
                                    Kategori Populer
                                </h4>
                                <ul className="space-y-2">
                                    {categories.map((cat) => (
                                        <li key={cat.key}>
                                            <button
                                                onClick={() => setActiveCategory(cat.key)}
                                                className="transition-colors hover:text-white"
                                            >
                                                {cat.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="mb-3 text-[11px] font-bold tracking-wider text-white uppercase">
                                    Desa &amp; Kelurahan
                                </h4>
                                <ul className="grid grid-cols-2 gap-y-1.5">
                                    {VILLAGES.map((v) => (
                                        <li key={v}>{v}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="mb-3 text-[11px] font-bold tracking-wider text-white uppercase">
                                    Informasi
                                </h4>
                                <p className="mb-3 text-slate-400">
                                    Hubungi pengelola portal untuk info lebih lanjut.
                                </p>
                                <div className="flex items-center gap-3 text-base">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-white transition-colors hover:bg-emerald-600">
                                        <Heart className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-slate-800 pt-6 text-center text-slate-500">
                            © {new Date().getFullYear()} TurenID — Direktori Kecamatan Turen
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
