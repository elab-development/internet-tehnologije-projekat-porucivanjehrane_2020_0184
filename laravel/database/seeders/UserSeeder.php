<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            ['name'=>'Ana', 
            'email'=>'pavlovicana256@gmail.com',
            'password'=>'ana123456',
            'address'=>'',
            'role_id'=>'1'],

            ['name'=>'Adrijana', 
            'email'=>'adrijanapantic@gmail.com',
            'password'=>'adrijana',
            'address'=>'',
            'role_id'=>'1'],
            
            
            ['name'=>'Sara', 
            'email'=>'sararistic@gmail.com',
            'password'=>'sara12345',
            'address'=>'Takovska 15',
            'role_id'=>'2'],

            ['name'=>'Zeljana', 
            'email'=>'zeljanapetric@gmail.com',
            'password'=>'zeljana12345',
            'address'=> '',
            'role_id'=>'3']
        ]);
    }
}
