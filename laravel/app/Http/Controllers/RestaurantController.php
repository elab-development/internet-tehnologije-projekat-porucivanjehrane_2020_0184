<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Http\Resources\RestaurantResource;
use App\Models\Category;
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
            'description' => 'required|string|max:255',
            'address' => 'required|string|max:100',
            'contact_phone_number' => 'required|string|max:11',
            'contact_email_address' => 'required|string|email|max:100',
            'category_name' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $category = Category::where('category_name', $request->category_name)->first();
        if (!$category) {
            return response()->json(['error' => 'Category not found']);
        }

        $restaurant = Restaurant::create([
            'name' => $request->name,
            'description' => $request->description,
            'address' => $request->address,
            'contact_phone_number' => $request->contact_phone_number,
            'contact_email_address' => $request->contact_email_address,
            'category_id' => $category->id
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
    public function update(Request $request, $restaurant_id)
    {
        // Pronalaženje korisnika po ID-u
        $restaurant = Restaurant::findOrFail($restaurant_id);

        // Validacija prosleđenih podataka - prilagodite prema potrebama
        $request->validate([
            'column' => 'required', // Validacija kolone koju želite da ažurirate
            'value' => 'required',  // Nova vrednost kolone
        ]);

        $column = $request->input('column');
        $value = $request->input('value');

        $restaurant->$column = $value;
        $restaurant->save();

        return response()->json(['Restaurant has been updated.', 204]);
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

    public function getRestaurantsByCategory($categoryId)
    {
        $category = Category::findOrFail($categoryId);
        $restaurants = $category->restaurants()->get();
        return RestaurantResource::collection($restaurants);
    }
}
