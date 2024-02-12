<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;


    protected $fillable = [
        'payment_method',
        'user_id',
        'restaurant_id',

    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function restaurants()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function order_items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            $order->order_number = Str::uuid(); // Koristimo UUID za generisanje jedinstvenog broja
        });
    }
}
