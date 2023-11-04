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

const Schedule = () => {
  const navigate = useNavigate();
  
  const [receivedData, setReceivedData] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [STime, setSTime] = useState("");
  const [ETime, setEtime] = useState("");
  const [Cancel, setCancel] = useState(false);
  const [data, setData] = useState({
    id: "",
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
    setData(profileData);
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
  }, []);

  useEffect(() => {
    getSchedule();
  }, [data]);

  const getSchedule = async () => {
    const response = await fetch(
      "http://127.0.0.1:8001/api/showSchedule/" + data.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await response.json();

    if (response.status === 200) {
      console.log(res);

      // const timeSlot = res.time.split("-");
      // const Stime = timeSlot[0];
      // const Etime = timeSlot[1];

      // setSTime(Stime);
      // setEtime(Etime);
      setSchedule(res);
    } else {
      console.log("error");
    }
  };

  const Profile = () => {
    navigate("/Doctor/Profile");
  };

  const Appointment = () => {
    navigate("/Doctor/Appointment");
  };

  const DashBoard = () => {
    navigate("/Doctor/Dash");
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

  const onCancel = async (id) => {
    const data = {
      status: "InActive",
    };
    //console.log(id);
    const response = await fetch(
      "http://127.0.0.1:8001/api/ScheduleUpdate/" + id,
      {
        method: "PUT",
        body: JSON.stringify(data),
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
      getSchedule();

    }
  };

  const onAccept = async (id) => {
    const data = {
      status: "Active",
    };
    //console.log(id);
    const response = await fetch(
      "http://127.0.0.1:8001/api/ScheduleUpdate/" + id,
      {
        method: "PUT",
        body: JSON.stringify(data),
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
      getSchedule();
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
                onClick={() => {
                  console.log("hi");
                }}
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
          <Col lg={6} sm={12}>
            <Card
              className="table1"
              style={{
                boxShadow: "0px 0px 10px 0px",
                width: "950px",
                marginTop: "10vh",
              }}
            >
              <Card.Header className="cardHeader" style={{ padding: "20px" }}>
                Schedule
              </Card.Header>
              <Card.Body className="ScrollViewPatienList">
                <Table responsive="sm" hover>
                  <thead>
                    <th>Day</th>
                    <th>Start time</th>
                    <th>End Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    {data &&
                      schedule.map((item, index) => {
                        const timeSlot = item.time.split("-");
                        const Stime = timeSlot[0];
                        const Etime = timeSlot[1];

                        return (
                          <tr key={index}>
                            <td>{item.day}</td>
                            <td>{Stime}</td>
                            <td>{Etime}</td>
                            <td>{item.status}</td>
                            <td>
                              {item.status === "Active" ? (
                                <p className="Dr" style={{ color: "blue" }}>
                                  Accepted
                                </p>
                              ) : item.status === "InActive" ? (
                                <p className="Dr" style={{ color: "red" }}>
                                  Rejected
                                </p>
                              ) : (
                                <>
                                  <Button
                                    variant="primary"
                                    onClick={() => onAccept(item.id)}
                                    className="me-2"
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    variant="danger"
                                    onClick={() => onCancel(item.id)}
                                  >
                                    Cancel
                                  </Button>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Col>
      </Row>
    </>
  );
};

export default Schedule;
