<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return CategoryResource::collection($categories);
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
            'name'=> 'required|string|max:100',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $category = Category::create([
            'name' => $request->name,
        ]);

        return response()->json(['Category has been saved.', new CategoryResource($category)]); 
    
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $category_id)
    {
        $validator = Validator::make($request->all(), [
            'name'=> 'required|string|max:100',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $category = Category::find($category_id);
     
        $category->name = $request->name;

        $category->save();
     
        return response()->json(['Category has been updated.', new CategoryResource($category)]); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($category_id)
    {
        $category = Category::find($category_id);
        $category->delete();
 
        return response()->json(['Category has been successfully deleted.', 204]);
    }
}
