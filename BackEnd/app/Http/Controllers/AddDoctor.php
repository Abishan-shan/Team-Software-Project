<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Doctor;
use Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AddDoctor extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        //

        $imagePath = null; // Initialize imagePath as null
        
        if($req->hasFile('Image')) {
            // If the "Image" field has a file, store the file and get the file path
            $imagePath = $req->file('Image')->store("apiDocs","public");
        }

        $rules=array(
            "FName" => "required",
            "LName" => "required",
            "Email" => "required|email",
            "Password" => "required|max:10",
            "Designation"=> "required",
            "Department"=>"required",
            "Address"=>"required",
            "Specialist"=>"required",
            "Mobile"=>"required",
            'Image' => 'required|image|mimes:jpeg,png,jpg,gif', 
            "Bio"=>"required",
            "DOB"=>"required",
            "BGroup"=>"required",
            "Sex"=>"required",
            
        );

        $validator= Validator::make($req->all(),$rules);

        if($validator->fails())
        {
            return response()->json($validator->errors(),401);
        }

        else
        {
            
            $Doctor=new Doctor;
            
            $Doctor->FName = $req->FName;
            $Doctor->LName =  $req->LName;
            $Doctor->Email =  $req->Email;
            $Doctor->Password =  $req->Password;
            $Doctor->Designation =  $req->Designation;
            $Doctor->Department =  $req->Department;
            $Doctor->Address =  $req->Address;
            $Doctor->Specialist =  $req->Specialist;
            $Doctor->Mobile =  $req->Mobile;
            $Doctor->Image =  $imagePath;
            $Doctor->Bio =  $req->Bio;
            $Doctor->DOB =  $req->DOB;
            $Doctor->BGroup =  $req->BGroup;
            $Doctor->Sex =  $req->Sex;

            $result= $Doctor->save();

            if($result)
            {
                return "saved successfully";
            }
            else{
                return "enter proper value";
            }

        }
    }

    /**
     * Show the form for creating a new resource.
     */

    public function Dview()
    {
        $Dview=new Doctor;
        $result=$Dview->all();

        return $result;
    }
    public function create()
    {
        //

        return "hello i love u";
    }

    /**
     * Store a newly created resource in storage.
     */

     public function login(Request $req)
    {
        $user=Doctor::where('Email',$req->Email)->first();

        if($user === null)
        {
            return "register first";
        }

        else{

                if(Hash::check($req->Password, $user->Password))
                {
                    return "you are logged in successfully ".$user;
                }

                else{
                    return $req->Password."".$user->Password;
                }

            }

        
    }

    public function logout(){

        Auth::logout();
        return "You are logged in successfully";

    }
    public function store(Request $req)
    {
        //

        $res= $req->file("image")->store("apiDocs");

        return $res;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $find=Doctor::find($id);
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

        $imagePath = null; // Initialize imagePath as null
        
        if($req->hasFile('Image')) {
            // If the "Image" field has a file, store the file and get the file path
            $imagePath = $req->file('Image')->store("apiDocs");
        }

        $Password=Hash::make($req->Password);

        $find=Doctor::find($id);

        $find->FName = $req->FName;
        $find->LName =  $req->LName;
        $find->Email =  $req->Email;
        $find->Password =  $req->Password;
        $find->Designation =  $req->Designation;
        $find->Department =  $req->Department;
        $find->Address =  $req->Address;
        $find->Specialist =  $req->Specialist;
        $find->Mobile =  $req->Mobile;
        $find->Image =  $imagePath;
        $find->Bio =  $req->Bio;
        $find->DOB =  $req->DOB;
        $find->BGroup =  $req->BGroup;
        $find->Sex =  $req->Sex;

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

        $find=Doctor::find($id);

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


    public function count(){

        $count=Doctor::count('id');
        // $today=now()->format('Y-m-d');
        // $before=now()->subdays(5)->format('Y-m-d');

        return $count;
    }


    
}
