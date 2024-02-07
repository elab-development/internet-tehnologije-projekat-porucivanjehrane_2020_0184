<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'item';
    public function toArray(Request $request): array
    {
        $restaurantName = $this->restaurant ? $this->restaurant->name : null;

        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'meal_description' => $this->resource->meal_description,
            'price' => $this->resource->price,
            'image' => $this->resource->image,
            'amount' => $this->resource->amount,
            'restaurant' => $restaurantName,
        ];
    }
}
