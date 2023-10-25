<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;
use Validator;

class AddDepartment extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
            $rules=array(
                "DoctorName" => "required",
                "DepartmentName" =>"required",
                "DepartmentHead" => "required",
                "status" =>"required"
            );

            $validator= Validator::make($req->all(),$rules);

            if($validator->fails())
            {
                return response()->json($validator->errors(),401);
            }

            else
            {
                $Department=new Department;

                $Department->DoctorName = $req->DoctorName;
                $Department->DepartmentName = $req->DepartmentName;
                $Department->DepartmentHead = $req->DepartmentHead;
                $Department->status = $req->status;

                $result=$Department->save();

                if($result)
                {
                    return "saved successfully";
                }

            }

            


    }

    /**
     * Show the form for creating a new resource.
     */

    public function Dview()
    {
        $Dview=new Department;
        $result=$Dview->all();

        return $result;
    }
    public function create()
    {
        //

        return "hello welcome";
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

        $find=Department::find($id);
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
    public function update(Request $req, string $id)
    {
        //
        $find=Department::find($id);

        $find->DoctorName = $req->DoctorName;
        $find->DepartmentName = $req->DepartmentName;
        $find->DepartmentHead = $req->DepartmentHead;
        $find->status = $req->status;


            $result=$find->save();

            if($result)
            {
                return "updated successfully";
            }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //

        $find=Department::find($id);

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
