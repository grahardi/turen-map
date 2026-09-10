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
                'name' => '(Contoh) Bakso Sumber Rejeki',
                'category' => 'kuliner',
                'village' => 'Turen Kota',
                'address' => 'Jl. Contoh No. 1, Turen',
                'description' => 'Data contoh — silakan hapus dan ganti dengan data asli.',
                'phone' => null,
                'hours' => '08.00 - 20.00 WIB',
                'is_verified' => true,
            ],
            [
                'name' => '(Contoh) Bengkel Motor Jaya',
                'category' => 'jasa',
                'village' => 'Sananrejo',
                'address' => 'Jl. Contoh No. 2, Sananrejo',
                'description' => 'Data contoh — silakan hapus dan ganti dengan data asli.',
                'phone' => null,
                'hours' => '07.00 - 17.00 WIB',
                'is_verified' => false,
            ],
        ];

        foreach ($examples as $item) {
            Business::create($item);
        }
    }
}
