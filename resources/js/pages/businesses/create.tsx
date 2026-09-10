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
            <div className="min-h-screen bg-white font-['Work_Sans']">
                <header className="bg-[#1F4D3A] px-6 py-8">
                    <div className="mx-auto max-w-lg">
                        <Link
                            href="/bisnis"
                            className="flex items-center gap-1.5 text-sm text-[#9FB8AA] hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke direktori
                        </Link>
                        <h1 className="mt-3 font-['Fraunces'] text-3xl font-semibold text-white">Tambah Data</h1>
                        <p className="mt-1 text-sm text-[#CFE0D6]">Lengkapi info usaha atau lokasi yang mau ditambahkan.</p>
                    </div>
                </header>

                <div className="mx-auto max-w-lg px-6 py-8">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <Label htmlFor="name" className="text-[#2A2118]">
                                Nama usaha / lokasi
                            </Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1.5" />
                            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="category" className="text-[#2A2118]">
                                Kategori
                            </Label>
                            <select
                                id="category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="mt-1.5 w-full rounded-md border border-[#E5DFD1] px-3 py-2 text-sm text-[#2A2118] capitalize"
                            >
                                {CATEGORY_OPTIONS.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="village" className="text-[#2A2118]">
                                Desa / Kelurahan
                            </Label>
                            <Input id="village" value={data.village} onChange={(e) => setData('village', e.target.value)} className="mt-1.5" />
                        </div>

                        <div>
                            <Label htmlFor="address" className="text-[#2A2118]">
                                Alamat
                            </Label>
                            <Input id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} className="mt-1.5" />
                        </div>

                        <div>
                            <Label htmlFor="description" className="text-[#2A2118]">
                                Deskripsi
                            </Label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                                className="mt-1.5 w-full rounded-md border border-[#E5DFD1] px-3 py-2 text-sm text-[#2A2118]"
                            />
                        </div>

                        <div>
                            <Label htmlFor="phone" className="text-[#2A2118]">
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
                                <Label htmlFor="latitude" className="text-[#2A2118]">
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
                                <Label htmlFor="longitude" className="text-[#2A2118]">
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
                            <Label htmlFor="photo_url" className="text-[#2A2118]">
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

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-md bg-[#E8A33D] py-3 text-sm font-semibold text-[#2A2118] hover:bg-[#dc9530] disabled:opacity-50"
                        >
                            Simpan Data
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
