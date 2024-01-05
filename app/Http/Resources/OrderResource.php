<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'id' => $this->resource->id, 
        'order_number' => $this->resource->order_number,
        'status' => $this->resource->status,
        'item_count' => $this->resource->item_count,
        'price_total' => $this->resource->price_total,
        'payment_method' => $this->resource->napomena,
        'user_id' => $this->resource->user_id,
        ];
    }
}
