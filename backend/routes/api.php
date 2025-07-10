<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CandidateDashboardController;
use App\Http\Controllers\EmployerDashboardController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\ProfileController;

// Public Routes
Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/jobs', [JobController::class, 'index']);
    Route::get('/jobs/{job:slug}', [JobController::class, 'show']);
    
    Route::get('/companies', [CompanyController::class, 'index']);
    Route::get('/companies/{company:slug}', [CompanyController::class, 'show']);
    
    // Blog, Category, etc.
});

// Authenticated Routes
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Candidate Specific Routes
    Route::prefix('candidate/dashboard')->middleware('role:candidate')->group(function () {
        Route::get('/applications', [CandidateDashboardController::class, 'applications']);
        Route::get('/saved-jobs', [CandidateDashboardController::class, 'savedJobs']);
        Route::get('/profile', [ProfileController::class, 'show']);
        Route::post('/profile', [ProfileController::class, 'update']);
    });
    
    // Employer Specific Routes
    Route::prefix('employer/dashboard')->middleware('role:employer')->group(function () {
        Route::apiResource('jobs', EmployerDashboardController::class);
        Route::get('jobs/{job}/applicants', [EmployerDashboardController::class, 'applicants']);
    });

    // General Authenticated Actions
    Route::post('/jobs/{job}/apply', [ApplicationController::class, 'store'])->middleware('role:candidate');
});