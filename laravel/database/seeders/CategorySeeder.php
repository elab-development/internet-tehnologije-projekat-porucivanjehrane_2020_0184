<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::insert([
            ['category_name' => 'asian'],
            ['category_name' => 'mexican'],
            ['category_name' => 'serbian'],
            ['category_name' => 'american']
        ]);
    }
}
