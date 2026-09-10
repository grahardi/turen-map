<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::orderBy('label')
            ->get()
            ->map(fn (Category $c) => [
                'id' => $c->id,
                'key' => $c->key,
                'label' => $c->label,
                'business_count' => Business::where('category', $c->key)->count(),
                'is_fallback' => $c->key === Category::FALLBACK_KEY,
            ]);

        return Inertia::render('admin/categories/index', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'label' => 'required|string|max:100',
        ]);

        $key = Str::slug($validated['label'], '-') ?: Str::random(6);
        $base = $key;
        $i = 1;
        while (Category::where('key', $key)->exists()) {
            $key = "{$base}-{$i}";
            $i++;
        }

        Category::create(['key' => $key, 'label' => $validated['label']]);

        return to_route('admin.categories.index')->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function update(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'label' => 'required|string|max:100',
        ]);

        $category->update(['label' => $validated['label']]);

        return to_route('admin.categories.index')->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(Category $category): RedirectResponse
    {
        if ($category->key === Category::FALLBACK_KEY) {
            return back()->withErrors(['category' => 'Kategori "Lainnya" tidak bisa dihapus karena jadi kategori cadangan.']);
        }

        // Pindahkan semua bisnis yang pakai kategori ini ke "Lainnya" dulu.
        Business::where('category', $category->key)->update(['category' => Category::FALLBACK_KEY]);

        $category->delete();

        return to_route('admin.categories.index')->with('success', 'Kategori dihapus, data terkait dipindah ke "Lainnya".');
    }
}
