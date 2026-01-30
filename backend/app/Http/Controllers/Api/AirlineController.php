<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Airline;
use App\Http\Requests\StoreAirlineRequest;
use App\Http\Requests\UpdateAirlineRequest;

class AirlineController extends Controller
{
    public function index()
    {
        return response()->json(Airline::all());
    }

    public function store(StoreAirlineRequest $request)
    {
        $airline = Airline::create($request->validated());
        return response()->json($airline, 201);
    }

    public function show(Airline $airline)
    {
        return response()->json($airline);
    }

    public function update(UpdateAirlineRequest $request, Airline $airline)
    {
        $airline->update($request->validated());
        return response()->json($airline);
    }

    public function destroy(Airline $airline)
    {
        $airline->delete();
        return response()->json(null, 204);
    }
}
