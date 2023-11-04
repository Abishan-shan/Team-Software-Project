<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;
use Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AddPatient extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        //

        //Log::info('Received FormData:', $request->all());

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
            "PreferTo"=> "required",
            "MStatus"=>"required",
            "Address"=>"required",
            "Occupation"=>"required",
            "Mobile"=>"required",
            'Image' => 'required|image|mimes:jpeg,png,jpg,gif', // Adjust the max file size limit as needed (in kilobytes).

            "History"=>"required",
            "DOB"=>"required",
            "BGroup"=>"required",
            "Sex"=>"required",
            
        );

        $validator= Validator::make($req->all(),$rules);

        if($validator->fails())
        {
            return response()->json($validator->errors(),401);
        }

        else{

            $password=  Hash::make($req->Password);

        
            
        $patient = new Patient;
        $patient->FName = $req->FName;
        $patient->LName = $req->LName;
        $patient->Email = $req->Email;
        $patient->Password = $password;
        $patient->PreferTo = $req->PreferTo;
        $patient->MStatus = $req->MStatus;
        $patient->Address = $req->Address;
        $patient->Occupation = $req->Occupation;
        $patient->Mobile = $req->Mobile;
        $patient->Image = $imagePath;
        $patient->History = $req->History;
        $patient->DOB = $req->DOB;
        $patient->BGroup = $req->BGroup;
        $patient->Sex = $req->Sex;

            $result= $patient->save();

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

    public function login(Request $req)
    {
        $user=Patient::where('Email',$req->Email)->first();

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



        // $credentials = $req->only('Email', 'Password');

        //         if (Auth::attempt($credentials)) {
        //             return "You are logged in successfully";
        //         } 
        //         else {
        //             return $credentials;
        //         }

        // $validator=$req->validate([
        //     "Email" =>['required'],
        //     "Password"=>['required']
        // ]);

        // if(Auth::attempt($validator))
        // {
        //     //$user=Auth::user();
        //     return response()->json("successfully login");
        // }

        // else{
        //     //$user=Auth::user();

        //     return response()->json("you are not login yet",$validator->Email);

        // }

        
    }

    public function logout(){

        Auth::logout();
        return "You are logged out in successfully";

    }

     public function Pview()
     {
        $Pview=new Patient;
        $result=$Pview->all();

        return $result;
     }
    public function create()
    {
        //
        return "hello patient";
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
        $find=Patient::find($id);
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


        $find = new Patient;
        $find->FName = $req->FName;
        $find->LName = $req->LName;
        $find->Email = $req->Email;
        $find->Password = $req->Password;
        $find->PreferTo = $req->PreferTo;
        $find->MStatus = $req->MStatus;
        $find->Address = $req->Address;
        $find->Occupation = $req->Occupation;
        $find->Mobile = $req->Mobile;
        $find->Image = $imagePath;
        $find->History = $req->History;
        $find->DOB = $req->DOB;
        $find->BGroup = $req->BGroup;
        $find->Sex = $req->Sex;

            

        $result= $find->save();

        if($result)
        {
            return "updated successfully";
        }
    }

    /**
     * Remove the specified resource from storage.
     */
	 
	 public function updatepro(Request $req, string $id)
	{
		// Find the patient by ID
		$patient = Patient::find($id);

		if (!$patient) {
			return response()->json(['message' => 'Patient not found'], 404);
		}

		// Update specific fields
		$patient->FName = $req->FName;
		$patient->LName = $req->LName;
		$patient->Email = $req->Email;
		$patient->Address = $req->Address;

		if ($req->hasFile('Image')) {
			// If the "Image" field has a file, store the file and get the file path
			$imagePath = $req->file('Image')->store("apiDocs");
			$patient->Image = $imagePath;
		}

		// Save the changes to the database
		$result = $patient->save();

		if ($result) {
			return "Updated successfully";
		} else {
			return "Error updating patient";
		}
	}

    public function destroy(string $id)
    {
            $find=Patient::find($id);

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

        $count=Patient::count('id');
        // $today=now()->format('Y-m-d');
        // $before=now()->subdays(5)->format('Y-m-d');

        return $count;
    }


    public function Newcount(){

        $today=now()->format('Y-m-d');
        $before=now()->subdays(5)->format('Y-m-d');

        $count=Patient::whereBetween('created_at',[$before,$today])->count();
        

        return $count;
    }

    public function NewPatients(){
        $today=now()->format('Y-m-d');
        $before=now()->subdays(6)->format('Y-m-d');

        $count=Patient::whereBetween('created_at',[$before,$today])->get();
        

        return $count;

    }
	public function getPatientData(string $patientID)
	{
		$patient = Patient::find($patientID);

		if (!$patient) {
			return response()->json(['message' => 'Patient not found'], 404);
		}

		return response()->json($patient);
	}


    public function PatientProfUpdate(string $id,Request $req)
    {
            $find=Patient::find($id);

            $find->FName=$req->FName;
            $find->LName=$req->LName;
            $find->Email= $req->Email;
            $find->DOB= $req->DOB;
            $find->Address= $req->Address;
            $find->Mobile= $req->Mobile;

            $result=$find->save();
            
            if($result)
            {
                return "updated successfully";
            }
    }

	
		

}
