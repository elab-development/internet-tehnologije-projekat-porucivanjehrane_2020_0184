<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderItem $orderItem)
    {
        //
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
    public function update(Request $request, OrderItem $orderItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderItem $orderItem)
    {
        //
    }

    public function addOrderItem(Request $request)
{
    // find the MenuItem 
    $menuItem = MenuItem::find($request->menu_item_id);

    // Checking if the Order that contains an OrderItem with the specified menu_item_id already exists
    $order = Order::whereHas('orderItems', function ($query) use ($menuItem) {
        $query->where('menu_item_id', $menuItem->id);
    })->first();

    // If the Order exists, update it
    if ($order) {
        $order->item_count += $request->quantity;
        $order->price_total += $menuItem->price * $request->quantity;
        $order->save();
    } else {
        // If it doesn't already exist, then create it
        $order = Order::create([
            'order_number' => uniqid(),  
            'status' => 'pending',  
            'item_count' => $request->quantity,
            'price_total' => $menuItem->price * $request->quantity,
            'is_paid' => false,  
            'payment_method' => 'cash_on_delivery',  
            'user_id' => auth()->user()->id,  
        ]);

        // Connect Order with OrderItem
        $orderItem = OrderItem::create([
            'quantity' => $request->quantity,
            'menu_item_id' => $menuItem->id,
            'order_id' => $order->id,
        ]);
    }

    return response()->json(['message' => 'OrderItem dodat uspešno.']);
}
    

}
