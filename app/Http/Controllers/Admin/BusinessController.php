<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesBusinessPhoto;
use App\Http\Controllers\Controller;
use App\Models\Business;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BusinessController extends Controller
{
    use HandlesBusinessPhoto;

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
        $data = $this->validated($request);

        if ($photoUrl = $this->storeUploadedPhoto($request)) {
            $data['photo_url'] = $photoUrl;
        }

        if (empty($data['slug'])) {
            unset($data['slug']); // biarkan model auto-generate dari nama
        }

        Business::create($data);

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
        $data = $this->validated($request, $business->id);

        if ($photoUrl = $this->storeUploadedPhoto($request)) {
            $data['photo_url'] = $photoUrl;
        }

        if (empty($data['slug'])) {
            unset($data['slug']); // jangan timpa slug yang sudah ada dengan kosong
        }

        $business->update($data);

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

    protected function validated(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                'regex:/^[a-z0-9]+(-[a-z0-9]+)*$/',
                Rule::unique('businesses', 'slug')->ignore($ignoreId),
            ],
            'category' => 'required|string|max:100',
            'village' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:30',
            'hours' => 'nullable|string|max:100',
            'is_verified' => 'boolean',
            'subdomain_enabled' => 'boolean',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'photo' => 'nullable|image|max:4096',
            'website_url' => 'nullable|url|max:500',
            'facebook_url' => 'nullable|url|max:500',
            'instagram_url' => 'nullable|url|max:500',
            'tiktok_url' => 'nullable|url|max:500',
            'shopee_url' => 'nullable|url|max:500',
            'youtube_url' => 'nullable|url|max:500',
        ], [
            'slug.regex' => 'Handle hanya boleh huruf kecil, angka, dan tanda hubung (-), tanpa spasi.',
            'slug.unique' => 'Handle ini sudah dipakai bisnis lain, coba yang lain.',
        ]);
    }
}
