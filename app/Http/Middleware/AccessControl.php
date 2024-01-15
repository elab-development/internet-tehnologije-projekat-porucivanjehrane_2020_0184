<?php

namespace App\Http\Middleware;

use App\Models\Role;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AccessControl
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
     //   $role = Role::where('role_name', $request->role_name)->first();
        if($request->user('sanctum') && in_array($request->user('sanctum')->role_id, $roles)){
        return $next($request);
        }
        return response()->json(['error'=>'Access denied'], 401);
    }
}
