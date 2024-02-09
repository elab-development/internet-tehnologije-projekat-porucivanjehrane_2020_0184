<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'api/register',
        'api/login',
        'api/users',
        'api/logout',
        'api/restaurants/*',
        'api/reset-password',
        'api/order_items/store',
        'api/orders/*'
    ];
}
