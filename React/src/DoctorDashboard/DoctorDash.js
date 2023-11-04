import { Col, Collapse, Nav, Row, Card, Button, Table } from "react-bootstrap";
import "../AdminDashboard/Dashboard.css";
import WidgetsIcon from "@mui/icons-material/Widgets";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./DoctorDash.css";

const DoctorDash = () => {
  const navigate = useNavigate();
  const [PatientCount, setPatientCount] = useState("");
  const [PatientNewCount, setPatientNewCount] = useState("");

  const [AllAppointments, setAllAppointments] = useState([]);

  const [Appointments, setAppointments] = useState([]);
  const [NewPatients, setNewPatients] = useState([]);
  const [receivedData, setReceivedData] = useState(false);
  const [data, setData] = useState({
    FName: "",
    LName: "",
    Email: "",
    Password: "",
    Designation: "",
    Department: "",
    Address: "",
    Specialist: "",
    Mobile: "",
    Image: "",
    Bio: "",
    DOB: "",
    BGroup: "",
    Sex: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("myData"));

    if (data != null) {
      if (new Date().getTime() < data.expiresAt) {
        setReceivedData(true);
        const value = data.value;
      } else {
        localStorage.removeItem("myData");
      }
    } else {
      navigate("/login");
    }

    const profileData = JSON.parse(localStorage.getItem("myProfile"));
    setData(profileData);
  }, []);

  useEffect(() => {
    getAllAppointment();
    getPatientCount();
    getAppointmentNum();
    getTodayPatient();
    getNewPatients();
  }, [data]);

  const Profile = () => {
    navigate("/Doctor/Profile");
  };

  const Appointment = () => {
    navigate("/Doctor/Appointment");
  };

  const Schedule = () => {
    navigate("/Doctor/Schedule");
  };

  const Logout = async () => {
    console.log("hello");

    const response = await fetch("http://127.0.0.1:8001/api/Patlogout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.text();
    console.log(response.status);

    if (!response.ok) {
      console.log("Error", response.status);
    }

    if (response.status == 200) {
      console.log("hi");
      localStorage.removeItem("myData");
      localStorage.removeItem("myProfile");
      navigate("/login");
    }
  };

  const getAllAppointment = async () => {
    const response = await fetch(
      "http://127.0.0.1:8001/api/appointmentAll/" + data.FName,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await response.json();
    console.log("i love u");
    console.log(res);
    console.log("bye");

    if (!response.ok) {
      console.log("Error");
    } else {
      setAllAppointments(res);
    }
  };

  const getPatientCount = async () => {
    const response = await fetch(
      "http://127.0.0.1:8001/api/PatientCount/" + data.FName,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await response.text();

    if (!response.ok) {
      console.log("Error");
    } else {
      if (res == "[]") {
        setPatientCount(0);
      }
      setPatientCount(res);
    }
  };

  const getTodayPatient = async () => {
    console.log(data.FName);

    const response = await fetch(
      "http://127.0.0.1:8001/api/PatcountToday/" + data.FName,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await response.text();
    console.log(res);

    if (!response.ok) {
      console.log("Error");
    } else {
      setPatientNewCount(res);
    }
  };

  const getNewPatients = async () => {
    const response = await fetch(
      "http://127.0.0.1:8001/api/DocPatients/" + data.FName,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await response.json();
    console.log(res);

    if (!response.ok) {
      console.log("Error");
    } else {
      setNewPatients(res);
    }
  };

  const getAppointmentNum = async () => {
    const response = await fetch(
      "http://127.0.0.1:8001/api/TotalApp/" + data.FName,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await response.text();
    console.log(res);

    if (!response.ok) {
      console.log("Error");
    } else {
      setAppointments(res);
    }
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
              src={"http://127.0.0.1:8001/storage/" + data.Image}
              alt="Admin"
              className="rounded-circle p-1 bg-primary profile"
              width="150"
            />

            {data && (
              <p className="Dr">
                DR.{data.FName} {data.LName}
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
                onClick={() => {
                  console.log("Dashboard");
                }}
              >
                <WidgetsIcon className="Icon" />
                DashBoard
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="#appointment"
                className={`home text-light nav-link-hover`}
                aria-controls="bar-appointment"
                onClick={Appointment}
              >
                <AssignmentTurnedInIcon className="Icon" />
                Appointments
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="#home"
                className={`home text-light nav-link-hover`}
                aria-controls="bar-home"
                onClick={Schedule}
              >
                <EventAvailableIcon className="Icon" />
                Schedule
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="#patient"
                className={`home text-light nav-link-hover`}
                id="patient"
                aria-controls="bar-patient"
                onClick={Profile}
              >
                <PersonIcon className="Icon" />
                Profile
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
            <Col lg={4} sm={12} md={6}>
              <Card className="customCard">
                <Card.Title>Total Patients</Card.Title>
                <Card.Body>{PatientCount}</Card.Body>
              </Card>
            </Col>

            <Col lg={4} sm={12} md={6}>
              <Card className="customCard">
                <Card.Title>Today Patients</Card.Title>
                <Card.Body>{PatientNewCount}</Card.Body>
              </Card>
            </Col>

            <Col lg={4} sm={12} md={6}>
              <Card className="customCard">
                <Card.Title>Total Appointments</Card.Title>
                <Card.Body>{Appointments}</Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={5} sm={12}>
              <Card
                className="table2"
                style={{ boxShadow: "0px 0px 10px 0px", width: "480px" }}
              >
                <Card.Header className="cardHeader" style={{ padding: "20px" }}>
                  New Patients
                </Card.Header>
                <Card.Body className="ScrollViewAppoint">
                  <Table hover>
                    <thead>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Disease</th>
                      <th>Mobile</th>
                    </thead>
                    <tbody>
                      
                      {NewPatients.map((item, index) => (
                        <tr key={index}>
                        <td>
                          {item.FName} {item.LName}
                        </td>
                        <td>{item.Address}</td>
                        <td>{item.PreferTo}</td>
                        <td>{item.Mobile}</td>
                      </tr>
                        ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5} sm={12}>
              <Card
                className="table3"
                style={{ boxShadow: "0px 0px 10px 0px", width: "600px" }}
              >
                <Card.Header className="cardHeader" style={{ padding: "20px" }}>
                  Today Appointment
                </Card.Header>
                <Card.Body className="ScrollViewAppoint">
                  <Table hover>
                    <thead>
                      <th>Patient</th>
                      <th>Time</th>
                      <th>Problem</th>
                    </thead>
                    <tbody>
                    {AllAppointments.map((appointment, index) => (
                      <tr key={index}>
                        <td>{appointment.FirstName} {appointment.LastName}</td>
                        <td>{appointment.Time}</td>
                        <td>{appointment.Problem}</td>
                      </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default DoctorDash;
