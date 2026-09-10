<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Business extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'category',
        'village',
        'description',
        'address',
        'phone',
        'hours',
        'is_verified',
        'latitude',
        'longitude',
        'photo_url',
        'website_url',
        'facebook_url',
        'instagram_url',
        'tiktok_url',
        'shopee_url',
        'youtube_url',
        'microsite_path',
        'subdomain_enabled',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'float',
            'longitude' => 'float',
            'is_verified' => 'boolean',
            'subdomain_enabled' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Business $business) {
            if (empty($business->slug)) {
                $base = Str::slug($business->name);
                $slug = $base;
                $i = 1;
                while (static::where('slug', $slug)->exists()) {
                    $slug = "{$base}-{$i}";
                    $i++;
                }
                $business->slug = $slug;
            }

            if (empty($business->category) || ! Category::where('key', $business->category)->exists()) {
                $business->category = Category::FALLBACK_KEY;
            }
        });

        static::saving(function (Business $business) {
            if ($business->isDirty('category') && (empty($business->category) || ! Category::where('key', $business->category)->exists())) {
                $business->category = Category::FALLBACK_KEY;
            }
        });
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
