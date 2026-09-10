<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['key', 'label'];

    public const FALLBACK_KEY = 'lainnya';
}
