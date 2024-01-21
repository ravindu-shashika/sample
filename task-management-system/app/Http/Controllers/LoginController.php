<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken($request->email)->plainTextToken;

            return response()->json([
                'user' => $user,
                'access_token' => $token,
            ], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 200);
    }

    public function logout()
  {
    // Auth::user()->tokens()->delete();

    $user = Auth::user();
    $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
  }



}
