<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
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
            'user_id' => 'required|exists:users,id', //u tabeli users, kolona id
            'restoran_id'=> 'required|exists:restorani,id',
            'napomena'=>'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $order = Order::create([
            'user_id' => $request->user_id,
            'restoran_id' => $request->restoran_id,
            'napomena' => $request->napomena,
        ]);

        return response()->json(['Narudzbina je sacuvana', new OrderResource($order)]);

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

    
    

}
