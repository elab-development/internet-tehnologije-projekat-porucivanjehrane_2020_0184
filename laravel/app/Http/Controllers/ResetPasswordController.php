<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class ResetPasswordController extends Controller
{
    public function resetPassword(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string|min:8',
                'password_confirmation' => 'required|string|same:password',
            ]);
    
            // Pronalazi korisnika po email adresi -> zastita od SQL Injection-a
            $user = User::where('email', $request->email)->first();
    
            // Ako korisnik ne postoji, vraća grešku
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
    
            // Resetovanje lozinke korisnika
            $user->password = Hash::make($request->password);
            $user->save();
    
            return response()->json(['message' => 'Password reset successful']);
        } catch (\Exception $e) {
            // Uhvati izuzetak i vrati odgovor sa statusom 500
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
