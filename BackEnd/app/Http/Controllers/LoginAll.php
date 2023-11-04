<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Auth;
class LoginAll extends Controller
{
    //

    public function login(Request $req)
    {
        
            $rules=array(
                "Email" => "required|email",
                "Password" => "required|max:10",
             );


             $validator=Validator::make($req->all(),$rules);

                if($validator->fails())
                {

                    return response()->json($validator->errors(),401);
                }
            
            
            else{

                $userAdmin=Admin::where("Email",$req->Email)->first();
                $userPatient=Patient::where("Email",$req->Email)->first();
                $userDoctor=Doctor::where("Email",$req->Email)->first();


                if($userAdmin && $req->Password === "12345")
                {
                    return $userAdmin;
                }



            else{

                
                if($userPatient && Hash::check($req->Password, $userPatient->Password))
                {
					session(['user' => $userPatient]);
                    return $userPatient;
    
                }


                if($userDoctor && Hash::check($req->Password, $userDoctor->Password))
                {
                    return $userDoctor;
                    
                }

                
                    return "{}";
                

                }
            }
    }
}
