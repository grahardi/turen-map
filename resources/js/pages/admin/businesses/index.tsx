import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle2, PlusCircle, Trash2 } from 'lucide-react';

interface Business {
    id: number;
    slug: string;
    name: string;
    category: string;
    village: string | null;
    is_verified: boolean;
}

interface PageProps {
    businesses: Business[];
}

export default function AdminBusinessIndex({ businesses }: PageProps) {
    const { props } = usePage<{ flash?: { success?: string } }>();

    function handleDelete(slug: string, name: string) {
        if (confirm(`Hapus "${name}"? Tindakan ini tidak bisa dibatalkan.`)) {
            router.delete(`/admin/bisnis/${slug}`);
        }
    }

    return (
        <>
            <Head title="Kelola Direktori Bisnis" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">Kelola Direktori Bisnis</h1>
                        <p className="text-sm text-muted-foreground">{businesses.length} data terdaftar</p>
                    </div>
                    <Link
                        href="/admin/bisnis/tambah"
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                        <PlusCircle className="h-4 w-4" />
                        Tambah Data
                    </Link>
                </div>

                {props.flash?.success && (
                    <div className="rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
                        {props.flash.success}
                    </div>
                )}

                <div className="overflow-hidden rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 text-left text-xs text-muted-foreground uppercase">
                            <tr>
                                <th className="px-4 py-3 font-medium">Nama</th>
                                <th className="px-4 py-3 font-medium">Kategori</th>
                                <th className="px-4 py-3 font-medium">Desa</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {businesses.map((b) => (
                                <tr key={b.id}>
                                    <td className="px-4 py-3 font-medium">{b.name}</td>
                                    <td className="px-4 py-3 capitalize">{b.category}</td>
                                    <td className="px-4 py-3">{b.village ?? '—'}</td>
                                    <td className="px-4 py-3">
                                        {b.is_verified ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                                                <CheckCircle2 className="h-3.5 w-3.5" /> Terverifikasi
                                            </span>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">Belum</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/bisnis/${b.slug}/edit`}
                                                className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(b.slug, b.name)}
                                                className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {businesses.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                        Belum ada data.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
