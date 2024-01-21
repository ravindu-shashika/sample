<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', [UserController::class, 'store']);
Route::post('/login', [LoginController::class, 'login']);




    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });


Route::middleware(['auth:sanctum'])->group(function(){
    Route::get('users', [UserController::class, 'index']);

    Route::get('tasks', [TaskController::class, 'index']);
    Route::get('task/{id}', [TaskController::class, 'show']);
    Route::post('addtask', [TaskController::class, 'store']);
    Route::put('taskupdate/{id}', [TaskController::class, 'update']);
    Route::put('status-update/{id}',[TaskController::class,'updatestatus']);
    Route::delete('taskdelete/{id}', [TaskController::class, 'destroy']);

Route::post('change-user-password', [UserController::class ,'changeUserPassword']);
Route::post('logout', [LoginController::class, 'logout']);
});
