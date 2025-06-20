<?php
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\TimelineController;
use App\Http\Controllers\Api\CompanyInfoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public API routes for frontend
Route::prefix('v1')->group(function () {
    // Pages routes
    Route::apiResource('pages', PageController::class);
    
    // Services routes
    Route::apiResource('services', ServiceController::class);
    
    // Timeline routes
    Route::apiResource('timelines', TimelineController::class);
    
    // Contact routes
    Route::apiResource('contacts', ContactController::class);
    Route::patch('contacts/{contact}/mark-as-read', [ContactController::class, 'markAsRead']);
    
    // Company Info routes
    Route::get('company-info', [CompanyInfoController::class, 'getCompanyInfo']);
    Route::get('company-info/contact', [CompanyInfoController::class, 'getContactInfo']);
    Route::get('company-info/logo', [CompanyInfoController::class, 'getLogo']);
});

// CMS Admin routes (will be protected with authentication later)
Route::prefix('admin')->group(function () {
    Route::apiResource('pages', PageController::class)->names([
        'index' => 'admin.pages.index',
        'store' => 'admin.pages.store',
        'show' => 'admin.pages.show',
        'update' => 'admin.pages.update',
        'destroy' => 'admin.pages.destroy',
    ]);
    
    Route::apiResource('services', ServiceController::class)->names([
        'index' => 'admin.services.index',
        'store' => 'admin.services.store',
        'show' => 'admin.services.show',
        'update' => 'admin.services.update',
        'destroy' => 'admin.services.destroy',
    ]);
    
    Route::apiResource('timelines', TimelineController::class)->names([
        'index' => 'admin.timelines.index',
        'store' => 'admin.timelines.store',
        'show' => 'admin.timelines.show',
        'update' => 'admin.timelines.update',
        'destroy' => 'admin.timelines.destroy',
    ]);
    
    Route::apiResource('contacts', ContactController::class)->names([
        'index' => 'admin.contacts.index',
        'store' => 'admin.contacts.store',
        'show' => 'admin.contacts.show',
        'update' => 'admin.contacts.update',
        'destroy' => 'admin.contacts.destroy',
    ]);
    Route::patch('contacts/{contact}/mark-as-read', [ContactController::class, 'markAsRead'])
        ->name('admin.contacts.mark-as-read');
});
