<?php

use App\Http\Controllers\Admin\BusinessController as AdminBusinessController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', [BusinessController::class, 'index'])->name('home');

Route::get('/bisnis', [BusinessController::class, 'index'])->name('businesses.index');
Route::get('/bisnis/tambah', [BusinessController::class, 'create'])->name('businesses.create');
Route::post('/bisnis', [BusinessController::class, 'store'])->name('businesses.store');
Route::get('/bisnis/{business}', [BusinessController::class, 'show'])->name('businesses.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/bisnis', [AdminBusinessController::class, 'index'])->name('businesses.index');
        Route::get('/bisnis/tambah', [AdminBusinessController::class, 'create'])->name('businesses.create');
        Route::post('/bisnis', [AdminBusinessController::class, 'store'])->name('businesses.store');
        Route::get('/bisnis/{business}/edit', [AdminBusinessController::class, 'edit'])->name('businesses.edit');
        Route::put('/bisnis/{business}', [AdminBusinessController::class, 'update'])->name('businesses.update');
        Route::delete('/bisnis/{business}', [AdminBusinessController::class, 'destroy'])->name('businesses.destroy');
    });
});

require __DIR__.'/settings.php';
