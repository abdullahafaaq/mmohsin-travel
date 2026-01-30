<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSettings;
use App\Http\Requests\StoreSiteSettingsRequest;
use App\Http\Requests\UpdateSiteSettingsRequest;

class SiteSettingsController extends Controller
{
    public function index()
    {
        return response()->json(SiteSettings::first());
    }

    public function store(StoreSiteSettingsRequest $request)
    {
        $settings = SiteSettings::first() ?? new SiteSettings();
        $settings->fill($request->validated());
        $settings->save();
        return response()->json($settings, 201);
    }

    public function update(UpdateSiteSettingsRequest $request)
    {
        $settings = SiteSettings::first();
        if (!$settings) {
            return response()->json(['message' => 'Settings not found'], 404);
        }
        $settings->update($request->validated());
        return response()->json($settings);
    }
}
