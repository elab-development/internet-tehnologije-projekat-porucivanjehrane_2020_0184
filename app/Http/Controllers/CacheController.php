<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

class CacheController extends Controller
{
    public function index()
    {
         // checking if the data exists in the cache
         $key = 'cached_users';
         $users = Cache::get($key);
 
         if (!$users) {
             // if not, take the data from database
             $users = User::all();
            // caches data on 60 minutes
             Cache::put($key, $users, now()->addMinutes(60)); 
         }
 
         return response()->json(["Data has been cached successfully.", $users]);
    }
}
