<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;


    protected $fillable = [         
        'payment_method',
        'user_id',         
        'restoran_id',         
                    
    ]; 

    public function user(){         
        return $this->belongsTo(Users::class);     
    }     
    
    public function restaurants(){        
         return $this->belongsTo(Restaurant::class);     
    }     
   
    public function items() {
        return $this->belongsToMany(Item::class, 'order_items');
    }
}
