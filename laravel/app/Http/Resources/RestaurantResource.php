<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'restaurant';

    public function toArray(Request $request): array
    {
        $categoryName = $this->category ? $this->category->category_name : null;

        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'description' => $this->resource->description,
            'address' => $this->resource->address,
            'contact_phone_number' => $this->resource->contact_phone_number,
            'contact_email_address' => $this->resource->contact_email_address,
            'category' => $categoryName,
            'image' => $this->resource->image
        ];
    }
}
