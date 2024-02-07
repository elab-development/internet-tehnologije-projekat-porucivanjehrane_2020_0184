<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;


use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\User;
use App\Models\Item;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Restaurant;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //  Category::factory(5)->create();
        //   User::factory(3)->create();
        //   Item::factory(4)->create();
        //   Restaurant::factory(4)->create();
        // Order::factory(3)->create();
        // OrderItem::factory(3)->create();
        $this->call([
            // UserSeeder::class,
            CategorySeeder::class,
            RestaurantSeeder::class,
            ItemSeeder::class,
            RoleSeeder::class
        ]);
    }
}
