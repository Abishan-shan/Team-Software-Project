import {
  Col,
  Collapse,
  Nav,
  Row,
  Card,
  Button,
  Table,
  Form,
} from "react-bootstrap";
import "./prescriptionList.css";
import "./Dashboard.css";
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

const PrescriptionList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [Udata, setUdata] = useState([]);
  const [showEdit, setShowedit] = useState(false);
  const [list, setList] = useState(true);
  const [id, setId] = useState("");
  const [patientID, setPatientId] = useState("");
  const [Image,setImage]=useState([]);
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
  
  useEffect(() => {
    getData();
  }, [patientID]);


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
  

  

  const AddHome = () =>{

    navigate('/patientDashbord');
}

  const DoctorList = () =>{
    navigate('/doctorslist');
  }

  const Logout = () => {
    localStorage.removeItem('patientid');
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
    const response = await fetch(`http://127.0.0.1:8001/api/PPview/${patientID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    setData(res);
    console.log(res);
  };

  

  

  const HandleChange = (e) => {
    const { name, value } = e.target;

    setUdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  return (
    <>
      <Row className="mt-1 row">
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

        {list && (
          <Col
            xxl={10}
            xl={9}
            sm={7}
            xxs={10}
            xs={6}
            lg={9}
            md={8}
            className=" scroll"
          >
            <Col lg={6} sm={12} className="Plist">
              <Card
                className="table1"
                style={{
                  boxShadow: "0px 0px 10px 0px",
                  width: "1100px",
                  marginTop: "5vh",
                  marginBottom: "5vh",
                }}
              >
                <Card.Header className="cardHeader" style={{ padding: "20px" }}>
                  Prescription List
                </Card.Header>
                <Card.Body className="ScrollViewPatienList">
                  <Table responsive="sm" hover>
                    <thead>
                      <th>Patient Id</th>
                      <th>Medication Name</th>
                      <th>Dosage</th>
                      <th>Frequency</th>
                      <th>Prescriber</th>
                      <th>Medication Details</th>
                      <th>Start date</th>
                      <th>End date</th>
                      
                    </thead>
                    <tbody>
                      {Array.isArray(data) && data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.PatientId}</td>
                          <td>{item.MName}</td>
                          <td>{item.Dosage}</td>
                          <td>{item.Frequency}</td>
                          <td>{item.Prescriber}</td>
                          <td>{item.MDetails}</td>
                          <td>{item.SDate}</td>
                          <td>{item.EDate}</td>
                          
                          
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Col>
        )}

        
       
      </Row>
    </>
  );
};

export default PrescriptionList;
