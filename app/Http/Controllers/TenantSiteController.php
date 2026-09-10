<?php

namespace App\Http\Controllers;

use App\Models\Business;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response as BaseResponse;

class TenantSiteController extends Controller
{
    public function show(string $subdomain): BaseResponse|RedirectResponse
    {
        $business = Business::where('slug', $subdomain)->first();

        if (! $business) {
            abort(404);
        }

        // Kalau klien ini sudah punya microsite HTML sendiri, tampilkan itu.
        if ($business->microsite_path && Storage::disk('local')->exists($business->microsite_path)) {
            $html = Storage::disk('local')->get($business->microsite_path);

            return new Response($html, 200, ['Content-Type' => 'text/html; charset=UTF-8']);
        }

        // Kalau belum ada microsite, redirect ke halaman detail di direktori utama.
        return redirect()->to('https://'.config('app.tenant_domain').'/bisnis/'.$business->slug);
    }
}
