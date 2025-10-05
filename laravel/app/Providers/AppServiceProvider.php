<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\StringType;
use Illuminate\Support\Facades\Schema;
use Prometheus\CollectorRegistry;
use Prometheus\Storage\InMemory; // može i APC ili Redis ako koristiš

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        $this->app->singleton(CollectorRegistry::class, function ($app) {
            $adapter = new InMemory();
            return new CollectorRegistry($adapter);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (!Type::hasType('enum')) {
            Type::addType('enum', StringType::class); // Registruj enum kao StringType
        }

        Schema::getConnection()->getDoctrineSchemaManager()->getDatabasePlatform()->registerDoctrineTypeMapping('enum', 'string');
    }
}
