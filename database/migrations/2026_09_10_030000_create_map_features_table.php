<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('CREATE EXTENSION IF NOT EXISTS postgis');

        Schema::create('map_features', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category')->index(); // sekolah, masjid, pasar, kantor, dll
            $table->string('village')->nullable(); // nama desa/kelurahan
            $table->text('description')->nullable();
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->timestamps();
        });

        // Kolom geometry point (lokasi marker), SRID 4326 = WGS84 (lat/lng standar GPS)
        DB::statement('ALTER TABLE map_features ADD COLUMN location geometry(Point, 4326) NOT NULL');
        DB::statement('CREATE INDEX map_features_location_idx ON map_features USING GIST (location)');
    }

    public function down(): void
    {
        Schema::dropIfExists('map_features');
    }
};
