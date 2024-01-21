<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Exception;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
       $users = Task::where('user_id',auth()->user()->id)->where('status','!=','Completed')->get();

       // Return Json Response
       return response()->json([
            'results' => $users
       ],200);
    }

    public function store(TaskRequest $request)
    {

       // return
        try {
            // Create User
            Task::create([
                'title' => $request->title,
                'description' => $request->description,
                'status' => 'Todo',
                'assign_date'=>date('Y-m-d'),
                'user_id'=>$request->user_id,
                'assign_user'=>auth()->user()->id

            ]);

            // Return Json Response
            return response()->json([
                'message' => "Task successfully created."
            ],200);
        } catch (Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => $e->getMessage()
            ],500);
        }
    }

    public function show($id)
    {
       // User Detail
       $users = Task::find($id);
       if(!$users){
         return response()->json([
            'message'=>'Task Not Found.'
         ],404);
       }

       // Return Json Response
       return response()->json([
          'users' => $users
       ],200);
    }

    public function update(TaskRequest $request, $id)
    {
        try {
            // Find User
            $tasks = Task::find($id);
            if(!$tasks){
              return response()->json([
                'message'=>'Task Not Found.'
              ],404);
            }



               $tasks->title = $request->title;
               $tasks->description = $request->description;
             $tasks->status = $request->status;
             $tasks->user_id = $request->user_id;
             $tasks->assign_user=auth()->user()->id;

                $tasks->save();

                // Return Json Response
                return response()->json([
                    'message' => "Task successfully updated."
                ],200);


        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => $e->getMessage()
            ],500);
        }
    }

    public function destroy($id)
    {
        // Detail
        $task = Task::find($id);
        if(!$task){
          return response()->json([
             'message'=>'Task Not Found.'
          ],404);
        }

        if($task->assign_user == auth()->user()->id){
        // Delete User
        $task->delete();
        return response()->json([
            'message' => "Task successfully deleted."
        ],200);

    }else{
        return response()->json([
            'message' => "Cannot Delete."
        ],400);
    }

    }

    public function updatestatus(Request $request, $id)
    {
        try {
            // Find User
            $tasks = Task::find($id);
            if(!$tasks){
              return response()->json([
                'message'=>'Task Not Found.'
              ],404);
            }

             $tasks->status = $request->status;
            $tasks->save();

                // Return Json Response
                return response()->json([
                    'message' => "Task successfully updated."
                ],200);


        } catch (Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => $e->getMessage()
            ],500);
        }
    }
}
