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
        'image',
        'amount',
        'restaurant_id',
    ];



    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function order_items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
