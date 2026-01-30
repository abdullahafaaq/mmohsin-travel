<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UmrahPackageController;
use App\Http\Controllers\Api\DestinationController;
use App\Http\Controllers\Api\AirlineController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\CounterStatController;
use App\Http\Controllers\Api\SiteSettingsController;
use App\Http\Controllers\Api\AboutContentController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Public API endpoints (no auth required)
Route::get('/umrah-packages', [UmrahPackageController::class, 'index']);
Route::get('/umrah-packages/{id}', [UmrahPackageController::class, 'show']);

Route::get('/destinations', [DestinationController::class, 'index']);
Route::get('/destinations/{id}', [DestinationController::class, 'show']);

Route::get('/airlines', [AirlineController::class, 'index']);
Route::get('/airlines/{id}', [AirlineController::class, 'show']);

Route::get('/team-members', [TeamMemberController::class, 'index']);
Route::get('/team-members/{id}', [TeamMemberController::class, 'show']);

Route::get('/counter-stats', [CounterStatController::class, 'index']);
Route::get('/site-settings', [SiteSettingsController::class, 'index']);
Route::get('/about-content', [AboutContentController::class, 'index']);

// Protected routes (admin only)
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Umrah Packages
    Route::post('/umrah-packages', [UmrahPackageController::class, 'store']);
    Route::put('/umrah-packages/{id}', [UmrahPackageController::class, 'update']);
    Route::delete('/umrah-packages/{id}', [UmrahPackageController::class, 'destroy']);

    // Destinations
    Route::post('/destinations', [DestinationController::class, 'store']);
    Route::put('/destinations/{id}', [DestinationController::class, 'update']);
    Route::delete('/destinations/{id}', [DestinationController::class, 'destroy']);

    // Airlines
    Route::post('/airlines', [AirlineController::class, 'store']);
    Route::put('/airlines/{id}', [AirlineController::class, 'update']);
    Route::delete('/airlines/{id}', [AirlineController::class, 'destroy']);

    // Team Members
    Route::post('/team-members', [TeamMemberController::class, 'store']);
    Route::put('/team-members/{id}', [TeamMemberController::class, 'update']);
    Route::delete('/team-members/{id}', [TeamMemberController::class, 'destroy']);

    // Counter Stats
    Route::post('/counter-stats', [CounterStatController::class, 'store']);
    Route::put('/counter-stats/{id}', [CounterStatController::class, 'update']);
    Route::delete('/counter-stats/{id}', [CounterStatController::class, 'destroy']);

    // Site Settings
    Route::put('/site-settings', [SiteSettingsController::class, 'update']);
    Route::post('/site-settings', [SiteSettingsController::class, 'store']);

    // About Content
    Route::put('/about-content', [AboutContentController::class, 'update']);
    Route::post('/about-content', [AboutContentController::class, 'store']);
});
