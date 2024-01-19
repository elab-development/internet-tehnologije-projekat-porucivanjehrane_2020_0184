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
            return response()->json($validator->errors(), 422);
        }

        // Provera da li korisnik ima dozvolu za dodavanje stavke porudžbine u svoju porudžbinu
        $order = Order::find($request->order_id);

        if (!$order || auth()->user()->id !== $order->user_id) {
            return response()->json(['error' => 'You do not have the permission to add items to this order'], 403);
        }

        $orderItem = OrderItem::create([
            'order_id' => $request->order_id,
            'item_id' => $request->item_id,
            'quantity' => $request->quantity,
        ]);

        return response()->json(['message' => 'Order item has been added.', 'order_item' => new OrderItemResource($orderItem)], 201);
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
        // Pronalaženje stavke porudžbine po ID-u
        $order_item = OrderItem::findOrFail($orderItem_id);

        // Provera da li stavka porudžbine pripada porudžbini koja pripada ulogovanom korisniku
        if (auth()->user()->id !== $order_item->order->user_id) {
            return response()->json(['error' => 'You do not have the permission to update this order item, because it is not a part of your order'], 403);
        }

        // Validacija prosleđenih podataka - prilagodite prema potrebama
        $request->validate([
            'column' => 'required', // Validacija kolone koju želite da ažurirate
            'value' => 'required',  // Nova vrednost kolone
        ]);

        $column = $request->input('column');
        $value = $request->input('value');

        $order_item->$column = $value;
        $order_item->save();

        return response()->json(['message' => 'Order item has been updated.'], 200);
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



    public function orderOrderItems(Order $order)
    {
        // Provera da li korisnik ima dozvolu za pregled stavki porudžbine
        if (auth()->user()->id !== $order->user_id) {
            return response()->json(['error' => 'You do not have the permission to view order items of this order.'], 403);
        }

        // Dobijanje svih stavki porudžbine za određenu porudžbinu
        $orderItems = $order->order_items;

        return response()->json(['order_items for order:' . $order->id => $orderItems], 200);
    }
}
