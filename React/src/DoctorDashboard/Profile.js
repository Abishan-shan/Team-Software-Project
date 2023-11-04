import { Col, Collapse, Nav, Row, Card, Button, Table } from "react-bootstrap";
import "../AdminDashboard/Dashboard.css";
import WidgetsIcon from "@mui/icons-material/Widgets";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DoctorDash.css";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [DoctorCount, setDoctorCount] = useState("");
  const [PatientCount, setPatientCount] = useState("");
  const [PatientNewCount, setPatientNewCount] = useState("");
  const [AppointmentCount, setAppointmentCount] = useState("");
  const [Appointments, setAppointments] = useState([]);
  const [NewPatients, setNewPatients] = useState([]);
  const [Doctors, setDoctors] = useState([]);
  const [receivedData, setReceivedData] = useState(false);
  const [data, setData] = useState({
    id:"",
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
    const profileData = JSON.parse(localStorage.getItem("myProfile"));
    const data = JSON.parse(localStorage.getItem("myData"));
    setData(profileData);
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
  }, []);

  const DashBoard = () => {
    navigate("/Doctor/Dash");
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

  const HandleChange = (e) => {
    const { name, value } = e.target;

    console.log(e.target.value);

    setData((list) => ({
      ...list,
      [name]: value,
    }));
  };

  const Onupdate = async (e) => {
    e.preventDefault();

    const dataS = {
      FName: data.FName,
      LName: data.LName,
      Email: data.Email,
      Department: data.Department,
      Address: data.Address,
      Mobile: data.Mobile,
    };

    console.log(dataS);

    const response = await fetch(
      "http://127.0.0.1:8001/api/ProfUpdate/"+data.id,
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
                onClick={DashBoard}
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
                onClick={() => {
                  console.log("");
                }}
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
            <Col lg={9} sm={12}>
              <div style={{ marginTop: "90px", marginLeft: "100px" }}>
                <div class="container">
                  <div class="main-body">
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="card11" style={{ height: "24.5em" }}>
                          <div class="card-body">
                            <div class="d-flex flex-column align-items-center text-center">
                              <img
                                src={
                                  "http://127.0.0.1:8001/storage/" + data.Image
                                }
                                alt="Admin"
                                class="rounded-circle p-1 bg-primary"
                                width="110"
                              />
                              <div class="mt-3">
                                <h4>
                                  {data.FName} {data.LName}
                                </h4>
                                <p class="text-secondary mb-1">
                                  {data.Designation}
                                </p>
                                <p class="text-muted font-size-sm">
                                  {data.Address}
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
                                  value={data.FName}
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
                                  value={data.LName}
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
                                  value={data.Email}
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
                                  value={data.Mobile}
                                  name="Mobile"
                                  onChange={HandleChange}
                                />
                              </div>
                            </div>
                            <div class="row mb-3">
                              <div class="col-sm-3">
                                <h6 class="mb-0">Department</h6>
                              </div>
                              <div class="col-sm-9 text-secondary">
                                <input
                                  type="text"
                                  class="form-control"
                                  value={data.Department}
                                  name="Department"
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
                                  value={data.Address}
                                  name="Address"
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
        </Col>
      </Row>
    </>
  );
};

export default Profile;
