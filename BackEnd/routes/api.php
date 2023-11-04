<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AddDepartment;
use App\Http\Controllers\AddSchedule;
use App\Http\Controllers\AddPayment;
use App\Http\Controllers\AddAppointment;
use App\Http\Controllers\AddPrescription;
use App\Http\Controllers\AddPatient;
use App\Http\Controllers\AddDoctor;
use App\Http\Controllers\LoginAll;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//addDepartment
Route::post("/addDepartment",[AddDepartment::class,'index']);
Route::get("/DepView",[AddDepartment::class,'Dview']);
Route::delete("/Depdelete/{id}",[AddDepartment::class,'destroy']);
Route::put("/Depupdate/{id}",[AddDepartment::class,'update']);
Route::get("/Depedit/{id}",[AddDepartment::class,'show']);

//addschedule
Route::post("/addSchedule",[AddSchedule::class,'index']);
Route::get("/Sview",[AddSchedule::class,'view']);
Route::put("/Schupdate/{id}",[AddSchedule::class,'update']);
Route::get("/Schedit/{id}",[AddSchedule::class,'show']);
Route::delete("/Schdelete/{id}",[AddSchedule::class,'destroy']);
Route::get("/showSchedule/{id}",[AddSchedule::class,'showSchedule']);
Route::put("/ScheduleUpdate/{id}",[AddSchedule::class,'ScheduleUpdate']);



//addPayment
Route::post("/addPayment",[AddPayment::class,'index']);
Route::get("/Payview",[AddPayment::class,'Pview']);
Route::delete("/Paydelete/{id}",[AddPayment::class,'destroy']);
Route::put("/Payupdate/{id}",[AddPayment::class,'update']);
Route::get("/Payedit/{id}",[AddPayment::class,'show']);
Route::get("/TotalPayment",[AddPayment::class,'TotalPayment']);

//addAppointment
Route::post("/appointment",[AddAppointment::class,'index']);
Route::get("/Aview",[AddAppointment::class,'Aview']);
Route::get("/APview/{id}",[AddAppointment::class,'APview']);
Route::get("/APDview/{id}",[AddAppointment::class,'APDview']);
Route::delete("/Appdelete/{id}",[AddAppointment::class,'destroy']);
Route::put("/Appupdate/{id}",[AddAppointment::class,'update']);
Route::get("/Appedit/{id}",[AddAppointment::class,'show']);
Route::get("/AppCount",[AddAppointment::class,'count']);
Route::get("/AppAdd",[AddAppointment::class,'UpAppointment']);
Route::get("/PatientCount/{DocName}",[AddAppointment::class,'Patcount']);
Route::get("/PatcountToday/{DocName}",[AddAppointment::class,'PatcountToday']);
Route::get("/TotalApp/{DocName}",[AddAppointment::class,'TotalApp']);
Route::get("/DocPatients/{DocName}",[AddAppointment::class,'DocPatients']);
Route::get("/appointmentAll/{DocName}",[AddAppointment::class,'appointmentAll']);
Route::get("/appointmentDoc/{DocName}",[AddAppointment::class,'appointmentDoc']);
Route::get("/getPatientAppointmentsCount/{patientID}", [AddAppointment::class, 'getPatientAppointmentsCount']);


//addPrescriptions
Route::post("/addPrescription",[AddPrescription::class,'index']);
Route::get("/Pview",[AddPrescription::class,'Pview']);
Route::get("/PPview/{id}",[AddPrescription::class,'PPview']);
Route::delete("/Predelete/{id}",[AddPrescription::class,'destroy']);
Route::put("/Preupdate/{id}",[AddPrescription::class,'update']);
Route::get("/Preedit/{id}",[AddPrescription::class,'show']);

//addPatient
Route::post("/patient",[AddPatient::class,'index']);
Route::get("/Patview",[AddPatient::class,'Pview']);
Route::delete("/Pdelete/{id}",[AddPatient::class,'destroy']);
Route::put("/Patupdate/{id}",[AddPatient::class,'update']);
Route::post("/updatePro/{id}",[AddPatient::class,'updatePro']);
Route::get("/Patedit/{id}",[AddPatient::class,'show']);
Route::post("/Patlogin",[AddPatient::class,'login']);
Route::post("/Patlogout",[AddPatient::class,'logout']);
Route::get("/PatCount",[AddPatient::class,'count']);
Route::get("/PatNewcount",[AddPatient::class,'Newcount']);
Route::get("/PatNew",[AddPatient::class,'NewPatients']);
Route::get("/getPatientData/{id}", [AddPatient::class,'getPatientData']);




//addDoctor
Route::post("/Doctor",[AddDoctor::class,'index']);
Route::get("/Dview",[AddDoctor::class,'Dview']);
Route::post("/Doctored",[AddDoctor::class,'store']);
Route::delete("/Ddelete/{id}",[AddDoctor::class,'destroy']);
Route::put("/Docupdate/{id}",[AddDoctor::class,'update']);
Route::get("/Docedit/{id}",[AddDoctor::class,'show']);
Route::post("/Doclogin",[AddDoctor::class,'login']);
Route::post("/Doclogout",[AddDoctor::class,'logout']);
Route::get("/DocCount",[AddDoctor::class,'count']);
Route::get("/DoctorId",[AddDoctor::class,'DoctorId']);
Route::put("/ProfUpdate/{id}",[AddDoctor::class,'ProfUpdate']);



//login

Route::post("/loginAll",[LoginAll::class,'login']);
Route::get("/index",[EnterPage::class,'index']);


// Route::group(['middleware' => ['auth:patient']], function () {
//     // Your protected routes here
// });
