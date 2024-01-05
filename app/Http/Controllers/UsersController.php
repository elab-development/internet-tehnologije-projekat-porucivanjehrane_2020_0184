<?php

namespace App\Http\Controllers;

use App\Models\Users;
use App\Http\Resources\UsersResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = Users::all();
        return UsersResource::collection($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response()->json([], 204);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email'=> 'required|string|email|max:100|unique:users',
            'password'=>'required|string|min:8',
            'address'=> 'required|string|max:100',
            'role_id' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user = Users::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'address' => $request->address,
            'role_id' => $request->role_id,
        ]);

        return response()->json(['User has been saved.', new UsersResource($user)]); 
    }

    /**
     * Display the specified resource.
     */
    public function show(Users $user)
    {
        return new UsersResource($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Users $users)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $user_id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email'=> 'required|string|email|max:100|unique:users',
            'password'=>'required|string|min:8',
            'address'=> 'required|string|max:100',
            'role_id' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user = Users::find($user_id);
     
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->address = $request->address;
        $user->role_id = $request->role_id;

        $user->save();
     
        return response()->json(['User has been updated.', new UsersResource($user)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($user_id)
    {
        $user = Users::find($user_id);
        $user->delete();
 
        return response()->json(['User has been successfully deleted.', 204]);
    }
}
