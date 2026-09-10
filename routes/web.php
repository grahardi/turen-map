<?php

use App\Http\Controllers\BusinessController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/bisnis', [BusinessController::class, 'index'])->name('businesses.index');
Route::get('/bisnis/tambah', [BusinessController::class, 'create'])->name('businesses.create');
Route::post('/bisnis', [BusinessController::class, 'store'])->name('businesses.store');
Route::delete('/bisnis/{business}', [BusinessController::class, 'destroy'])->name('businesses.destroy');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
