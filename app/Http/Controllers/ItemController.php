<?php

namespace App\Http\Controllers;

use App\Http\Resources\ItemResource;
use App\Models\Item;
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
            'name'=>'required|string|max:100',
            'meal_description'=>'required',
            'price'=>'required|numeric',
            'category_id'=>'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $item = Item::create([
            'name' => $request->name,
            'meal_description' => $request->meal_description,
            'price' => $request->price,
            'category_id' => $request->category_id,
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
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'meal_description'=>'required',
            'price'=> 'required|numeric',
            'category_id'=> 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $item = Item::find($item_id);
     
        $item->name = $request->name;
        $item->meal_description = $request->meal_description;
        $item->price = $request->price;
        $item->category_id = $request->category_id;
        

        $item->save();
     
        return response()->json(['Item has been updated.', new ItemResource($item)]);
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
}
