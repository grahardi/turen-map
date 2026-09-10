<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['key' => 'kuliner', 'label' => 'Kuliner & Cafe'],
            ['key' => 'wisata', 'label' => 'Wisata & Ibadah'],
            ['key' => 'industri', 'label' => 'Industri & BUMN'],
            ['key' => 'kesehatan', 'label' => 'Kesehatan'],
            ['key' => 'pasar', 'label' => 'Belanja & Pasar'],
            ['key' => 'jasa', 'label' => 'Jasa & Servis'],
            ['key' => 'lainnya', 'label' => 'Lainnya'],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(['key' => $category['key']], $category);
        }
    }
}
