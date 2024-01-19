<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use App\Http\Resources\OrderItemResource;
use App\Models\Order;
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
            'item_id' => 'required',
            'quantity' => 'required',
        ]);

        if ($validator->fails()) {
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
         // Pronalaženje korisnika po ID-u
         $order_item = OrderItem::findOrFail($orderItem_id);

         // Validacija prosleđenih podataka - prilagodite prema potrebama
         $request->validate([
             'column' => 'required', // Validacija kolone koju želite da ažurirate
             'value' => 'required',  // Nova vrednost kolone
         ]);
        
         $column = $request->input('column');
         $value = $request->input('value');
 
         $order_item->$column = $value;
         $order_item->save();
 
         return response()->json(['Order Item has been updated.', 204]);
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

    public function getOrderOrderItems(Request $request, $order_id){
        $order = Order::find($request->$order_id);
   //     return response()->json($order);
        if ($order) {
            $order_items = $order->order_items; 
            return response()->json($order_items);
        }else {
            return response()->json(['message' => 'Order not found.'], 404);
        }

    }
}
