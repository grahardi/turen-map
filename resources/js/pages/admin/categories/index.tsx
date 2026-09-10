import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface CategoryRow {
    id: number;
    key: string;
    label: string;
    business_count: number;
    is_fallback: boolean;
}

export default function AdminCategoryIndex({ categories }: { categories: CategoryRow[] }) {
    const { props } = usePage<{ flash?: { success?: string }; errors?: { category?: string } }>();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editLabel, setEditLabel] = useState('');

    const addForm = useForm({ label: '' });

    function submitAdd(e: React.FormEvent) {
        e.preventDefault();
        addForm.post('/admin/kategori', { onSuccess: () => addForm.reset() });
    }

    function startEdit(cat: CategoryRow) {
        setEditingId(cat.id);
        setEditLabel(cat.label);
    }

    function saveEdit(id: number) {
        router.put(`/admin/kategori/${id}`, { label: editLabel }, { onSuccess: () => setEditingId(null) });
    }

    function handleDelete(cat: CategoryRow) {
        if (cat.is_fallback) return;
        if (confirm(`Hapus kategori "${cat.label}"? Bisnis yang pakai kategori ini otomatis dipindah ke "Lainnya".`)) {
            router.delete(`/admin/kategori/${cat.id}`);
        }
    }

    return (
        <>
            <Head title="Kelola Kategori" />
            <div className="flex flex-col gap-4 p-4">
                <div>
                    <h1 className="text-xl font-bold">Kelola Kategori</h1>
                    <p className="text-sm text-muted-foreground">
                        Kategori dipakai di filter direktori dan form tambah data. Bisnis tanpa kategori (atau
                        kategorinya dihapus) otomatis masuk ke "Lainnya".
                    </p>
                </div>

                {props.flash?.success && (
                    <div className="rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
                        {props.flash.success}
                    </div>
                )}
                {props.errors?.category && (
                    <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{props.errors.category}</div>
                )}

                <form onSubmit={submitAdd} className="flex items-end gap-2 rounded-xl border p-4">
                    <div className="flex-1">
                        <label className="text-xs font-medium text-muted-foreground">Tambah kategori baru</label>
                        <Input
                            value={addForm.data.label}
                            onChange={(e) => addForm.setData('label', e.target.value)}
                            placeholder="misal: Otomotif"
                            className="mt-1"
                        />
                        {addForm.errors.label && <p className="mt-1 text-xs text-red-600">{addForm.errors.label}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={addForm.processing}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah
                    </button>
                </form>

                <div className="overflow-hidden rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 text-left text-xs text-muted-foreground uppercase">
                            <tr>
                                <th className="px-4 py-3 font-medium">Label</th>
                                <th className="px-4 py-3 font-medium">Key</th>
                                <th className="px-4 py-3 font-medium">Jumlah Bisnis</th>
                                <th className="px-4 py-3 font-medium text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {categories.map((cat) => (
                                <tr key={cat.id}>
                                    <td className="px-4 py-3">
                                        {editingId === cat.id ? (
                                            <Input
                                                value={editLabel}
                                                onChange={(e) => setEditLabel(e.target.value)}
                                                className="h-8"
                                                autoFocus
                                            />
                                        ) : (
                                            <span className="font-medium">{cat.label}</span>
                                        )}
                                        {cat.is_fallback && (
                                            <span className="ml-2 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600">
                                                cadangan
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">{cat.key}</td>
                                    <td className="px-4 py-3">{cat.business_count}</td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            {editingId === cat.id ? (
                                                <>
                                                    <button
                                                        onClick={() => saveEdit(cat.id)}
                                                        className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                                                    >
                                                        Simpan
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                                                    >
                                                        Batal
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => startEdit(cat)}
                                                        className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                                                    >
                                                        Edit
                                                    </button>
                                                    {!cat.is_fallback && (
                                                        <button
                                                            onClick={() => handleDelete(cat)}
                                                            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
