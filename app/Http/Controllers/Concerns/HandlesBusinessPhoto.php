<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait HandlesBusinessPhoto
{
    /**
     * Simpan file foto yang diupload (kalau ada) dan kembalikan URL publiknya.
     * Return null kalau tidak ada file baru diupload (biar tidak menimpa foto lama saat update).
     */
    protected function storeUploadedPhoto(Request $request): ?string
    {
        if (! $request->hasFile('photo')) {
            return null;
        }

        $file = $request->file('photo');
        $filename = Str::random(20).'.'.$file->getClientOriginalExtension();
        $path = $file->storeAs('businesses', $filename, 'public');

        return Storage::url($path);
    }
}
