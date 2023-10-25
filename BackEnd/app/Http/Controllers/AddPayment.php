<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use Validator;

class AddPayment extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        //

        $rules=array(
            "PatientId" => "required",
            "AccountName" => "required",
            "Date" => "required",
            "TotalAmount"=> "required",
            "PaymentMode"=> "required",
            "PaymentStatus"=> "required",
            "Description"=> "required",
            "Sex"=> "required"
        );

        $validator= Validator::make($req->all(),$rules);

        if($validator->fails())
        {
            return response()->json($validator->errors(),401);
        }

        else
        {
            $Payment=new Payment;

            $Payment->PatientId = $req->PatientId;
            $Payment->AccountName = $req->AccountName;
            $Payment->Date = $req->Date;
            $Payment->TotalAmount=$req->TotalAmount;
            $Payment->PaymentMode = $req->PaymentMode;
            $Payment->PaymentStatus = $req->PaymentStatus;
            $Payment->Description = $req->Description;
            $Payment->Sex = $req->Sex;

            $result=$Payment->save();

            if($result)
            {
                return "saved successfully";
            }

        }
    }

    /**
     * Show the form for creating a new resource.
     */

    public function Pview()
    {
        $Pview=new Payment;
        $result=$Pview->all();

        return $result;
    }
    public function create()
    {
        //
        return "created";
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

        $find=Payment::find($id);
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

        $find=Payment::find($id);

            $find->PatientId = $req->PatientId;
            $find->AccountName = $req->AccountName;
            $find->Date = $req->Date;
            $find->TotalAmount=$req->TotalAmount;
            $find->PaymentMode = $req->PaymentMode;
            $find->PaymentStatus = $req->PaymentStatus;
            $find->Description = $req->Description;
            $find->Sex = $req->Sex;
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

        $find=Payment::find($id);

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

    public function TotalPayment(){

        $Total=Payment::where("PaymentStatus","complete")->sum('TotalAmount');


        return $Total;
    }
}
