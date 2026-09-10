import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CATEGORY_OPTIONS = ['sekolah', 'pasar', 'kantor', 'masjid', 'kesehatan', 'kuliner', 'umkm', 'toko', 'lainnya'];

export default function BusinessCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: 'umkm',
        village: '',
        description: '',
        address: '',
        phone: '',
        latitude: '',
        longitude: '',
        photo_url: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/bisnis');
    }

    return (
        <>
            <Head title="Tambah Data Bisnis" />
            <div className="min-h-screen bg-neutral-50 py-8">
                <div className="mx-auto max-w-lg px-4">
                    <Link href="/bisnis" className="mb-4 flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900">
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke direktori
                    </Link>

                    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                        <h1 className="text-lg font-semibold text-neutral-900">Tambah Data Bisnis / Lokasi</h1>

                        <form onSubmit={submit} className="mt-5 space-y-4">
                            <div>
                                <Label htmlFor="name">Nama usaha / lokasi</Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1" />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="category">Kategori</Label>
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm capitalize"
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
                                <Input id="village" value={data.village} onChange={(e) => setData('village', e.target.value)} className="mt-1" />
                            </div>

                            <div>
                                <Label htmlFor="address">Alamat</Label>
                                <Input id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} className="mt-1" />
                            </div>

                            <div>
                                <Label htmlFor="description">Deskripsi</Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone">No. WhatsApp (opsional)</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="08123456789"
                                    className="mt-1"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="latitude">Latitude (opsional)</Label>
                                    <Input
                                        id="latitude"
                                        value={data.latitude}
                                        onChange={(e) => setData('latitude', e.target.value)}
                                        placeholder="-8.1843"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="longitude">Longitude (opsional)</Label>
                                    <Input
                                        id="longitude"
                                        value={data.longitude}
                                        onChange={(e) => setData('longitude', e.target.value)}
                                        placeholder="112.6902"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="photo_url">URL Foto (opsional)</Label>
                                <Input
                                    id="photo_url"
                                    value={data.photo_url}
                                    onChange={(e) => setData('photo_url', e.target.value)}
                                    placeholder="https://..."
                                    className="mt-1"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-full bg-neutral-900 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
                            >
                                Simpan
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
