<?php

namespace App\Console\Commands;

use App\Models\Business;
use Illuminate\Console\Command;

class ImportBusinessesFromOsm extends Command
{
    protected $signature = 'businesses:import-osm {path : Path ke file GeoJSON hasil ogr2ogr}';

    protected $description = 'Import titik POI (amenity/shop) dari GeoJSON OpenStreetMap ke tabel businesses';

    /**
     * Pemetaan tag OSM -> kategori direktori.
     * Data OSM: © OpenStreetMap contributors, lisensi ODbL.
     */
    protected array $amenityMap = [
        'restaurant' => 'kuliner', 'cafe' => 'kuliner', 'fast_food' => 'kuliner',
        'food_court' => 'kuliner', 'bar' => 'kuliner', 'ice_cream' => 'kuliner',
        'place_of_worship' => 'wisata',
        'hospital' => 'kesehatan', 'clinic' => 'kesehatan', 'pharmacy' => 'kesehatan', 'doctors' => 'kesehatan',
        'bank' => 'jasa', 'atm' => 'jasa', 'fuel' => 'jasa', 'car_repair' => 'jasa',
        'townhall' => 'jasa', 'post_office' => 'jasa', 'police' => 'jasa',
        'marketplace' => 'pasar',
        'school' => 'jasa', 'university' => 'jasa', 'college' => 'jasa',
    ];

    protected array $shopMap = [
        'supermarket' => 'pasar', 'convenience' => 'pasar', 'mall' => 'pasar', 'department_store' => 'pasar',
        'car_repair' => 'jasa', 'hairdresser' => 'jasa', 'laundry' => 'jasa',
    ];

    public function handle(): int
    {
        $path = $this->argument('path');

        if (! file_exists($path)) {
            $this->error("File tidak ditemukan: {$path}");

            return self::FAILURE;
        }

        $geojson = json_decode(file_get_contents($path), true);

        if (! isset($geojson['features'])) {
            $this->error('File bukan GeoJSON FeatureCollection yang valid.');

            return self::FAILURE;
        }

        $imported = 0;
        $skippedNoName = 0;
        $skippedDuplicate = 0;

        foreach ($geojson['features'] as $feature) {
            $props = $feature['properties'] ?? [];
            $name = trim($props['name'] ?? '');

            if ($name === '') {
                $skippedNoName++;

                continue;
            }

            // Sudah pernah diimport? cek by nama (kasar, tapi cukup untuk hindari duplikat re-run)
            if (Business::where('name', $name)->exists()) {
                $skippedDuplicate++;

                continue;
            }

            $category = $this->resolveCategory($props);
            $coords = $feature['geometry']['coordinates'] ?? null;

            Business::create([
                'name' => $name,
                'category' => $category,
                'description' => 'Data dari OpenStreetMap contributors (ODbL).',
                'address' => $props['addr:street'] ?? null,
                'phone' => $props['phone'] ?? $props['contact:phone'] ?? null,
                'is_verified' => false,
                'longitude' => $coords[0] ?? null,
                'latitude' => $coords[1] ?? null,
            ]);

            $imported++;
        }

        $this->info("Berhasil import {$imported} data dari OSM.");
        $this->line("Dilewati: {$skippedNoName} tanpa nama, {$skippedDuplicate} duplikat.");
        $this->warn('Ingat: cantumkan atribusi "© OpenStreetMap contributors" di halaman jika data ini ditampilkan publik.');

        return self::SUCCESS;
    }

    protected function resolveCategory(array $props): string
    {
        $amenity = $props['amenity'] ?? null;
        $shop = $props['shop'] ?? null;

        if ($amenity && isset($this->amenityMap[$amenity])) {
            return $this->amenityMap[$amenity];
        }

        if ($shop && isset($this->shopMap[$shop])) {
            return $this->shopMap[$shop];
        }

        if ($shop) {
            return 'pasar';
        }

        return 'jasa';
    }
}
