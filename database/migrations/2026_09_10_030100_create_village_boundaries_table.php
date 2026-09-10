<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('village_boundaries', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // nama desa/kelurahan
            $table->string('osm_id')->nullable()->unique(); // relation/way id dari OSM, buat cek duplikat saat import
            $table->timestamps();
        });

        DB::statement('ALTER TABLE village_boundaries ADD COLUMN boundary geometry(MultiPolygon, 4326) NOT NULL');
        DB::statement('CREATE INDEX village_boundaries_boundary_idx ON village_boundaries USING GIST (boundary)');
    }

    public function down(): void
    {
        Schema::dropIfExists('village_boundaries');
    }
};
