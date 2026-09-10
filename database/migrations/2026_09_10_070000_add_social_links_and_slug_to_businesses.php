<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('businesses', function (Blueprint $table) {
            $table->string('slug')->nullable()->unique()->after('name');
            $table->string('website_url')->nullable()->after('photo_url');
            $table->string('facebook_url')->nullable()->after('website_url');
            $table->string('instagram_url')->nullable()->after('facebook_url');
            $table->string('tiktok_url')->nullable()->after('instagram_url');
            $table->string('shopee_url')->nullable()->after('tiktok_url');
            $table->string('youtube_url')->nullable()->after('shopee_url');
        });
    }

    public function down(): void
    {
        Schema::table('businesses', function (Blueprint $table) {
            $table->dropColumn([
                'slug', 'website_url', 'facebook_url', 'instagram_url',
                'tiktok_url', 'shopee_url', 'youtube_url',
            ]);
        });
    }
};
