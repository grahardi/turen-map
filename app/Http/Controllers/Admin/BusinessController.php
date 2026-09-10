<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Business;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/businesses/index', [
            'businesses' => Business::orderBy('name')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/businesses/create');
    }

    public function store(Request $request): RedirectResponse
    {
        Business::create($this->validated($request));

        return to_route('admin.businesses.index')->with('success', 'Data berhasil ditambahkan.');
    }

    public function edit(Business $business): Response
    {
        return Inertia::render('admin/businesses/edit', [
            'business' => $business,
        ]);
    }

    public function update(Request $request, Business $business): RedirectResponse
    {
        $business->update($this->validated($request));

        return to_route('admin.businesses.index')->with('success', 'Data berhasil diperbarui.');
    }

    public function destroy(Business $business): RedirectResponse
    {
        $business->delete();

        return to_route('admin.businesses.index')->with('success', 'Data berhasil dihapus.');
    }

    public function uploadMicrosite(Request $request, Business $business): RedirectResponse
    {
        $request->validate([
            'file' => 'required|file|max:5120', // max 5MB
        ]);

        $file = $request->file('file');
        $ext = strtolower($file->getClientOriginalExtension());

        if (! in_array($ext, ['html', 'htm'])) {
            return back()->withErrors(['file' => 'File harus berformat .html atau .htm']);
        }

        // Hapus file lama kalau ada
        if ($business->microsite_path) {
            \Illuminate\Support\Facades\Storage::disk('local')->delete($business->microsite_path);
        }

        $path = "microsites/{$business->slug}.html";
        \Illuminate\Support\Facades\Storage::disk('local')->put($path, file_get_contents($file->getRealPath()));

        $business->update(['microsite_path' => $path]);

        return to_route('admin.businesses.index')->with('success', 'Situs klien berhasil diunggah.');
    }

    public function deleteMicrosite(Business $business): RedirectResponse
    {
        if ($business->microsite_path) {
            \Illuminate\Support\Facades\Storage::disk('local')->delete($business->microsite_path);
            $business->update(['microsite_path' => null]);
        }

        return to_route('admin.businesses.index')->with('success', 'Situs klien dihapus.');
    }

    protected function validated(Request $request): array
    {
        return $request->validate([
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
            'photo_url' => 'nullable|url|max:500',
            'website_url' => 'nullable|url|max:500',
            'facebook_url' => 'nullable|url|max:500',
            'instagram_url' => 'nullable|url|max:500',
            'tiktok_url' => 'nullable|url|max:500',
            'shopee_url' => 'nullable|url|max:500',
            'youtube_url' => 'nullable|url|max:500',
        ]);
    }
}
