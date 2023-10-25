import "./App.css";
import DashBoard from "./AdminDashboard/Dashboard";
import AddDoctor from "./AdminDashboard/Doctor/AddDoctor";
import DoctorList from "./AdminDashboard/Doctor/DoctorList";
import { Routes,Route } from "react-router-dom";
import AddPatient from "./AdminDashboard/Patient/AddPatient";
import AddDepartment from "./AdminDashboard/Department/AddDepartment";
import AddShedule from "./AdminDashboard/DoctorShedule/AddShedule";
import AddAppointment from "./AdminDashboard/Appointment/AddAppointment"
import AddPayment from "./AdminDashboard/Payment/AddPayment";
import PatientList from "./AdminDashboard/Patient/PatientList";
import DepartmentList from "./AdminDashboard/Department/DepartmentList";
import SheduleList from "./AdminDashboard/DoctorShedule/SheduleList";
import AppointmentList from "./AdminDashboard/Appointment/AppontmentList";
import PaymentList from "./AdminDashboard/Payment/PayementList";
import AddPrescription from "./AdminDashboard/Prescription/AddPrescription";
import PrescriptionList from "./AdminDashboard/Prescription/PrescriptionList";
import Login from "./Home/Login"
import Home from "./Home/FirstPage"




function App() {
  
  return(
      <Routes>
        <Route path="/adminDashboard" element={<DashBoard />} />
        <Route path="/doctor/addDoctor" element={<AddDoctor />}/>
        <Route path="/doctor/doctorList" element={<DoctorList />}/>
        <Route path="/patient/addPatient" element={<AddPatient />}/>
        <Route path="/patient/PatientList" element={<PatientList/>}/>
        <Route path="/department/addDepartment" element={<AddDepartment />}/>
        <Route path="/department/departmentList" element={<DepartmentList />}/>
        <Route path="/doctorshedule/AddShedule" element={<AddShedule />}/>
        <Route path="/doctorshedule/SheduleList" element={<SheduleList />}/>
        <Route path="/appointment/AddAppointment" element={<AddAppointment />}/>
        <Route path="/appointment/AppointmentList" element={<AppointmentList />}/>
        <Route path="/payment/AddPayment" element={<AddPayment />}/>
        <Route path="/hello" element={<PaymentList />}/>
        <Route path="/prescription/AddPrescription" element={<AddPrescription />}/>
        <Route path="/prescription/PrescriptionList" element={<PrescriptionList />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Home />}/>
        
        
      </Routes>
  )
}

export default App;
