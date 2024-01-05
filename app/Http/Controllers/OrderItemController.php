<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use App\Http\Resources\OrderItemResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $order_item = OrderItem::all();
        return OrderItemResource::collection($order_item);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required',
            'item_id'=>'required',
            'quantity'=> 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $order_item = OrderItem::create([
            'order_id' => $request->order_id,
            'item_id' => $request->item_id,
            'quantity' => $request->quantity,
        ]);

        return response()->json(['Order item has been saved.', new OrderItemResource($order_item)]);
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderItem $orderItem)
    {
        return new OrderItemResource($orderItem);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderItem $orderItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $orderItem_id)
    {
        $validator = Validator::make($request->all(), [
            'order_id'=>'required',
            'item_id'=>'required',
            'quantity'=>'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }


        $order_item = OrderItem::find($orderItem_id);
        $order_item->order_id = $request->order_id;
        $order_item->item_id = $request->item_id;
        $order_item->quantity = $request->quantity;
       

        $order_item->save();
     
        return response()->json(['Order item has been updated.', new OrderItemResource($order_item)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($orderItem_id)
    {
        $order_item = OrderItem::find($orderItem_id);
        $order_item->delete();
        return response()->json(['Order item has been successfully deleted.', 204]);
    }
}
