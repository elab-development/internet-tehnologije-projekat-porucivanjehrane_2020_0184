<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Restaurant;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       
        $this->call([
           CategorySeeder::class,
            MenuSeeder::class,
            MenuItemSeeder::class,
            RestaurantSeeder::class,
            RoleSeeder::class,
            UserSeeder::class
        ]);
    }
}
