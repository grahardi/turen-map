import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CATEGORY_OPTIONS = ['kuliner', 'wisata', 'industri', 'kesehatan', 'pasar', 'jasa'];

export default function BusinessCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: 'kuliner',
        village: '',
        description: '',
        address: '',
        phone: '',
        hours: '',
        is_verified: false as boolean,
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
            <div className="min-h-screen bg-white font-['Inter']">
                <header className="bg-slate-900 px-6 py-8">
                    <div className="mx-auto max-w-lg">
                        <Link
                            href="/bisnis"
                            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke direktori
                        </Link>
                        <h1 className="mt-3 font-['Inter'] text-3xl font-semibold text-white">Tambah Data</h1>
                        <p className="mt-1 text-sm text-slate-300">Lengkapi info usaha atau lokasi yang mau ditambahkan.</p>
                    </div>
                </header>

                <div className="mx-auto max-w-lg px-6 py-8">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <Label htmlFor="name" className="text-slate-800">
                                Nama usaha / lokasi
                            </Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1.5" />
                            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="category" className="text-slate-800">
                                Kategori
                            </Label>
                            <select
                                id="category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-800 capitalize"
                            >
                                {CATEGORY_OPTIONS.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="village" className="text-slate-800">
                                Desa / Kelurahan
                            </Label>
                            <Input id="village" value={data.village} onChange={(e) => setData('village', e.target.value)} className="mt-1.5" />
                        </div>

                        <div>
                            <Label htmlFor="address" className="text-slate-800">
                                Alamat
                            </Label>
                            <Input id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} className="mt-1.5" />
                        </div>

                        <div>
                            <Label htmlFor="description" className="text-slate-800">
                                Deskripsi
                            </Label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                                className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-800"
                            />
                        </div>

                        <div>
                            <Label htmlFor="phone" className="text-slate-800">
                                No. WhatsApp (opsional)
                            </Label>
                            <Input
                                id="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="08123456789"
                                className="mt-1.5"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="latitude" className="text-slate-800">
                                    Latitude (opsional)
                                </Label>
                                <Input
                                    id="latitude"
                                    value={data.latitude}
                                    onChange={(e) => setData('latitude', e.target.value)}
                                    placeholder="-8.1843"
                                    className="mt-1.5"
                                />
                            </div>
                            <div>
                                <Label htmlFor="longitude" className="text-slate-800">
                                    Longitude (opsional)
                                </Label>
                                <Input
                                    id="longitude"
                                    value={data.longitude}
                                    onChange={(e) => setData('longitude', e.target.value)}
                                    placeholder="112.6902"
                                    className="mt-1.5"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="photo_url" className="text-slate-800">
                                URL Foto (opsional)
                            </Label>
                            <Input
                                id="photo_url"
                                value={data.photo_url}
                                onChange={(e) => setData('photo_url', e.target.value)}
                                placeholder="https://..."
                                className="mt-1.5"
                            />
                        </div>

                        <div>
                            <Label htmlFor="hours" className="text-slate-800">
                                Jam Operasional (opsional)
                            </Label>
                            <Input
                                id="hours"
                                value={data.hours}
                                onChange={(e) => setData('hours', e.target.value)}
                                placeholder="08.00 - 20.00 WIB"
                                className="mt-1.5"
                            />
                        </div>

                        <label className="flex items-center gap-2 text-sm text-slate-800">
                            <input
                                type="checkbox"
                                checked={data.is_verified}
                                onChange={(e) => setData('is_verified', e.target.checked)}
                                className="rounded border-slate-200"
                            />
                            Tandai sebagai terverifikasi
                        </label>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-md bg-emerald-600 py-3 text-sm font-semibold text-slate-800 hover:bg-emerald-700 disabled:opacity-50"
                        >
                            Simpan Data
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
