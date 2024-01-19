<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\UserController;
use App\Models\OrderItem;
use App\Models\Restaurant;
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


Route::resource('/items', ItemController::class)->only(['index', 'show']);
Route::resource('/categories', CategoryController::class)->only(['index', 'show']);
Route::resource('/restaurants', RestaurantController::class)->only(['index', 'show']);

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });
});

Route::group(['middleware' => ['auth:sanctum']], function () { //ovo su zasticene rute
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });
    Route::resource('/items', ItemController::class)->only(['update','destroy'])->middleware('accessControl:1');
    Route::post('/items/store', [ItemController::class, 'store'])->middleware('accessControl:1');
    Route::resource('/categories', CategoryController::class)->only(['update', 'destroy'])->middleware('accessControl:1');
    Route::post('/categories/store', [CategoryController::class, 'store'])->middleware('accessControl:1');
    Route::resource('/restaurants', RestaurantController::class)->only(['update', 'destroy'])->middleware('accessControl:1');
    Route::post('/restaurants/store', [RestaurantController::class, 'store'])->middleware('accessControl:1');
    Route::get('/users', [UserController::class, 'index'])->middleware('accessControl:1');
    Route::get('/users/{id}', [UserController::class, 'show'])->middleware('accessControl:1');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware('accessControl:1');
    Route::resource('/orders', OrderController::class)->only(['index', 'show'])->middleware('accessControl:1');
    Route::resource('/orders', OrderController::class)->only(['update'])->middleware('accessControl:1');

    Route::post('/orders/store', [OrderController::class, 'store'])->middleware('accessControl:2');
    Route::get('/orders/{user_id}', [OrderController::class, 'getUserOrders'])->middleware('accessControl:2');
    Route::delete('/orders/{user_id}/{id}', [OrderController::class, 'deleteOnlyYourOrder'])->middleware('accessControl:2');
    // Route::delete('/orders/{id}', [OrderController::class, 'destroy'])->middleware('accessControl:2');
    Route::post('/order_items/store', [OrderItemController::class, 'store'])->middleware('accessControl:2');
    Route::resource('/order_items', OrderItemController::class)->only(['update'])->middleware('accessControl:2');
    Route::get('/order_items/{order_id}', [OrderItemController::class, 'getOrderOrderItems'])->middleware('accessControl:2');
    Route::put('/users/{id}/update', [UserController::class, 'update'])->middleware('accessControl:2');


    // API route for logout user
    Route::post('/logout', [AuthController::class, 'logout']);
});
