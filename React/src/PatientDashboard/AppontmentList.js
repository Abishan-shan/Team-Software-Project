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
import "./appointmentList.css";
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

const AppointmentList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showEdit, setShowedit] = useState(false);
  const [list, setList] = useState(true);
  const [Udata, setUdata] = useState([]);
  const [id, setId] = useState("");
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
  const [patientID, setPatientId] = useState("");

  useEffect(() => {
	  
    getData();
	
    console.log(data);
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

  

  

  const AddAppointment = () =>{
    navigate('/appointPatient')
  }

  const AppointmentList = () =>{
    navigate('/appoinmentslist')
  }
  const Logout = () => {
    localStorage.removeItem('patientid');
    navigate('/');
  }
  

  const SheduleList = ()=>{
    navigate("/Doctorscheduleslist");
  }

  

  const PrescriptionList = ()=>{
    navigate("/priscriptionslist");
  }


  const getData = async () => {
    const response = await fetch(`http://127.0.0.1:8001/api/APview/${patientID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    //console.log(res);
    setData(res);
    console.log(res);
  };

  const onDelete = async (id) => {
    console.log(id);

    const response = await fetch(`http://127.0.0.1:8001/api/Appdelete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.text();

    if (res === "successfully deleted") {
      console.log("deleted");
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } else {
      console.log("error");
    }
  };

  const onEdit = async (id) => {
    setShowedit(true);
    setList(false);
    

    const response = await fetch(`http://127.0.0.1:8001/api/Appedit/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();

    if (response.status === 200) {
      console.log(res);
      setUdata(res);
    } else {
      console.log("error");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    
    Udata.Date = Udata.Date.toString();
    console.log(Udata.Date);

    const response = await fetch("http://127.0.0.1:8001/api/Appupdate/"+id,{
      method: "PUT",
      body: JSON.stringify(Udata),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      throw new Error("enter proper data");
    }

    if (!response.ok) {
      throw new Error("Http failed with status", response.status);
    }

    const res = await response.text();
    console.log(res);

    if (res === "updated successfully") {
      setShowedit(false);
      setList(true);

      getData();
    }
  };

  


  const HandleChange = (e) => {
    const { name, value } = e.target;

    console.log(name);

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
              src={"http://127.0.0.1:8001/storage/"+Pdata.Image}
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
            <Col lg={6} sm={12}>
              <Card
                className="table1 mb-5 mt-5"
                style={{ boxShadow: "0px 0px 10px 0px", width: "950px" }}
              >
                <Card.Header className="cardHeader" style={{ padding: "20px" }}>
                  Appointment List
                </Card.Header>
                <Card.Body className="ScrollViewPatienList">
                  <Table responsive="sm" hover>
                    <thead>
                      <th>Patient Name</th>
                      <th>Email</th>
                      <th>Doctor Name</th>
                      <th>Time</th>
                      <th>Date</th>
                      <th>Disease</th>
                      {/* <th>Action</th> */}
                    </thead>
                    <tbody>
                      {Array.isArray(data) && data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.FirstName} {item.LastName}</td>
                          <td>{item.Email}</td>
                          <td>{item.AppointmentWith}</td>
                          <td>{item.Time}</td>
                          <td>{item.Date}</td>
                          <td>{item.Problem}</td>
                          {/* <td>
                            <Button
                              variant="danger"
                              onClick={() => onDelete(item.id)}
                            >
                              {" "}
                              delete{" "}
                            </Button>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Col>
        )}

        {/* this is edit page */}

        
      </Row>
    </>
  );
};

export default AppointmentList;
