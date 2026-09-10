<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\HandlesBusinessPhoto;
use App\Models\Business;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessController extends Controller
{
    use HandlesBusinessPhoto;

    public function index(): Response
    {
        return Inertia::render('businesses/index', [
            'businesses' => Business::orderBy('name')->get(),
            'categories' => Category::orderBy('label')->get(['key', 'label']),
        ]);
    }

    public function show(Business $business): Response
    {
        $business->increment('views_count');

        return Inertia::render('businesses/show', [
            'business' => $business,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('businesses/create', [
            'categories' => Category::orderBy('label')->get(['key', 'label']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'village' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:30',
            'hours' => 'nullable|string|max:100',
            'is_verified' => 'boolean',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'photo' => 'nullable|image|max:4096',
            'website_url' => 'nullable|url|max:500',
            'facebook_url' => 'nullable|url|max:500',
            'instagram_url' => 'nullable|url|max:500',
            'tiktok_url' => 'nullable|url|max:500',
            'shopee_url' => 'nullable|url|max:500',
            'youtube_url' => 'nullable|url|max:500',
        ]);

        unset($validated['photo']);

        if ($photoUrl = $this->storeUploadedPhoto($request)) {
            $validated['photo_url'] = $photoUrl;
        }

        Business::create($validated);

        return to_route('businesses.index');
    }
}
