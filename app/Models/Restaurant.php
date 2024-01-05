<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'address',
        'contact_phone_number',
        'contact-email-address',
    ];

    public function categories() {
        return $this->belongsToMany(Category::class, 'restaurant_category');
    }

    public function orders(){         
        return $this->hasMany(Order::class);     
    }
}
