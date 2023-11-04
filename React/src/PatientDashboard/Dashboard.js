import { Col, Collapse, Nav, Row, Card, Button, Table } from "react-bootstrap";
import "./Dashboard.css";
import "./Edit.css";
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
import { useNavigate, useParams, useHistory } from 'react-router-dom';

const DashBoard = () => {
  const navigate = useNavigate();
  const [DoctorCount, setDoctorCount] = useState("");
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

  const [patientData, setPatientData] = useState([]);
 

  const Logout = () => {
    localStorage.removeItem('patientid');
    navigate('/');
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

  useEffect(() => {
    getPatientData()
    getData();

  }, [patientID]);

  const getPatientData = async () => {
    const response = await fetch(`http://127.0.0.1:8001/api/getPatientData/${patientID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    setPatientData(res);
  };

  const getData = async () => {
    const response = await fetch(`http://127.0.0.1:8001/api/APDview/${patientID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    setData(res);
  };

  const AddHome = () => {
    navigate('/patientDashbord');
  }

  const DoctorList = () => {
    navigate('/doctorslist');
  }

  const AppointmentList = () => {
    navigate('/appoinmentslist')
  }

  const SheduleList = () => {
    navigate("/Doctorscheduleslist");
  }

  const PrescriptionList = () => {
    navigate("/priscriptionslist");
  }

  const getDoctorNum = async () => {
    const response = await fetch("http://127.0.0.1:8001/api/DocCount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const res = await response.text();

    if (!response.ok) {
      console.log("Error");
    } else {
      setDoctorCount(res);
    }
  }

  const HandleChange = (e) => {
    const { name, value } = e.target;

    console.log(e.target.value);

    setPData((list) => ({
      ...list,
      [name]: value,
    }));
  };

  const Onupdate = async (e) => {
    e.preventDefault();

    const dataS = {
      FName: Pdata.FName,
      LName: Pdata.LName,
      Email: Pdata.Email,
      Address: Pdata.Address,
      Mobile: Pdata.Mobile,
      DOB: Pdata.DOB
    };

    console.log(dataS);

    const response = await fetch(
      "http://127.0.0.1:8001/api/profileUpdate/"+Pdata.id,
      {
        method: "PUT",
        body: JSON.stringify(dataS),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 401) {
      throw new Error("enter proper data");
    }

    if (!response.ok) {
      throw new Error("Http failed with status", response.status);
    }

    const res = await response.text();
    console.log(res);

    if (res === "updated successfully") {
      console.log("success");
      
    }
  };
  return (
    <>
      <Row className="mt-1 row">
        <Col sm={5} xxs={2} xs={6} lg={3} md={4} xl={3} xxl={2} className="bar">
          <div>
            <p className="title">Health care</p>
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
        
        
        <Col
          xxs={10}
          md={8}
          lg={9}
          xs={6}
          xl={9}
          xxl={10}
          sm={7}
          className="colScrollView"
        >
          <Row className="mt-5">
            <Col lg={9} sm={12}>
              <div style={{ marginTop: "40px", marginLeft: "75px" }}>
                <div class="container">
                  <div class="main-body">
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="card11" style={{ height: "24.5em" }}>
                          <div class="card-body">
                            <div class="d-flex flex-column align-items-center text-center">
                              <img
                                
                                  src={"http://127.0.0.1:8001/storage/"+Pdata.Image}
                              
                                alt="Admin"
                                class="rounded-circle p-1 bg-primary"
                                width="110"
                              />
                              <div class="mt-3">
                                <h4>
                                  {Pdata.FName} {Pdata.LName}
                                </h4>
                                <p class="text-secondary mb-1">
                                  {Pdata.Sex}
                                </p>
                                <p class="text-muted font-size-sm">
                                  {Pdata.Address}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-8">
                        <div class="card">
                          <div class="card-body">
                            <div class="row mb-3">
                              <div class="col-sm-3">
                                <h6 class="mb-0">First Name</h6>
                              </div>
                              <div class="col-sm-9 text-secondary">
                                <input
                                  type="text"
                                  class="form-control"
                                  value={Pdata.FName}
                                  name="FName"
                                  onChange={HandleChange}
                                />
                              </div>
                            </div>
                            <div class="row mb-3">
                              <div class="col-sm-3">
                                <h6 class="mb-0">Last Name</h6>
                              </div>
                              <div class="col-sm-9 text-secondary">
                                <input
                                  type="text"
                                  class="form-control"
                                  value={Pdata.LName}
                                  name="LName"
                                  onChange={HandleChange}
                                />
                              </div>
                            </div>
                            <div class="row mb-3">
                              <div class="col-sm-3">
                                <h6 class="mb-0">Email</h6>
                              </div>
                              <div class="col-sm-9 text-secondary">
                                <input
                                  type="text"
                                  class="form-control"
                                  value={Pdata.Email}
                                  name="Email"
                                  onChange={HandleChange}
                                />
                              </div>
                            </div>
                            <div class="row mb-3">
                              <div class="col-sm-3">
                                <h6 class="mb-0">Mobile</h6>
                              </div>
                              <div class="col-sm-9 text-secondary">
                                <input
                                  type="text"
                                  class="form-control"
                                  value={Pdata.Mobile}
                                  name="Mobile"
                                  onChange={HandleChange}
                                />
                              </div>
                            </div>
                            <div class="row mb-3">
                              <div class="col-sm-3">
                                <h6 class="mb-0">Address</h6>
                              </div>
                              <div class="col-sm-9 text-secondary">
                                <input
                                  type="text"
                                  class="form-control"
                                  value={Pdata.Address}
                                  name="Address"
                                  onChange={HandleChange}
                                />
                              </div>
                            </div>

                            <div class="row mb-3">
                              <div class="col-sm-3">
                                <h6 class="mb-0">DOB</h6>
                              </div>
                              <div class="col-sm-9 text-secondary">
                                <input
                                  type="text"
                                  class="form-control"
                                  value={Pdata.DOB}
                                  name="DOB"
                                  onChange={HandleChange}
                                />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-3"></div>
                              <div class="col-sm-9 text-secondary">
                                <input
                                  type="button"
                                  class="btn btn-primary px-4"
                                  value="Save Changes"
                                  onClick={Onupdate}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          
          
          
      <Row>   
          <Card className="table1 mb-5 mt-5" style={{ boxShadow: "0px 0px 5px 0px", width: "500px" }}>
            <Card.Header className="cardHeader" style={{ padding: "20px" }}>
              Your Upcoming Appointment
            </Card.Header>
            <Card.Body className="ScrollViewPatientList">
              {Array.isArray(data) &&
                data.map((item) => (
                  <Card key={item.id} className="small-appointment-card mb-3">
                    <Card.Body>
                      <h6>Date: {item.Date}</h6>
                      <p>Doctor: {item.AppointmentWith}</p>
                    </Card.Body>
                  </Card>
                ))}
            </Card.Body>
          </Card>
          </Row> 
        </Col>
      </Row>
    </>
  );
};

export default DashBoard;
