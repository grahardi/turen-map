<?php

namespace App\Http\Controllers;

use App\Models\MapFeature;
use App\Models\VillageBoundary;
use Inertia\Inertia;
use Inertia\Response;

class MapController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('map', [
            'features' => MapFeature::all()->map(fn (MapFeature $f) => $f->toMapArray())->values(),
            'boundaries' => VillageBoundary::all()->map(fn (VillageBoundary $b) => $b->toMapArray())->values(),
        ]);
    }
}
