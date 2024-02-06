<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'order_id' => $this->resource->order_id,
            'item_id' => new ItemResource($this->resource->item),
            'quantity' => $this->resource->quantity,
           ];
    }
}
