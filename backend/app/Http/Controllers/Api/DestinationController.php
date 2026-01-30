<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Http\Requests\StoreDestinationRequest;
use App\Http\Requests\UpdateDestinationRequest;

class DestinationController extends Controller
{
    public function index()
    {
        return response()->json(Destination::all());
    }

    public function store(StoreDestinationRequest $request)
    {
        $destination = Destination::create($request->validated());
        return response()->json($destination, 201);
    }

    public function show(Destination $destination)
    {
        return response()->json($destination);
    }

    public function update(UpdateDestinationRequest $request, Destination $destination)
    {
        $destination->update($request->validated());
        return response()->json($destination);
    }

    public function destroy(Destination $destination)
    {
        $destination->delete();
        return response()->json(null, 204);
    }
}
