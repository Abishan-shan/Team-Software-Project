<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;
use Validator;

class AddSchedule extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $rules=array(
            "DoctorId" => "required",
            "DoctorName" => "required",
            "time" =>"required",
            "AddDepartment" => "required",
            "day" =>"required",
        );

        $validator= Validator::make($req->all(),$rules);

        if($validator->fails())
        {
            return response()->json($validator->errors(),401);
        }

        else
        {
            $Schedule=new Schedule;

            $Schedule->DoctorId = $req->DoctorId;
            $Schedule->DoctorName = $req->DoctorName;
            $Schedule->time = $req->time;
            $Schedule->AddDepartment = $req->AddDepartment;
            $Schedule->day=$req->day;
            $Schedule->status = "";

            $result=$Schedule->save();

            if($result)
            {
                return "updated successfully";
            }

        }
    }


    public function view()
    {
            $view=new Schedule;
            $result=$view->all();

            return $result;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

        return "bye";
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $find=Schedule::find($id);

        return $find;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $req,String $id)
    {
        //
            $find=Schedule::find($id);

            $find->DoctorName = $req->DoctorName;
            $find->time = $req->time;
            $find->AddDepartment = $req->AddDepartment;
            $find->day=$req->day;
            $find->status = $req->status;

            $result=$find->save();

            if($result)
            {
                return "updated successfully";
            }

            
            return "hello: ".$find;

    }

    function ScheduleUpdate(String $id,Request $req)
    {
        $find=Schedule::where("id",$id)->first();

        $find->status = $req->status;

            $result=$find->save();

            if($result)
            {
                return "updated successfully";
            }

            
            return "hello: ".$find;


    }

    /**
     * Remove the specified resource from storage.
     */


    public function showSchedule(string $id)
    {
        $user=Schedule::where('DoctorId',$id)->get();
        return $user;
    }


    public function destroy(string $id)
    {
        //

        $find=Schedule::find($id);

            if($find == null)
            {
                return "we can not find that id in our database";
            }

            else{

            $result=$find->delete();

            if($result)
            {
                return "successfully deleted";
            }

            else{
                return "you have an error";
            }

            }
    
    }
}
