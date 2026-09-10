import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CATEGORY_OPTIONS = ['kuliner', 'wisata', 'industri', 'kesehatan', 'pasar', 'jasa'];

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
    website_url: string | null;
    facebook_url: string | null;
    instagram_url: string | null;
    tiktok_url: string | null;
    shopee_url: string | null;
    youtube_url: string | null;
    microsite_path: string | null;
}

export default function AdminBusinessEdit({ business }: { business: Business }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        name: business.name ?? '',
        slug: business.slug ?? '',
        category: business.category ?? 'kuliner',
        village: business.village ?? '',
        description: business.description ?? '',
        address: business.address ?? '',
        phone: business.phone ?? '',
        hours: business.hours ?? '',
        is_verified: business.is_verified ?? false,
        latitude: business.latitude?.toString() ?? '',
        longitude: business.longitude?.toString() ?? '',
        photo: null as File | null,
        website_url: business.website_url ?? '',
        facebook_url: business.facebook_url ?? '',
        instagram_url: business.instagram_url ?? '',
        tiktok_url: business.tiktok_url ?? '',
        shopee_url: business.shopee_url ?? '',
        youtube_url: business.youtube_url ?? '',
    });

    function submit(e: React.SyntheticEvent) {
        e.preventDefault();
        post(`/admin/bisnis/${business.slug}`, { forceFormData: true });
    }

    const micrositeForm = useForm({ file: null as File | null });
    const fileInputRef = useRef<HTMLInputElement>(null);

    function uploadMicrosite(e: React.FormEvent) {
        e.preventDefault();
        if (!micrositeForm.data.file) return;
        micrositeForm.post(`/admin/bisnis/${business.slug}/situs`, {
            forceFormData: true,
            onSuccess: () => {
                micrositeForm.setData('file', null);
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
        });
    }

    function deleteMicrosite() {
        if (confirm('Hapus situs klien ini?')) {
            micrositeForm.delete(`/admin/bisnis/${business.slug}/situs`);
        }
    }

    return (
        <>
            <Head title={`Edit ${business.name}`} />
            <div className="mx-auto max-w-lg p-4">
                <Link href="/admin/bisnis" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke daftar
                </Link>
                <h1 className="mt-3 text-xl font-bold">Edit {business.name}</h1>

                <form onSubmit={submit} className="mt-5 space-y-4">
                    <div>
                        <Label htmlFor="name">Nama usaha / lokasi</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1.5" />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <Label htmlFor="category">Kategori</Label>
                        <select
                            id="category"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="mt-1.5 w-full rounded-md border px-3 py-2 text-sm capitalize"
                        >
                            {CATEGORY_OPTIONS.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="village">Desa / Kelurahan</Label>
                        <Input id="village" value={data.village} onChange={(e) => setData('village', e.target.value)} className="mt-1.5" />
                    </div>

                    <div>
                        <Label htmlFor="address">Alamat</Label>
                        <Input id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} className="mt-1.5" />
                    </div>

                    <div>
                        <Label htmlFor="description">Deskripsi</Label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={3}
                            className="mt-1.5 w-full rounded-md border px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <Label htmlFor="phone">No. WhatsApp</Label>
                        <Input id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="08123456789" className="mt-1.5" />
                    </div>

                    <div>
                        <Label htmlFor="hours">Jam Operasional</Label>
                        <Input id="hours" value={data.hours} onChange={(e) => setData('hours', e.target.value)} placeholder="08.00 - 20.00 WIB" className="mt-1.5" />
                    </div>

                    <div>
                        <Label htmlFor="photo">Foto</Label>
                        {business.photo_url && (
                            <img src={business.photo_url} alt={business.name} className="mt-1.5 mb-2 h-24 w-24 rounded-md object-cover" />
                        )}
                        <input id="photo" type="file" accept="image/*" onChange={(e) => setData('photo', e.target.files?.[0] ?? null)} className="mt-1.5 block w-full text-sm" />
                        <p className="mt-1 text-xs text-muted-foreground">Kosongkan kalau tidak ingin mengganti foto.</p>
                        {errors.photo && <p className="mt-1 text-xs text-red-600">{errors.photo}</p>}
                    </div>

                    <div>
                        <Label htmlFor="website_url">Website</Label>
                        <Input id="website_url" value={data.website_url} onChange={(e) => setData('website_url', e.target.value)} placeholder="https://..." className="mt-1.5" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label htmlFor="facebook_url">Facebook</Label>
                            <Input id="facebook_url" value={data.facebook_url} onChange={(e) => setData('facebook_url', e.target.value)} className="mt-1.5" />
                        </div>
                        <div>
                            <Label htmlFor="instagram_url">Instagram</Label>
                            <Input id="instagram_url" value={data.instagram_url} onChange={(e) => setData('instagram_url', e.target.value)} className="mt-1.5" />
                        </div>
                        <div>
                            <Label htmlFor="tiktok_url">TikTok</Label>
                            <Input id="tiktok_url" value={data.tiktok_url} onChange={(e) => setData('tiktok_url', e.target.value)} className="mt-1.5" />
                        </div>
                        <div>
                            <Label htmlFor="shopee_url">Shopee</Label>
                            <Input id="shopee_url" value={data.shopee_url} onChange={(e) => setData('shopee_url', e.target.value)} className="mt-1.5" />
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="youtube_url">YouTube</Label>
                            <Input id="youtube_url" value={data.youtube_url} onChange={(e) => setData('youtube_url', e.target.value)} className="mt-1.5" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label htmlFor="latitude">Latitude</Label>
                            <Input id="latitude" value={data.latitude} onChange={(e) => setData('latitude', e.target.value)} className="mt-1.5" />
                        </div>
                        <div>
                            <Label htmlFor="longitude">Longitude</Label>
                            <Input id="longitude" value={data.longitude} onChange={(e) => setData('longitude', e.target.value)} className="mt-1.5" />
                        </div>
                    </div>

                    <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={data.is_verified} onChange={(e) => setData('is_verified', e.target.checked)} className="rounded border-gray-300" />
                        Tandai sebagai terverifikasi
                    </label>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-md bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                        Simpan Perubahan
                    </button>
                </form>

                <div className="mt-8 rounded-xl border p-4">
                    <h2 className="text-sm font-semibold">Link Publik</h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Link default bisnis ini di direktori — selalu aktif, tidak perlu setup tambahan.
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-sm">
                        <span className="text-muted-foreground">turen.id/@</span>
                        <Input
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value.toLowerCase())}
                            className="flex-1"
                        />
                        <button
                            type="button"
                            onClick={submit}
                            disabled={processing}
                            className="shrink-0 rounded-md bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                        >
                            Simpan
                        </button>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Huruf kecil, angka, dan tanda hubung (-) saja.</p>
                    {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug}</p>}

                    <a
                        href={`https://turen.id/@${business.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block text-sm font-medium text-emerald-700 hover:underline"
                    >
                        Buka link aktif saat ini: turen.id/@{business.slug} ↗
                    </a>

                    <p className="mt-3 text-xs text-muted-foreground">
                        Subdomain sendiri (misal <span className="font-medium">{business.slug}.turen.id</span>) bisa
                        diaktifkan belakangan sebagai upgrade manual — perlu setup wildcard DNS + SSL di server
                        dulu. Belum otomatis aktif untuk sekarang. Handle di atas juga yang akan dipakai sebagai
                        nama subdomain kalau nanti diaktifkan.
                    </p>
                </div>

                <div className="mt-4 rounded-xl border p-4">
                    <h2 className="text-sm font-semibold">Situs Klien (HTML statis)</h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Upload file .html custom milik bisnis ini. Bisa diakses sekarang lewat link statis di
                        bawah, dan otomatis ikut muncul di subdomain kalau/setelah diaktifkan.
                    </p>

                    {business.microsite_path ? (
                        <div className="mt-3 flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                            <a
                                href={`/situs/${business.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-medium text-emerald-700 hover:underline"
                            >
                                Lihat situs: /situs/{business.slug}
                            </a>
                            <button
                                onClick={deleteMicrosite}
                                className="text-xs font-semibold text-red-600 hover:underline"
                            >
                                Hapus
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={uploadMicrosite} className="mt-3 flex items-center gap-2">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".html,.htm"
                                onChange={(e) => micrositeForm.setData('file', e.target.files?.[0] ?? null)}
                                className="flex-1 text-sm"
                            />
                            <button
                                type="submit"
                                disabled={micrositeForm.processing || !micrositeForm.data.file}
                                className="rounded-md bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                            >
                                Upload
                            </button>
                        </form>
                    )}
                    {micrositeForm.errors.file && (
                        <p className="mt-1 text-xs text-red-600">{micrositeForm.errors.file}</p>
                    )}
                </div>
            </div>
        </>
    );
}
