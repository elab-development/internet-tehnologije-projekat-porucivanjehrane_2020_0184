<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Item::insert([
            ['name'=>'Mesano meso', 
            'meal_description'=>'cevapcici, leskovacki ustipak, pileci file, dimljena vesalica, kobasica, pomfrit, crni luk /450g',
            'price'=>990.00,
            'category_id'=>'1'],

            ['name'=>'Sindjelic pljeskavica', 
            'meal_description'=>'kackavalj, beli luk, crni luk, ljuta paprika, kajmak, slanina, pomfrit',
            'price'=>850.00,
            'category_id'=>'1'],

            ['name'=>'Leskovacki ustipci', 
            'meal_description'=>'kackavalj, slanina, crni luk, beli luk, sunka, tucana paprika, pomfrit',
            'price'=>810.00,
            'category_id'=>'1'],

            ['name'=>'Uzicki medaljoni', 
            'meal_description'=>'svinjski file, pecurke, slanina, krompir, kajmak',
            'price'=>950.00,
            'category_id'=>'1'],
        ]);
    }
}
