<?php

namespace App\Http\Controllers;

use App\Models\Business;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $total = Business::count();
        $verified = Business::where('is_verified', true)->count();

        $byCategory = Business::selectRaw('category, count(*) as total')
            ->groupBy('category')
            ->orderByDesc('total')
            ->get();

        $topViewed = Business::orderByDesc('views_count')
            ->limit(5)
            ->get(['id', 'slug', 'name', 'category', 'views_count']);

        $recent = Business::orderByDesc('created_at')
            ->limit(5)
            ->get(['id', 'slug', 'name', 'category', 'created_at']);

        return Inertia::render('dashboard', [
            'stats' => [
                'total' => $total,
                'verified' => $verified,
                'unverified' => $total - $verified,
                'totalViews' => (int) Business::sum('views_count'),
            ],
            'byCategory' => $byCategory,
            'topViewed' => $topViewed,
            'recent' => $recent,
        ]);
    }
}
