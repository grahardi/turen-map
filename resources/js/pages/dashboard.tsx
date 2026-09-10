import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, Clock3, Eye, Store } from 'lucide-react';

interface CategoryCount {
    category: string;
    total: number;
}

interface BusinessBrief {
    id: number;
    slug: string;
    name: string;
    category: string;
    views_count?: number;
    created_at?: string;
}

interface PageProps {
    stats: {
        total: number;
        verified: number;
        unverified: number;
        totalViews: number;
    };
    byCategory: CategoryCount[];
    topViewed: BusinessBrief[];
    recent: BusinessBrief[];
}

export default function Dashboard({ stats, byCategory, topViewed, recent }: PageProps) {
    const maxCategoryTotal = Math.max(1, ...byCategory.map((c) => c.total));

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                {/* Stat cards */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="rounded-xl border p-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Store className="h-4 w-4" />
                            <span className="text-xs font-medium">Total Usaha</span>
                        </div>
                        <p className="mt-2 text-2xl font-bold">{stats.total}</p>
                    </div>
                    <div className="rounded-xl border p-4">
                        <div className="flex items-center gap-2 text-amber-600">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-xs font-medium">Terverifikasi</span>
                        </div>
                        <p className="mt-2 text-2xl font-bold">{stats.verified}</p>
                    </div>
                    <div className="rounded-xl border p-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock3 className="h-4 w-4" />
                            <span className="text-xs font-medium">Belum Diverifikasi</span>
                        </div>
                        <p className="mt-2 text-2xl font-bold">{stats.unverified}</p>
                    </div>
                    <div className="rounded-xl border p-4">
                        <div className="flex items-center gap-2 text-emerald-600">
                            <Eye className="h-4 w-4" />
                            <span className="text-xs font-medium">Total Dilihat</span>
                        </div>
                        <p className="mt-2 text-2xl font-bold">{stats.totalViews}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {/* Per kategori */}
                    <div className="rounded-xl border p-4">
                        <h2 className="mb-4 text-sm font-semibold">Sebaran per Kategori</h2>
                        <div className="space-y-3">
                            {byCategory.length === 0 && (
                                <p className="text-sm text-muted-foreground">Belum ada data.</p>
                            )}
                            {byCategory.map((c) => (
                                <div key={c.category}>
                                    <div className="mb-1 flex items-center justify-between text-xs">
                                        <span className="font-medium capitalize">{c.category}</span>
                                        <span className="text-muted-foreground">{c.total}</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-muted">
                                        <div
                                            className="h-2 rounded-full bg-emerald-600"
                                            style={{ width: `${(c.total / maxCategoryTotal) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top viewed */}
                    <div className="rounded-xl border p-4">
                        <h2 className="mb-4 text-sm font-semibold">Top 5 Paling Banyak Dilihat</h2>
                        <div className="space-y-2">
                            {topViewed.length === 0 && (
                                <p className="text-sm text-muted-foreground">Belum ada data.</p>
                            )}
                            {topViewed.map((b, i) => (
                                <Link
                                    key={b.id}
                                    href={`/bisnis/${b.slug}`}
                                    className="flex items-center justify-between rounded-lg px-2 py-2 text-sm hover:bg-muted"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-semibold text-muted-foreground">
                                            #{i + 1}
                                        </span>
                                        <div>
                                            <p className="font-medium">{b.name}</p>
                                            <p className="text-xs text-muted-foreground capitalize">{b.category}</p>
                                        </div>
                                    </div>
                                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                                        <Eye className="h-3.5 w-3.5" />
                                        {b.views_count ?? 0}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recently added */}
                <div className="rounded-xl border p-4">
                    <h2 className="mb-4 text-sm font-semibold">Baru Ditambahkan</h2>
                    <div className="space-y-2">
                        {recent.length === 0 && <p className="text-sm text-muted-foreground">Belum ada data.</p>}
                        {recent.map((b) => (
                            <Link
                                key={b.id}
                                href={`/bisnis/${b.slug}`}
                                className="flex items-center justify-between rounded-lg px-2 py-2 text-sm hover:bg-muted"
                            >
                                <div>
                                    <p className="font-medium">{b.name}</p>
                                    <p className="text-xs text-muted-foreground capitalize">{b.category}</p>
                                </div>
                                {b.created_at && (
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(b.created_at).toLocaleDateString('id-ID')}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
