<?php

namespace App\Console\Commands;

use App\Models\Business;
use Illuminate\Console\Command;

class ImportBusinessesFromCsv extends Command
{
    protected $signature = 'businesses:import {path : Path ke file CSV}';

    protected $description = 'Import data bisnis dari file CSV ke tabel businesses';

    public function handle(): int
    {
        $path = $this->argument('path');

        if (! file_exists($path)) {
            $this->error("File tidak ditemukan: {$path}");

            return self::FAILURE;
        }

        $handle = fopen($path, 'r');
        $header = fgetcsv($handle);
        $header = array_map(fn ($h) => trim(strtolower($h)), $header);

        $required = ['name', 'category'];
        foreach ($required as $col) {
            if (! in_array($col, $header)) {
                $this->error("Kolom wajib '{$col}' tidak ditemukan di header CSV.");
                fclose($handle);

                return self::FAILURE;
            }
        }

        $imported = 0;
        $skipped = 0;

        while (($row = fgetcsv($handle)) !== false) {
            $data = array_combine($header, $row);

            if (empty($data['name'])) {
                $skipped++;

                continue;
            }

            Business::create([
                'name' => $data['name'],
                'category' => $data['category'] ?? 'jasa',
                'village' => $data['village'] ?? null,
                'description' => $data['description'] ?? null,
                'address' => $data['address'] ?? null,
                'phone' => $data['phone'] ?? null,
                'hours' => $data['hours'] ?? null,
                'is_verified' => filter_var($data['is_verified'] ?? false, FILTER_VALIDATE_BOOLEAN),
                'latitude' => is_numeric($data['latitude'] ?? null) ? $data['latitude'] : null,
                'longitude' => is_numeric($data['longitude'] ?? null) ? $data['longitude'] : null,
                'photo_url' => $data['photo_url'] ?? null,
            ]);

            $imported++;
        }

        fclose($handle);

        $this->info("Berhasil import {$imported} data.".($skipped > 0 ? " ({$skipped} baris dilewati karena nama kosong)" : ''));

        return self::SUCCESS;
    }
}
