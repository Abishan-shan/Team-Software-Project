import { Col, Collapse, Nav, Row, Card, Button, Table } from "react-bootstrap";
import "./Dashboard.css";
import "./DoctorList.css";
import WidgetsIcon from "@mui/icons-material/Widgets";
import PersonIcon from "@mui/icons-material/Person";
import LanIcon from "@mui/icons-material/Lan";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MedicationIcon from "@mui/icons-material/Medication";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const DoctorList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [patientID, setPatientId] = useState("");
  const [Pdata, setPData] = useState({
    Address: "",
    BGroup: "",
    DOB: "",
    Email: "",
    FName: "",
    History:"",
    Image: "",
    LName: "",
    MStatus: "",
    Mobile: "",
    Occupation: "",
    id:"",
    Sex:"",
  });

  const baseUrl = "http://127.0.0.1:8001";

  useEffect(() => {
    getData();
    console.log(data);
  }, [patientID]);

   const AddHome = () =>{

    navigate('/patientDashbord');
}

  const DoctorList = () =>{
    navigate('/doctorslist');
  }


  useEffect(() => {
    const patientID = localStorage.getItem('patientid');
 
     if(patientID != null)
     {
       setPatientId(patientID);
     }
     else{
       navigate("/login");
     }
 
 
     const profileData = JSON.parse(localStorage.getItem("myProfile"));
     setPData(profileData);
 
 
   }, []);
  
  const Logout = () => {
    localStorage.removeItem('patientid');
    localStorage.removeItem('myProfile');
    navigate('/');
  }
  

  const AddAppointment = () =>{
    navigate('/appointPatient')
  }

  const AppointmentList = () =>{
    navigate('/appoinmentslist')
  }

  

  const SheduleList = ()=>{
    navigate("/Doctorscheduleslist");
  }

  

  const PrescriptionList = ()=>{
    navigate("/priscriptionslist");
  }

  const getData = async () => {
    const response = await fetch("http://127.0.0.1:8001/api/Dview", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    //console.log(res);
    setData(res);
    //console.log(data);
  };

  return (
    <>
      <Row className="mt-1 row ">
        <Col sm={5} xxs={2} xs={6} lg={3} md={4} xl={3} xxl={2} className="bar">
          <div>
            <p className="title"> Health care</p>
          </div>

          <div className="profDet">
            <img
              src={"http://127.0.0.1:8001/storage/" + Pdata.Image}
              alt="Admin"
              className="rounded-circle p-1 bg-primary profile"
              width="150"
            />

        {Pdata && (
              <p className="Dr">
                {Pdata.FName} {Pdata.LName}
              </p>
            )}
            <p className="line"></p>
          </div>



          <Nav className="flex-column" defaultActiveKey={"#home"}>
            <Nav.Item>
              <Nav.Link
                href="#home"
                className={`home text-light nav-link-hover`}
                aria-controls="bar-home"
                onClick={AddHome}
              >
                <WidgetsIcon className="Icon" />
                Dashboard
               
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#doctor"
                className={`home text-light nav-link-hover`}
                aria-controls="bar-doctor"
                
                  onClick={DoctorList}
                
              >
                <LocalHospitalIcon className="Icon" />
                Doctor
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#doctorSchedule"
                className={`home text-light nav-link-hover`}
                aria-controls="bar-schedule"
               
                  onClick={SheduleList}
               
              >
                <EventAvailableIcon className="Icon" />
                Doctor Schedule
              </Nav.Link>
        
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#prescription"
                className={`home text-light nav-link-hover`}
                aria-controls="bar-prescription"
                onClick={PrescriptionList}
              >
                <MedicationIcon className="Icon" />
                Prescription
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#appointment"
                className={`home text-light nav-link-hover`}
                aria-controls="bar-appointment"
                onClick={AppointmentList}
              >
                <AssignmentTurnedInIcon className="Icon" />
                Appointment
              </Nav.Link>
      
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#payement"
                className={`home text-light nav-link-hover`}
                aria-controls="bar-payment"
                onClick={Logout}
              >
                <LogoutIcon className="Icon" />
                Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col className="DoctorList mt-2" xxs={10}>
          <Row>
            {data.map((item) => (
              <Col lg={4} sm={12} md={6}>
                <Card className="mb-4 ImageHead">
                  <Card.Body key={item.id} className="textImage">
                    <img
                      src={"http://127.0.0.1:8001/storage/"+item.Image}
                      alt={`Image for ${item.FName} ${item.LName}`}
                      className="Image"
                    />
                    <Card.Text className="Image1 Image2">
                      {item.FName} {item.LName}
                    </Card.Text>
                    <Card.Text className="Image1 ">{item.Department}</Card.Text>
                    <Card.Text className="Image1 ">{item.Address}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

         
        </Col>
      </Row>
    </>
  );
};

export default DoctorList;
