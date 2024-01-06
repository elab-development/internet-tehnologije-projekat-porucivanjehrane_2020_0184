<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Http\Resources\RestaurantResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurants = Restaurant::all();
        return RestaurantResource::collection($restaurants);
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
            'description'=>'required|string|max:255',
            'address'=> 'required|string|max:100',
            'contact_phone_number'=>'required|string|max:11',
            'contact_email_address'=>'required|string|email|max:100',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $restaurant = Restaurant::create([
            'name' => $request->name,
            'description' => $request->description,
            'address' => $request->address,
            'contact_phone_number' => $request->contact_phone_number,
            'contact_email_address' => $request->contact_email_address,
        ]);

        return response()->json(['Restaurant has been saved.', new RestaurantResource($restaurant)]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant)
    {
        return new RestaurantResource($restaurant);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Restaurant $restaurant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Restaurant $restaurant_id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'description'=>'required|string|max:255',
            'address'=> 'required|string|max:100',
            'contact_phone_number'=> 'required|string|max:9',
            'contact_email_address'=> 'required|string|email|max:100|unique:users',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $restaurant = Restaurant::find($restaurant_id);
     
        $restaurant->name = $request->name;
        $restaurant->description = $request->description;
        $restaurant->address = $request->address;
        $restaurant->contact_phone_number = $request->contant_phone_number;
        $restaurant->contact_email_address = $request->contact_email_address;

        $restaurant->save();
     
        return response()->json(['Restaurant has been updated.', new RestaurantResource($restaurant)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($restaurant_id)
    {
        $restaurant = Restaurant::find($restaurant_id);
        $restaurant->delete();
 
        return response()->json(['Restaurant has been successfully deleted.', 204]);
    }
}
