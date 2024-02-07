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
            [
                'name' => 'Mesano meso',
                'meal_description' => 'cevapcici, leskovacki ustipak, pileci file, dimljena vesalica, kobasica, pomfrit, crni luk /450g',
                'price' => 990.00,
                'image' => 'https://www.smartkurir.com/wp-content/uploads/2022/09/rostilj-za-4.6-osoba.jpg',
                'restaurant_id' => '1'
            ],

            [
                'name' => 'Leskovacki ustipci',
                'meal_description' => 'kackavalj, slanina, crni luk, beli luk, sunka, tucana paprika, pomfrit',
                'price' => 810.00,
                'image' => 'https://i.ytimg.com/vi/4noztIzTQjk/maxresdefault.jpg',
                'restaurant_id' => '1'
            ],

            [
                'name' => 'Uzicki medaljoni',
                'meal_description' => 'svinjski file, pecurke, slanina, krompir, kajmak',
                'price' => 950.00,
                'image' => 'https://www.recepti.com/images/stories/kuvar/glavna-jela/00301-uzicki-medaljoni.jpg',
                'restaurant_id' => '1'
            ],
            [
                "name" => 'Grilovani losos',
                'meal_description' => 'losos, spanać, krompir',
                'price' => 2700.00,
                'image' => 'https://www.kuvarancije.com/images/recepti/riba/2018/grilovani-losos-7.JPG',
                'restaurant_id' => '1',
            ]
        ]);
    }
}
