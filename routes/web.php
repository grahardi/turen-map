<?php

use App\Http\Controllers\Admin\BusinessController as AdminBusinessController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MicrositeController;
use App\Http\Controllers\TenantSiteController;
use Illuminate\Support\Facades\Route;

// Subdomain per klien, misal baksosolo.turen.id — didaftar duluan supaya dicek lebih dulu.
Route::domain('{subdomain}.'.config('app.tenant_domain'))->group(function () {
    Route::get('/', [TenantSiteController::class, 'show'])->name('tenant.show');
});

Route::get('/', [BusinessController::class, 'index'])->name('home');

Route::get('/bisnis', [BusinessController::class, 'index'])->name('businesses.index');
Route::get('/bisnis/tambah', [BusinessController::class, 'create'])->name('businesses.create');
Route::post('/bisnis', [BusinessController::class, 'store'])->name('businesses.store');
Route::get('/@{business}', [BusinessController::class, 'show'])->name('businesses.show');

Route::get('/situs/{business}', [MicrositeController::class, 'show'])->name('microsite.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/bisnis', [AdminBusinessController::class, 'index'])->name('businesses.index');
        Route::get('/bisnis/tambah', [AdminBusinessController::class, 'create'])->name('businesses.create');
        Route::post('/bisnis', [AdminBusinessController::class, 'store'])->name('businesses.store');
        Route::get('/bisnis/{business}', fn (\App\Models\Business $business) => redirect()->route('admin.businesses.edit', $business));
        Route::get('/bisnis/{business}/edit', [AdminBusinessController::class, 'edit'])->name('businesses.edit');
        Route::put('/bisnis/{business}', [AdminBusinessController::class, 'update'])->name('businesses.update');
        Route::delete('/bisnis/{business}', [AdminBusinessController::class, 'destroy'])->name('businesses.destroy');
        Route::post('/bisnis/{business}/situs', [AdminBusinessController::class, 'uploadMicrosite'])->name('businesses.microsite.upload');
        Route::delete('/bisnis/{business}/situs', [AdminBusinessController::class, 'deleteMicrosite'])->name('businesses.microsite.delete');

        Route::get('/kategori', [CategoryController::class, 'index'])->name('categories.index');
        Route::post('/kategori', [CategoryController::class, 'store'])->name('categories.store');
        Route::put('/kategori/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('/kategori/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    });
});

require __DIR__.'/settings.php';
