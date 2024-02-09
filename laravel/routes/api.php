<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CacheController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\UserController;
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

// Ruta za resetovanje lozinke 
Route::post('/reset-password', [ResetPasswordController::class, 'resetPassword']);


Route::resource('/items', ItemController::class)->only(['index', 'show']);
Route::resource('/categories', CategoryController::class)->only(['index', 'show']);
Route::resource('/restaurants', RestaurantController::class)->only(['index', 'show']);


// Prikaz svih restorana koji pripadaju odredjenoj kategoriji
Route::get('category/{categoryId}/restaurants', [RestaurantController::class, 'getRestaurantsByCategory']);

// Prikaz svih proizvoda koje ima jedan restoran
Route::get('restaurant/{restaurantId}/items', [ItemController::class, 'getItemsByRestaurant']);

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
    Route::resource('/items', ItemController::class)->only(['update', 'destroy'])->middleware('accessControl:1');
    Route::post('/items/store', [ItemController::class, 'store'])->middleware('accessControl:1');
    Route::resource('/categories', CategoryController::class)->only(['update', 'destroy'])->middleware('accessControl:1');
    Route::post('/categories/store', [CategoryController::class, 'store'])->middleware('accessControl:1');
    Route::delete('/restaurants/{restaurantId}', [RestaurantController::class, 'destroy'])->middleware('accessControl:1');
    Route::put('/restaurants/{restaurantId}', [RestaurantController::class, 'update'])->middleware('accessControl:1');
    Route::post('/restaurants/store', [RestaurantController::class, 'store'])->middleware('accessControl:1');
    Route::get('/users', [UserController::class, 'index'])->middleware('accessControl:1');
    Route::get('/users/{id}', [UserController::class, 'show'])->middleware('accessControl:1');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware('accessControl:1');
    Route::put('/users/{id}', [UserController::class, 'update'])->middleware('accessControl:1');

    Route::resource('/orders', OrderController::class)->only(['index', 'show'])->middleware('accessControl:1');

    // Delivery guy moze da azurira status porudzbine
    Route::put('/orders/update/{order_id}', [OrderController::class, 'update'])->middleware('accessControl:3');

    // Logged in user moze da kreira porudzbine
    Route::post('/orders/store', [OrderController::class, 'store'])->middleware('accessControl:2');

    // Logged in user moze da dodaje proizvode samo u svoje porudzbine, ne moze u tudje
    Route::post('/order_items/store', [OrderItemController::class, 'store'])->middleware('accessControl:2');

    // Logged in user moze da azurira samo one proizvode koji se nalaze u njegovoj porudzbini
    Route::resource('/order_items', OrderItemController::class)->only(['update'])->middleware('accessControl:2');

    // Logged in user moze da vidi samo svoje porudzbine, ne moze tudje
    Route::get('/user/{user}/orders', [OrderController::class, 'userOrders'])->middleware('accessControl:2');

    // Logged in user moze da vidi stavke samo svoje porudzbine, ne moze da gleda stavke tudjih porudzbina
    Route::get('/order/{order}/order_items', [OrderItemController::class, 'orderOrderItems'])->middleware('accessControl:2');

    // Logged in user moze da obrise samo svoje porudzbine, ne moze tudje
    Route::delete('/user/{user}/orders/{order}', [OrderController::class, 'destroy'])->middleware('accessControl:2');


    // API route for logout user
    Route::post('/logout', [AuthController::class, 'logout']);
});

// data caching
Route::get('/cache', [CacheController::class, 'index']);
