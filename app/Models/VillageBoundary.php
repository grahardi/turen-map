<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class VillageBoundary extends Model
{
    protected $fillable = ['name', 'osm_id'];

    protected static function booted(): void
    {
        static::addGlobalScope(function ($query) {
            $query->addSelect('village_boundaries.*')
                ->addSelect(DB::raw('ST_AsGeoJSON(boundary) as boundary_geojson'));
        });
    }

    public function toMapArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'geometry' => json_decode($this->boundary_geojson),
        ];
    }
}
