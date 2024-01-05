<?php

namespace Database\Seeders;

use App\Models\Restaurant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Restaurant::create([
            'name'=>'Restoran Sindjelic', 
            'description'=>'Restoran sa dugogodisnjom tradicijom. Mozete dobiti da jedete sve sto zamislite.Hrana je veoma ukusna. Prijatno mesto sa dobrom muzikom uzivo u vecernjim satima. Osoblje je savrseno, pazljivo i ljubazno.',
            'address'=>'Vojislava Ilica 86, Beograd 11050',
            'contact_phone_number'=>'+381 11 3087067',
            'contact-email-address'=>'info@restoransindjelic.com'
        ]);
    }
}
