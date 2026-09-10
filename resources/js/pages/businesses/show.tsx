import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Clock, MapPin, Phone } from 'lucide-react';

interface Business {
    id: number;
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
    website_url: string | null;
    facebook_url: string | null;
    instagram_url: string | null;
    tiktok_url: string | null;
    shopee_url: string | null;
    youtube_url: string | null;
}

interface PageProps {
    business: Business;
}

export default function BusinessShow({ business }: PageProps) {
    const waLink = business.phone
        ? `https://wa.me/62${business.phone.replace(/[^0-9]/g, '').replace(/^0/, '')}?text=${encodeURIComponent(
              `Halo ${business.name}, saya menemukan kontak Anda dari TurenID.`,
          )}`
        : null;

    const mapsLink = `https://maps.google.com/?q=${encodeURIComponent(
        business.latitude && business.longitude
            ? `${business.latitude},${business.longitude}`
            : `${business.name} Turen`,
    )}`;

    return (
        <>
            <Head title={`${business.name} — TurenID`} />
            <div className="min-h-screen bg-slate-50 font-['Inter']">
                <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
                    <div className="mx-auto flex h-16 max-w-3xl items-center px-4 sm:px-6">
                        <Link href="/bisnis" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke direktori
                        </Link>
                    </div>
                </header>

                <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="relative h-64 bg-slate-100 sm:h-80">
                            {business.photo_url ? (
                                <img src={business.photo_url} alt={business.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <MapPin className="h-10 w-10 text-slate-300" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            <span className="absolute top-4 left-4 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-slate-800 capitalize backdrop-blur">
                                {business.category}
                            </span>
                        </div>

                        <div className="p-6 sm:p-8">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                                <h1 className="text-2xl font-bold text-slate-900">{business.name}</h1>
                                {business.is_verified && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600">
                                        <CheckCircle2 className="h-3.5 w-3.5" /> Terverifikasi
                                    </span>
                                )}
                            </div>

                            {business.village && (
                                <p className="mt-1 text-sm text-slate-500">Desa {business.village}</p>
                            )}

                            {business.address && (
                                <p className="mt-3 flex items-start gap-2 text-sm text-slate-600">
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                                    {business.address}
                                </p>
                            )}

                            {business.hours && (
                                <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                                    <Clock className="h-4 w-4 shrink-0 text-slate-400" />
                                    {business.hours}
                                </p>
                            )}

                            {business.description && (
                                <p className="mt-4 text-sm leading-relaxed text-slate-600">{business.description}</p>
                            )}

                            <div className="mt-5 flex flex-wrap gap-2">
                                <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                    ✓ Terdaftar di TurenID
                                </span>
                                {business.village && (
                                    <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                        ✓ Lokal Desa {business.village}
                                    </span>
                                )}
                            </div>

                            {(business.website_url ||
                                business.facebook_url ||
                                business.instagram_url ||
                                business.tiktok_url ||
                                business.shopee_url ||
                                business.youtube_url) && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {business.website_url && (
                                        <a href={business.website_url} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                                            🌐 Website
                                        </a>
                                    )}
                                    {business.facebook_url && (
                                        <a href={business.facebook_url} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                                            Facebook
                                        </a>
                                    )}
                                    {business.instagram_url && (
                                        <a href={business.instagram_url} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                                            Instagram
                                        </a>
                                    )}
                                    {business.tiktok_url && (
                                        <a href={business.tiktok_url} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                                            TikTok
                                        </a>
                                    )}
                                    {business.shopee_url && (
                                        <a href={business.shopee_url} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                                            Shopee
                                        </a>
                                    )}
                                    {business.youtube_url && (
                                        <a href={business.youtube_url} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                                            YouTube
                                        </a>
                                    )}
                                </div>
                            )}

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                {waLink && (
                                    <a
                                        href={waLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                                    >
                                        <Phone className="h-4 w-4" />
                                        Hubungi via WhatsApp
                                    </a>
                                )}
                                <a
                                    href={mapsLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    <MapPin className="h-4 w-4" />
                                    Lihat di Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
