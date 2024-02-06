<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\User;
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
            'restaurant_id' => 'required|exists:restaurants,id',
            'payment_method' => 'required',
        ]);

        if ($validator->fails()) {
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
         $order = Order::findOrFail($order_id);

         // Validacija prosleđenih podataka - prilagodite prema potrebama
         $request->validate([
             'column' => 'required', // Validacija kolone koju želite da ažurirate
             'value' => 'required',  // Nova vrednost kolone
         ]);
        
         $column = $request->input('column');
         $value = $request->input('value');
 
         $order->$column = $value;
         $order->save();
         return response()->json(['Order has been updated.', 204]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user, Order $order)
    {
        // Provera da li porudžbina pripada korisniku
        if ($order->user_id !== $user->id) {
            return response()->json(['error' => 'You do not have the permission to delete this order.'], 403);
        }

        // Brisanje porudžbine
        $order->delete();

        return response()->json(['message' => 'Order has been successfully deleted.'], 200);
    }


   
    public function userOrders(User $user)
    {
        // Provera da li korisnik ima dozvolu za pregled svojih porudžbina
        if (auth()->user()->id !== $user->id) {
            return response()->json(['error' => 'You do not have the permission to view this order.'], 403);
        }

        // Dobijanje svih porudžbina za određenog korisnika 
        $orders = $user->orders;

        return response()->json(['orders' => $orders], 200);
    }
}
