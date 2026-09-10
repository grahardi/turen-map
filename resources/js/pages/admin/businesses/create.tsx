import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CATEGORY_OPTIONS = ['kuliner', 'wisata', 'industri', 'kesehatan', 'pasar', 'jasa'];

export default function AdminBusinessCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        category: 'kuliner',
        village: '',
        description: '',
        address: '',
        phone: '',
        hours: '',
        is_verified: false as boolean,
        latitude: '',
        longitude: '',
        photo: null as File | null,
        website_url: '',
        facebook_url: '',
        instagram_url: '',
        tiktok_url: '',
        shopee_url: '',
        youtube_url: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/bisnis', { forceFormData: true });
    }

    return (
        <>
            <Head title="Tambah Data Bisnis" />
            <div className="mx-auto max-w-lg p-4">
                <Link href="/admin/bisnis" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke daftar
                </Link>
                <h1 className="mt-3 text-xl font-bold">Tambah Data Bisnis</h1>

                <form onSubmit={submit} className="mt-5 space-y-4">
                    <div>
                        <Label htmlFor="name">Nama usaha / lokasi</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1.5" />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <Label htmlFor="slug">Handle / URL (opsional)</Label>
                        <div className="mt-1.5 flex items-center gap-1 text-sm">
                            <span className="text-muted-foreground">turen.id/@</span>
                            <Input
                                id="slug"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value.toLowerCase())}
                                placeholder="otomatis dari nama kalau dikosongkan"
                                className="flex-1"
                            />
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Huruf kecil, angka, dan tanda hubung (-) saja.</p>
                        {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug}</p>}
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
                        <input id="photo" type="file" accept="image/*" onChange={(e) => setData('photo', e.target.files?.[0] ?? null)} className="mt-1.5 block w-full text-sm" />
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
                        Simpan Data
                    </button>
                </form>
            </div>
        </>
    );
}
