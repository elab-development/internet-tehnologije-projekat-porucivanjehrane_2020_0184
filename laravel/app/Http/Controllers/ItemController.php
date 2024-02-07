<?php

namespace App\Http\Controllers;

use App\Http\Resources\ItemResource;
use App\Models\Item;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Item::all();
        return ItemResource::collection($items);
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
            'name' => 'required|string|max:100',
            'meal_description' => 'required',
            'price' => 'required|numeric',
            'image' => 'string',
            'amount' => 'numeric',
            'restaurant_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $restaurant = Restaurant::where('id', $request->restaurant_id)->first();
        if (!$restaurant) {
            return response()->json(['error' => 'Restaurant not found']);
        }

        $item = Item::create([
            'name' => $request->name,
            'meal_description' => $request->meal_description,
            'price' => $request->price,
            'image' => $request->image,
            'amount' => $request->amount,
            'restaurant_id' => $restaurant->id,
        ]);

        return response()->json(['Item has been saved.', new ItemResource($item)]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        return new ItemResource($item);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $item_id)
    {
        // Pronalaženje korisnika po ID-u
        $item = Item::findOrFail($item_id);

        // Validacija prosleđenih podataka - prilagodite prema potrebama
        $request->validate([
            'column' => 'required', // Validacija kolone koju želite da ažurirate
            'value' => 'required',  // Nova vrednost kolone
        ]);

        $column = $request->input('column');
        $value = $request->input('value');

        $item->$column = $value;
        $item->save();

        return response()->json(['Item has been updated.', 204]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($item_id)
    {
        $item = Item::find($item_id);
        $item->delete();

        return response()->json(['Item has been successfully deleted.', 204]);
    }

    public function getItemsByRestaurant($restaurantId)
    {
        $restaurant = Restaurant::findOrFail($restaurantId);
        $items = $restaurant->items()->get();
        return ItemResource::collection($items); // Koristimo ItemResource za oblikovanje podataka

    }
}
