<?php

namespace App\Http\Middleware;

use Closure;
use Prometheus\CollectorRegistry;

class PrometheusMetricsMiddleware
{
    protected $histogram;

    public function __construct(CollectorRegistry $registry)
    {
        // ✅ koristi getOrRegisterHistogram (sada ručno dodatu u tvoj CollectorRegistry)
        $this->histogram = $registry->getOrRegisterHistogram(
            'laravel',                                // namespace
            'http_request_duration_seconds',          // ime metrike
            'HTTP request duration in seconds',       // opis metrike
            ['method', 'path'],                       // labels
            [0.1, 0.5, 1, 2, 5, 10]                   // buckets
        );
    }

    public function handle($request, Closure $next)
    {
        $start = microtime(true);
        $response = $next($request);
        $duration = microtime(true) - $start;

        $path = $request->path() ?: '/';
        $method = $request->method();

        $this->histogram->observe($duration, [$method, $path]);

        return $response;
    }
}
