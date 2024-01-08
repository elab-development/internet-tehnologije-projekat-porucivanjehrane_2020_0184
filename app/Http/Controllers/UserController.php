<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return UserResource::collection($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:8',
            'address' => 'required|string|max:100',
            'role_name' => 'required|string' // Add validation for role_name
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
    
        // Find the role by name
        $role = Role::where('role_name', $request->role_name)->first();
    
        if (!$role) {
            return response()->json(['error' => 'Role not found.'], 404);
        }
    
        // Create a new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'address' => $request->address,
            'role_id' => $role->id // Use the retrieved role_id
        ]);
    
        return response()->json(['User has been saved.', new UserResource($user)]);
    
    }

    /**
     * Display the specified resource.
     */
    public function show($user_id)
    {
        $user=User::find($user_id);

        if(is_null($user))
        {
            return response()->json("User doesn't exist.");
        }
        return new UserResource($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $users)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $user_id)
    {
        // Pronalaženje korisnika po ID-u
        $user = User::findOrFail($user_id);

        // Validacija prosleđenih podataka - prilagodite prema potrebama
        $request->validate([
            'column' => 'required', // Validacija kolone koju želite da ažurirate
            'value' => 'required',  // Nova vrednost kolone
        ]);
       
        $column = $request->input('column');
        $value = $request->input('value');

        $user->$column = $value;
        $user->save();

        return redirect()->back()->with('success', 'Podaci korisnika su uspešno ažurirani.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($user_id)
    {
        $user = User::find($user_id);
        $user->delete();
 
        return response()->json(['User has been successfully deleted.', 204]);
    }
}
