<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();
        return OrderResource::collection($orders);
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
            'user_id' => 'required|exists:users,id', 
            'restaurant_id'=> 'required|exists:restaurants,id',
            'payment_method'=>'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $order = Order::create([
            'user_id' => $request->user_id,
            'restaurant_id' => $request->restaurant_id,
            'payment_method' => $request->payment_method,
        ]);

        return response()->json(['Order has been saved.', new OrderResource($order)]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return new OrderResource($order);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $order_id)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'restaurant_id'=> 'required|exists:restaurants,id',
            'payment_method'=>'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $order = Order::find($order_id);
     
        $order->user_id = $request->user_id;
        $order->restaurant_id = $request->restaurant_id;
        $order->payment_method = $request->payment_method;
        

        $order->save();
     
        return response()->json(['Order has been updated.', new OrderResource($order)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($order_id)
    {
        $order = Order::find($order_id);
        $order->delete();

        return response()->json(['Order has been successfully deleted.', 204]);
    }

    
    

}
