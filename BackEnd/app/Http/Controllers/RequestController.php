<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Validator;
use Auth;

class RequestController extends Controller
{
    //

    public function index(Request $req)
    {
        $rules=array(
            "DoctorId" => "required",
            "PatientId" => "required",
            
        );

        $validator= Validator::make($req->all(),$rules);

        if($validator->fails())
        {
            return response()->json($validator->errors(),401);
        }

        else
        {
            $Schedule=new Post;

            $Schedule->DoctorId = $req->DoctorId;
            $Schedule->PatientId = $req->PatientId;


            $result=$Schedule->save();

            if($result)
            {
                return "updated successfully";
            }

        }
    }


    public function view() {
            $result=Post::all();

            return $result;

    }

    public function delete(string $id) {
        $result=Post::find($id);

        $delete=$result->delete();

        if($delete)
        {
            return "deleted";
        }
        

}
}
