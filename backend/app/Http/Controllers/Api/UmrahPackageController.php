<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UmrahPackage;
use App\Http\Requests\StoreUmrahPackageRequest;
use App\Http\Requests\UpdateUmrahPackageRequest;

class UmrahPackageController extends Controller
{
    public function index()
    {
        return response()->json(UmrahPackage::all());
    }

    public function store(StoreUmrahPackageRequest $request)
    {
        $data = $request->validated();
        
        // Handle both camelCase (from frontend) and snake_case (for database)
        if (isset($data['hotelRating'])) {
            $data['hotel_rating'] = $data['hotelRating'];
            unset($data['hotelRating']);
        }
        
        $package = UmrahPackage::create($data);
        return response()->json($package, 201);
    }

    public function show(UmrahPackage $umrahPackage)
    {
        return response()->json($umrahPackage);
    }

    public function update(UpdateUmrahPackageRequest $request, UmrahPackage $umrahPackage)
    {
        $data = $request->validated();
        
        // Handle both camelCase (from frontend) and snake_case (for database)
        if (isset($data['hotelRating'])) {
            $data['hotel_rating'] = $data['hotelRating'];
            unset($data['hotelRating']);
        }
        
        $umrahPackage->update($data);
        return response()->json($umrahPackage);
    }

    public function destroy(UmrahPackage $umrahPackage)
    {
        $umrahPackage->delete();
        return response()->json(null, 204);
    }
}
