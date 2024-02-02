<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\Role;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator=Validator::make($request->all(),[
            'name'=>'required|string|max:40',
            'email'=>'required|email|string|max:40',
            'password'=>'required|string|min:8',
            'address'=>'string|max:40',
            'role_name'=>'required|string|max:40'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors());
        }
        $role = Role::where('role_name', $request->role_name)->first();
        if (!$role) {
            return response()->json(['error' => 'Role not found.'], 404);
        }

        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>$request->password,
            'address'=>$request->address,
            'role_id'=>$role->id
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['message'=> "Hi ".$user->name.", welcome!", 'access_token'=>$token, 'token_type'=>'Bearer', 'data'=>$user]);

    }

    public function login(Request $request){
        if(!Auth::attempt($request->only('email','password')))
        return response()->json(['message'=>'Unauthorized',401]);

        $user=User::where('email',$request->email)->firstOrFail(); 
        $token =$user->createToken('auth_token')->plainTextToken;
        return response()->json(['message'=> "Hi ".$user->name.", welcome back!", 'access_token'=>$token, 'token_type'=>"Bearer", "name"=>$user->name, "role_id"=>$user->role_id]);

    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message'=>'You have successfully logged out.']);
    }
}
