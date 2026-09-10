<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MapFeatureSeeder extends Seeder
{
    public function run(): void
    {
        $dummy = [
            ['name' => 'Pasar Turen', 'category' => 'pasar', 'lat' => -8.1642, 'lng' => 112.6706],
            ['name' => 'SMP Negeri 1 Turen', 'category' => 'sekolah', 'lat' => -8.1615, 'lng' => 112.6730],
            ['name' => 'Kantor Kecamatan Turen', 'category' => 'kantor', 'lat' => -8.1660, 'lng' => 112.6690],
        ];

        foreach ($dummy as $item) {
            DB::table('map_features')->insert([
                'name' => $item['name'],
                'category' => $item['category'],
                'location' => DB::raw("ST_SetSRID(ST_MakePoint({$item['lng']}, {$item['lat']}), 4326)"),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
