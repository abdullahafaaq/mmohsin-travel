<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutContent;
use App\Http\Requests\StoreAboutContentRequest;
use App\Http\Requests\UpdateAboutContentRequest;

class AboutContentController extends Controller
{
    public function index()
    {
        return response()->json(AboutContent::first());
    }

    public function store(StoreAboutContentRequest $request)
    {
        $content = AboutContent::first() ?? new AboutContent();
        $content->fill($request->validated());
        $content->save();
        return response()->json($content, 201);
    }

    public function update(UpdateAboutContentRequest $request)
    {
        $content = AboutContent::first();
        if (!$content) {
            return response()->json(['message' => 'Content not found'], 404);
        }
        $content->update($request->validated());
        return response()->json($content);
    }
}
