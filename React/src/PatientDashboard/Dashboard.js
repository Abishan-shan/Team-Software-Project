import { Col, Collapse, Nav, Row, Card, Button, Table } from "react-bootstrap";
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
import { useEffect, useState } from "react";
import { useNavigate, useParams, useHistory } from 'react-router-dom';

const DashBoard = () => {
  const navigate = useNavigate();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);
  const [DoctorCount, setDoctorCount] = useState("");
  const [PatientCount, setPatientCount] = useState("");
  const [PatientNewCount, setPatientNewCount] = useState("");
  const [AppointmentCount, setAppointmentCount] = useState("");
  const [Appointments, setAppointments] = useState([]);
  const [NewPatients, setNewPatients] = useState([]);
  const [Doctors, setDoctors] = useState([]);
  const [Total, setTotal] = useState();
  const [data, setData] = useState([]);

  const [patientData, setPatientData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const patientID = localStorage.getItem('patientid');

  const [formData, setFormData] = useState({
    FName: "",
    LName: "",
    Email: "",
    Address: "",
    Image: null,
  });

  const logout = () => {
    localStorage.removeItem('patientid');
    navigate('/');
  }

  useEffect(() => {
    getPatientData()
    getData();

  }, []);

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

  const AddAppointment = () => {
    navigate('/appointPatient')
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

  const getDoctors = async () => {
    const response = await fetch("http://127.0.0.1:8001/api/Dview", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const res = await response.json();

    if (!response.ok) {
      console.log("Error");
    } else {
      setDoctors(res);
    }
  }

  const updateProfile = async () => {
    const response = await fetch(`http://127.0.0.1:8001/api/updatePro/${patientID}`, {
      method: "POST",
	  body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
     
    });

    if (response.ok) {
      toggleEditMode();
      getPatientData(); // Update patientData after the profile is updated
    } else {
      console.error("Profile update failed.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  return (
    <>
      <Row className="mt-1 row">
        <Col sm={5} xxs={2} xs={6} lg={3} md={4} xl={3} xxl={2} className="bar">
          <div>
            <p className="title">Health care</p>
          </div>

          <Nav className="flex-column" defaultActiveKey={"#home"}>
            <Nav.Item>
              <Nav.Link
                href="#home"
                className="home text-light"
                aria-controls="bar-home"
                onClick={() => {
                  setOpen1(false);
                  setOpen2(false);
                  setOpen3(false);
                  setOpen4(false);
                  setOpen5(false);
                  setOpen6(false);
                  setOpen7(false);
                  setOpen8(!open8);
                }}
              >
                <WidgetsIcon className="Icon" />
                Dashboard
                <ArrowDropDownIcon className="Icon1" />
              </Nav.Link>
              <Collapse in={open8} id="bar-doctor" className="navItem">
                <Card>
                  <Card.Body>
                    <Button variant="light" onClick={AddHome} style={{ marginLeft: "3vw" }}>MedBoard</Button>
                  </Card.Body>
                </Card>
              </Collapse>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#doctor"
                className="home text-light"
                aria-controls="bar-doctor"
                onClick={() => {
                  setOpen1(!open1);
                  setOpen2(false);
                  setOpen3(false);
                  setOpen4(false);
                  setOpen5(false);
                  setOpen6(false);
                  setOpen7(false);
                }}
              >
                <LocalHospitalIcon className="Icon" />
                Doctor
                <ArrowDropDownIcon className="Icon2" />
              </Nav.Link>
              <Collapse in={open1} id="bar-doctor" className="navItem">
                <Card>
                  <Card.Body>
                    <Button variant="light" onClick={DoctorList}>Doctor List</Button>
                  </Card.Body>
                </Card>
              </Collapse>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#doctorSchedule"
                className="home text-light"
                aria-controls="bar-schedule"
                onClick={() => {
                  setOpen4(!open4);
                  setOpen2(false);
                  setOpen3(false);
                  setOpen1(false);
                  setOpen5(false);
                  setOpen6(false);
                  setOpen7(false);
                }}
              >
                <EventAvailableIcon className="Icon" />
                Doctor Schedule
                <ArrowDropDownIcon className="Icon5" />
              </Nav.Link>
              <Collapse in={open4} id="bar-shedule" className="navItem">
                <Card>
                  <Card.Body>
                    <Button variant="light" style={{ fontSize: "11px" }} onClick={SheduleList}>
                      Schedule List
                    </Button>
                  </Card.Body>
                </Card>
              </Collapse>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#prescription"
                className="home text-light"
                aria-controls="bar-prescription"
                onClick={() => {
                  setOpen5(!open5);
                  setOpen2(false);
                  setOpen3(false);
                  setOpen4(false);
                  setOpen1(false);
                  setOpen6(false);
                  setOpen7(false);
                }}
              >
                <MedicationIcon className="Icon" />
                Prescription
                <ArrowDropDownIcon className="Icon6" />
              </Nav.Link>
              <Collapse in={open5} id="bar-prescription" className="navItem">
                <Card>
                  <Card.Body>
                    <Button variant="light" style={{ fontSize: "11px" }} onClick={PrescriptionList}>
                      Prescription List
                    </Button>
                  </Card.Body>
                </Card>
              </Collapse>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#appointment"
                className="home text-light"
                aria-controls="bar-appointment"
                onClick={() => {
                  setOpen6(!open6);
                  setOpen2(false);
                  setOpen3(false);
                  setOpen4(false);
                  setOpen5(false);
                  setOpen1(false);
                  setOpen7(false);
                }}
              >
                <AssignmentTurnedInIcon className="Icon" />
                Appointment
                <ArrowDropDownIcon className="Icon7" />
              </Nav.Link>
              <Collapse in={open6} id="bar-appointment" className="navItem">
                <Card>
                  <Card.Body>
                    <Button variant="light" style={{ fontSize: "10px" }} onClick={AddAppointment}>
                      Add Appointment
                    </Button>
                    <Button variant="light" style={{ fontSize: "10px" }} onClick={AppointmentList}>
                      Appointment List
                    </Button>
                  </Card.Body>
                </Card>
              </Collapse>
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
          <Card className="patientProfileCard">
            <button className="logoutButton" onClick={logout}>
              Logout
            </button>
            <div className="profileContent">
              <div className="profileDetails">
                <h1 className="profileTitle">Patient Profile</h1>
                {editMode ? (
                  <form className="profileEditForm">
                    <label>
                      First Name
                      <input
                        type="text"
                        name="FName"
                        value={formData.FName}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Last Name
                      <input
                        type="text"
                        name="LName"
                        value={formData.LName}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Email
                      <input
                        type="text"
                        name="Email"
                        value={formData.Email}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Address
                      <input
                        type="text"
                        name="Address"
                        value={formData.Address}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Profile Photo
                      <input
                        type="file"
                        name="Image"
                        accept="image/*"
                        onChange={handleInputChange}
                      />
                    </label>
                    <div>
                      <button onClick={updateProfile} className="btn btn-primary">
                        Save
                      </button><br/><br/>
                    </div>
                  </form>
                ) : (
                  <div>
                    <p className="profileInfo">Id: {patientData.id}</p>
                    <p className="profileInfo">Name: {patientData.FName} {patientData.LName}</p>
                    <p className="profileInfo">Email: {patientData.Email}</p>
                    <p className="profileInfo">Address: {patientData.Address}</p>
                  </div>
                )}
                <div>
                  <button onClick={toggleEditMode} className="btn btn-primary">
                    {editMode ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
              </div>
              <div className="profileImageContainer">
                <img
                  id="profileImage"
                  src={"http://127.0.0.1:8001/storage/" + (formData.Image || patientData.Image)}
                  alt="Patient"
                  className="profileImage"
                />
              </div>
            </div>
          </Card>
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
        </Col>
      </Row>
    </>
  );
};

export default DashBoard;
