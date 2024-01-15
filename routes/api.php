<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\UserController;
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


// Route::get('/users', [UserController::class, 'index']);
// Route::get('/users/{id}', [UserController::class, 'show']);
// Route::post('/users/store', [UserController::class, 'store']);
// Route::put('/users/{id}/update', [UserController::class, 'update']);
// Route::delete('/users/{id}', [UserController::class, 'destroy']);

//Route::post('/categories/store', [CategoryController::class, 'store']);
//Route::post('/restaurants/store', [RestaurantController::class, 'store']);
//Route::delete('/restaurants/{id}', [RestaurantController::class, 'destroy']);

//Route::resource('/users', UserController::class);
Route::resource('/restaurants', RestaurantController::class)->only(['index', 'show']);
Route::resource('/orders', OrderController::class)->only(['index', 'show']);
Route::resource('/categories', CategoryController::class)->only(['index', 'show']);
Route::resource('/items', ItemController::class)->only(['index', 'show']);

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });


    //Route::resource('restaurants', Restaurant::class)->only(['update','store','destroy']);
    // API route for logout user

});

Route::group(['middleware' => ['auth:sanctum']], function () { //ovo su zasticene rute
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });
    Route::resource('/items', ItemController::class)->only(['update', 'store', 'destroy'])->middleware('accessControl:1');
    Route::resource('/orders', OrderController::class)->only(['update', 'store', 'destroy'])->middleware('accessControl:1');
    Route::resource('/categories', CategoryController::class)->only(['update', 'store', 'destroy'])->middleware('accessControl:1');
    Route::resource('/restaurants', RestaurantController::class)->only(['update', 'store', 'destroy'])->middleware('accessControl:1');

    Route::get('/users', [UserController::class, 'index'])->middleware('accessControl:1');
    Route::get('/users/{id}', [UserController::class, 'show'])->middleware('accessControl:1');
    Route::post('/users/store', [UserController::class, 'store'])->middleware('accessControl:1');
    Route::put('/users/{id}/update', [UserController::class, 'update'])->middleware('accessControl:1');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware('accessControl:1');
    // API route for logout user
    Route::post('/logout', [AuthController::class, 'logout']);
});