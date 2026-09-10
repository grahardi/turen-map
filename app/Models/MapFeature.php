<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MapFeature extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'village',
        'description',
        'address',
        'phone',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope(function ($query) {
            $query->addSelect('map_features.*')
                ->addSelect(DB::raw('ST_X(location) as longitude'))
                ->addSelect(DB::raw('ST_Y(location) as latitude'));
        });
    }

    /**
     * Simpan lokasi dari pasangan lat/lng biasa.
     */
    public function setLocationFromLatLng(float $lat, float $lng): void
    {
        $this->attributes['location'] = DB::raw("ST_SetSRID(ST_MakePoint($lng, $lat), 4326)");
    }

    /**
     * Bentuk array siap pakai untuk props Inertia / GeoJSON feature di frontend.
     */
    public function toMapArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'category' => $this->category,
            'village' => $this->village,
            'description' => $this->description,
            'address' => $this->address,
            'phone' => $this->phone,
            'latitude' => (float) $this->latitude,
            'longitude' => (float) $this->longitude,
        ];
    }
}
