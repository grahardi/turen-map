<?php

namespace App\Http\Controllers;

use App\Models\Business;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response as BaseResponse;

class MicrositeController extends Controller
{
    public function show(Business $business): BaseResponse
    {
        if (! $business->microsite_path || ! Storage::disk('local')->exists($business->microsite_path)) {
            abort(404);
        }

        $html = Storage::disk('local')->get($business->microsite_path);

        return new Response($html, 200, ['Content-Type' => 'text/html; charset=UTF-8']);
    }
}
