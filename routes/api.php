<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\UsersController;
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


Route::get('/users', [UsersController::class, 'index']);
Route::get('/users/{id}', [UsersController::class, 'show']);
Route::post('/users/store', [UsersController::class, 'store']);
Route::put('/users/{id}/update', [UsersController::class, 'update']);
Route::delete('/users/{id}', [UsersController::class, 'destroy']);

Route::post('/categories/store',[CategoryController::class,'store']);
Route::post('/restaurants/store',[RestaurantController::class,'store']);
Route::delete('/restaurants/{id}',[RestaurantController::class, 'destroy']);

//Route::resource('/users', UsersController::class);
Route::resource('/restaurants', RestaurantController::class);
Route::resource('/orders', OrderController::class);
Route::resource('/categories', CategoryController::class);
Route::resource('/items', ItemController::class);

// Route::post('/register', [AuthController::class, 'register']);
// Route::post('/login', [AuthController::class, 'login']);

/*Route::group(['middleware' => ['auth:sanctum']], function () { //ovo su zasticene rute
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    Route::resource('posts', ProizvodController::class)->only(['update','store','destroy'])->middleware('proveraRole:admin');

    // API route for logout user
    Route::post('/logout', [AuthController::class, 'logout']);
});*/