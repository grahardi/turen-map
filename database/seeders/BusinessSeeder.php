<?php

namespace Database\Seeders;

use App\Models\Business;
use Illuminate\Database\Seeder;

class BusinessSeeder extends Seeder
{
    /**
     * Contoh data placeholder untuk tes tampilan direktori.
     * Ganti/tambah data asli lewat halaman "Tambah" (/bisnis/tambah) atau seeder ini.
     */
    public function run(): void
    {
        $examples = [
            [
                'name' => '(Contoh) Toko Kelontong Sumber Rejeki',
                'category' => 'umkm',
                'village' => 'Turen',
                'address' => 'Jl. Contoh No. 1, Turen',
                'description' => 'Data contoh — silakan hapus dan ganti dengan data asli.',
                'phone' => null,
            ],
            [
                'name' => '(Contoh) Bengkel Motor Jaya',
                'category' => 'toko',
                'village' => 'Talok',
                'address' => 'Jl. Contoh No. 2, Talok',
                'description' => 'Data contoh — silakan hapus dan ganti dengan data asli.',
                'phone' => null,
            ],
        ];

        foreach ($examples as $item) {
            Business::create($item);
        }
    }
}
