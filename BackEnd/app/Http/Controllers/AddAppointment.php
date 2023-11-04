<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Patient;
use Validator;
use Symfony\Component\HttpFoundation\JsonResponse;

use Auth;

class AddAppointment extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        //

        
        $rules=array(
            "FirstName" => "required",
            "LastName" => "required",
            "Email" => "required|email",
            "PatientId"=> "required",
            "Time"=>"required",
            "AppointmentWith"=>"required",
            "Date"=>"required",
            "Problem"=>"required",
            "Sex"=>"required"
        );

        $validator= Validator::make($req->all(),$rules);

        if($validator->fails())
        {
            return response()->json($validator->errors(),401);
        }

        else
        {
            
            $Appointment=new Appointment;
            
            $Appointment->FirstName = $req->FirstName;
            $Appointment->LastName =  $req->LastName;
            $Appointment->Email =  $req->Email;
            $Appointment->PatientId =  $req->PatientId;
            $Appointment->Time =  $req->Time;
            $Appointment->AppointmentWith =  $req->AppointmentWith;
            $Appointment->Date =  $req->Date;
            $Appointment->Problem =  $req->Problem;
            $Appointment->Sex =  $req->Sex;

            $result= $Appointment->save();

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

    public function Aview()
    {
        $Aview=new Appointment;
        $result=$Aview->all();


        return $result;
    }
	public function APview(string $patientID)
	{
		$appointments = Appointment::where('PatientId', $patientID)->get();

		if ($appointments->isEmpty()) {
			return response()->json(['message' => 'No appointments found for the given patient ID'], 404);
		}

		return response()->json($appointments);
	}
	
    
    public function create()
    {
        //
        return "Appointment";
    }

    /**
     * Store a newly created resource in storage.
     */
	 
	 public function APDview(string $patientID)
	{
		$today = now()->format('Y-m-d');
		$appointments = Appointment::where('PatientId', $patientID)
			->where('Date', '>=', $today)
			->get();

		if ($appointments->isEmpty()) {
			return response()->json(['message' => 'No appointments found for today and the future'], 404);
		}

		return response()->json($appointments);
	}
	
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
        $find=Appointment::find($id);
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

        $find=Appointment::find($id);

            
        $find->FirstName = $req->FirstName;
        $find->LastName =  $req->LastName;
        $find->Email =  $req->Email;
        $find->PatientId =  $req->PatientId;
        $find->Time =  $req->Time;
        $find->AppointmentWith =  $req->AppointmentWith;
        $find->Date =  $req->Date;
        $find->Problem =  $req->Problem;
        $find->Sex =  $req->Sex;

        $result= $find->save();

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

        $find=Appointment::find($id);

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

        $count=Appointment::count('id');
        // $today=now()->format('Y-m-d');
        // $before=now()->subdays(5)->format('Y-m-d');

        return $count;
    }


    
public function Patcount(string $DocName)
{
    $find = Appointment::where("AppointmentWith", $DocName)->get();
    $patientIds = $find->count('PatientId');

    return $patientIds;
}

public function TotalApp(string $DocName)
{
    $find = Appointment::where("AppointmentWith", $DocName)->get();
    $Appointment = $find->count('id');

    return $Appointment;
}


public function PatcountToday(string $DocName)
{
   
    $today=now()->format('Y-m-d');
    $after=now()->addDays(1)->format('Y-m-d');
    $find = Appointment::where("AppointmentWith", $DocName)->get();
    $c = $find->where("Date", $today);
    $patientIds = $c->count('PatientId');

    return $patientIds;
} 


public function DocPatients(string $DocName)
{

    $today=now()->format('Y-m-d');
    $after=now()->addDays(1)->format('Y-m-d');
    
    
   
    $appointments = Appointment::where("AppointmentWith", $DocName)->get();
    $App = $appointments->where("Date", $today);

    // Step 2: Extract Patient IDs and retrieve patient information
    $patientInfo = [];

    foreach ($App as $appointment) {
        $patientId = $appointment->PatientId;

        // Retrieve patient information based on the patient ID
        $patient = Patient::find($patientId);

        if ($patient) {
            $patientInfo[] = $patient;
        }
    }

    return $patientInfo;
} 

public function appointmentAll(string $DocName)
{
    $today=now()->format('Y-m-d');
    $after=now()->addDays(1)->format('Y-m-d');
    $find = Appointment::where("AppointmentWith", $DocName)->get();
    $App = $find->where("Date", $today);

    return  $App;
} 

public function appointmentDoc(string $DocName)
{
    $find = Appointment::where("AppointmentWith", $DocName)->get();
    
    return  $find;
} 


    public function UpAppointment(){

            $today=now()->format('Y-m-d');
            $after=now()->addDays(5)->format('Y-m-d');

            $count=Appointment::whereBetween('Date',[$today,$after])->get();

            return $count;
    }
	
	

}
