<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;


    protected $fillable = [    
        'name',
        'meal_description',
        'price',
        'category_id',      
    ];

    // public function orders(){
    //     return $this->belongsToMany(Order::class,'order_items');
    // }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function order_items(){
        return $this->hasMany(OrderItem::class);
    }
}
