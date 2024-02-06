<?php

namespace App\Http\Controllers;

use App\Models\RestaurantCategory;
use App\Http\Resources\RestaurantCategoryResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RestaurantCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurant_category = RestaurantCategory::all();
        return RestaurantCategoryResource::collection($restaurant_category);
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
            'restaurant_id' => 'required',
            'category_id'=> 'required',  
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $restaurant_category = RestaurantCategory::create([
            'name' => $request->name,
            'restaurant_id' => $request->restaurant_id,
            'category_id' => $request->category_id,
        ]);

        return response()->json(['Restaurant category has been saved.', new RestaurantCategoryResource($restaurant_category)]);
    
    }

    /**
     * Display the specified resource.
     */
    public function show(RestaurantCategory $restaurantCategory)
    {
        return new RestaurantCategoryResource($restaurantCategory);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RestaurantCategory $restaurantCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $restaurantCategory_id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'restaurant_id' => 'required',
            'category_id'=> 'required',
            
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $restaurant_category = RestaurantCategory::find($restaurantCategory_id);
     
        $restaurant_category->name= $request->name;
        $restaurant_category->restaurant_id = $request->restaurant_id;
        $restaurant_category->category_id = $request->category_id;
       

        $restaurant_category->save();
     
        return response()->json(['Restaurant category has been updated.', new RestaurantCategoryResource($restaurant_category)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($restaurantCategory_id)
    {
        $restaurant_category =RestaurantCategory::find($restaurantCategory_id);
        $restaurant_category->delete();
 
        return response()->json(['Restaurant category has been successfully deleted.', 204]);
    }
}
