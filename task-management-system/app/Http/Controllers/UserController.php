<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
       $users = User::all();

       // Return Json Response
       return response()->json([
            'results' => $users
       ],200);
    }

    public function store(UserStoreRequest $request)
    {
        try {
            // Create User
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            $token = $user->createToken($request->email)->plainTextToken;
            $userdet=User::where('id',$user->id)->first();

            return response()->json([
                'user' => $userdet,
                'access_token' => $token,
                'message' => "User successfully created."
            ], 200);

            // Return Json Response
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }

    public function show($id)
    {
       // User Detail
       $users = User::find($id);
       if(!$users){
         return response()->json([
            'message'=>'User Not Found.'
         ],404);
       }

       // Return Json Response
       return response()->json([
          'users' => $users
       ],200);
    }

    public function update(UserStoreRequest $request, $id)
    {
        try {
            // Find User
            $users = User::find($id);
            if(!$users){
              return response()->json([
                'message'=>'User Not Found.'
              ],404);
            }

            //echo "request : $request->image";
            $users->name = $request->name;
            $users->email = $request->email;

            // Update User
            $users->save();

            // Return Json Response
            return response()->json([
                'message' => "User successfully updated."
            ],200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }

    public function destroy($id)
    {
        // Detail
        $users = User::find($id);
        if(!$users){
          return response()->json([
             'message'=>'User Not Found.'
          ],404);
        }

        // Delete User
        $users->delete();

        // Return Json Response
        return response()->json([
            'message' => "User successfully deleted."
        ],200);
    }

    public function changeUserPassword(Request $request)
  {
    $user = Auth::user();
    if (!Hash::check($request->current_password, $user->password)) {
      return response()->json(['error' => 'Something Error!'], 400);
    }

    $user->password = Hash::make($request->new_password);
    $user->save();

    return response()->json(['success' => 'Password successfully changed!'], 200);
  }
}
