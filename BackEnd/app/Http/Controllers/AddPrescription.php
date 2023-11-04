<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Prescription;
use Validator;

class AddPrescription extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        //

          
        $rules=array(
            "MName" => "required",
            "Dosage" => "required",
            "Frequency" => "required",
            "Prescriber" => "required",
            "PatientId"=> "required",
            "MDetails"=>"required",
            "SDate"=>"required",
            "EDate"=>"required",
            "Note"=>"required",
            
        );

        $validator= Validator::make($req->all(),$rules);

        if($validator->fails())
        {
            return response()->json($validator->errors(),401);
        }

        else
        {
            
            $Prescription=new Prescription;
            
            $Prescription->MName = $req->MName;
            $Prescription->Dosage =  $req->Dosage;
            $Prescription->Frequency =  $req->Frequency;
            $Prescription->Prescriber =  $req->Prescriber;
            $Prescription->PatientId =  $req->PatientId;
            $Prescription->MDetails =  $req->MDetails;
            $Prescription->SDate =  $req->SDate;
            $Prescription->EDate =  $req->EDate;
            $Prescription->Note =  $req->Note;

            $result= $Prescription->save();

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

    public function Pview()
    {
        $Pview=new Prescription;
        $result=$Pview->all();

        return $result;
    }
	
	public function PPview(string $patientID)
	{
		$prescriptions = Prescription::where('PatientId', $patientID)->get();

		if ($prescriptions->isEmpty()) {
			return response()->json(['message' => 'No prescriptions found for the given patient ID'], 404);
		}

		return response()->json($prescriptions);
	}

	
    public function create()
    {
        //
        return "hello bye to yiu";
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $result=$request->file('file')->store('apiDocs');

        return ["result"=> $result];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $find=Prescription::find($id);
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

        $find=Prescription::find($id);

        $find->MName = $req->MName;
        $find->Dosage =  $req->Dosage;
        $find->Frequency =  $req->Frequency;
        $find->Prescriber =  $req->Prescriber;
        $find->PatientId =  $req->PatientId;
        $find->MDetails =  $req->MDetails;
        $find->SDate =  $req->SDate;
        $find->EDate =  $req->EDate;
        $find->Note =  $req->Note;
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

        $find=Prescription::find($id);

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
