import { Col, Collapse, Nav, Row, Card, Button, Table } from "react-bootstrap";
import "../Dashboard.css";
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);
  const [receivedData, setReceivedData] = useState(false);

  const baseUrl = "http://127.0.0.1:8001";

  useEffect(() => {
    getData();
    //console.log(data);
    const data = JSON.parse(localStorage.getItem('myData'));
    if(data != null)
    {
      if ( new Date().getTime() < data.expiresAt) {
        setReceivedData(true);
        //console.log("hi i love u");
        const value = data.value;
      } else {
        localStorage.removeItem('myData');
      }
      
    }

    else{
      navigate("/login");
    }
  }, []);

  const AddDoctor = () => {
    navigate("/doctor/addDoctor");
  };

  const AddHome = () => {
    navigate("/adminDashboard");
  };

  const AddPatient = () => {
    navigate("/patient/AddPatient");
  };

  const PatientList = () => {
    navigate("/patient/patientList");
  };

  const AddAppointment = () => {
    navigate("/appointment/AddAppointment");
  };

  const AppointmentList = () => {
    navigate("/appointment/AppointmentList");
  };

  const AddDepartment = () => {
    navigate("/department/AddDepartment");
  };

  const DepartmentList = () => {
    navigate("/department/departmentList");
  };

  const AddPayment = () => {
    navigate("/payment/AddPayment");
  };

  const AddShedule = () => {
    navigate("/doctorshedule/AddShedule");
  };

  const SheduleList = () => {
    navigate("/doctorshedule/SheduleList");
  };

  const PaymentList = () => {
    navigate("/hello");
  };

  const Prescription = () => {
    navigate("/prescription/AddPrescription");
  };

  const PrescriptionList = () => {
    navigate("/prescription/PrescriptionList");
  };

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
    {receivedData && (
      <Row className="mt-1 row ">
        <Col sm={5} xxs={2} xs={6} lg={3} md={4} xl={3} xxl={2} className="bar">
          <div>
            <p className="title"> Health care</p>
          </div>

          <Nav className="flex-column" defaultActiveKey={"#home"}>
            <Nav.Item>
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
                </Nav.Link>{" "}
                <Collapse in={open8} id="bar-doctor" className="navItem">
                  <Card>
                    <Card.Body>
                      <Button
                        variant="light"
                        onClick={AddHome}
                        style={{ marginLeft: "3vw" }}
                      >
                        MedBoard
                      </Button>
                    </Card.Body>
                  </Card>
                </Collapse>
              </Nav.Item>
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
                {" "}
                <LocalHospitalIcon className="Icon" />
                Doctor
                <ArrowDropDownIcon className="Icon2" />
              </Nav.Link>

              <Collapse in={open1} id="bar-doctor" className="navItem">
                <Card>
                  <Card.Body>
                    <Button variant="light" onClick={AddDoctor}>
                      Add Doctor
                    </Button>
                    <Button variant="light">Doctor List</Button>
                  </Card.Body>
                </Card>
              </Collapse>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#patient"
                className="home text-light"
                aria-controls="bar-patient"
                onClick={() => {
                  setOpen2(!open2);
                  setOpen1(false);
                  setOpen3(false);
                  setOpen4(false);
                  setOpen5(false);
                  setOpen6(false);
                  setOpen7(false);
                }}
              >
                <PersonIcon className="Icon" />
                Patient
                <ArrowDropDownIcon className="Icon3" />
              </Nav.Link>
              <Collapse in={open2} id="bar-patient" className="navItem">
                <Card>
                  <Card.Body>
                    <Button variant="light" onClick={AddPatient}>
                      Add Patient
                    </Button>
                    <Button variant="light" onClick={PatientList}>
                      Patient List
                    </Button>
                  </Card.Body>
                </Card>
              </Collapse>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#department"
                className="home text-light"
                aria-controls="bar-department"
                onClick={() => {
                  setOpen3(!open3);
                  setOpen2(false);
                  setOpen1(false);
                  setOpen4(false);
                  setOpen5(false);
                  setOpen6(false);
                  setOpen7(false);
                }}
              >
                <LanIcon className="Icon" />
                Department
                <ArrowDropDownIcon className="Icon4" />
              </Nav.Link>

              <Collapse in={open3} id="bar-department" className="navItem">
                <Card>
                  <Card.Body>
                    <Button
                      variant="light"
                      style={{ fontSize: "11px" }}
                      onClick={AddDepartment}
                    >
                      Add Department
                    </Button>
                    <Button
                      variant="light"
                      style={{ fontSize: "11px" }}
                      onClick={DepartmentList}
                    >
                      Department List
                    </Button>
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
                    <Button
                      variant="light"
                      style={{ fontSize: "11px" }}
                      onClick={AddShedule}
                    >
                      Add Schedule
                    </Button>
                    <Button
                      variant="light"
                      style={{ fontSize: "11px" }}
                      onClick={SheduleList}
                    >
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
                {" "}
                <MedicationIcon className="Icon" />
                Prescription
                <ArrowDropDownIcon className="Icon6" />
              </Nav.Link>
              <Collapse in={open5} id="bar-prescription" className="navItem">
                <Card>
                  <Card.Body>
                    <Button
                      variant="light"
                      style={{ fontSize: "11px" }}
                      onClick={Prescription}
                    >
                      Add Prescription
                    </Button>
                    <Button
                      variant="light"
                      style={{ fontSize: "11px" }}
                      onClick={PrescriptionList}
                    >
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
                    <Button
                      variant="light"
                      style={{ fontSize: "10px" }}
                      onClick={AddAppointment}
                    >
                      Add Appointment
                    </Button>
                    <Button
                      variant="light"
                      style={{ fontSize: "10px" }}
                      onClick={AppointmentList}
                    >
                      Appointment List
                    </Button>
                  </Card.Body>
                </Card>
              </Collapse>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#payement"
                className="home text-light"
                aria-controls="bar-payment"
                onClick={() => {
                  setOpen7(!open7);
                  setOpen2(false);
                  setOpen3(false);
                  setOpen4(false);
                  setOpen5(false);
                  setOpen6(false);
                  setOpen1(false);
                }}
              >
                <PaymentIcon className="Icon" />
                Payment
                <ArrowDropDownIcon className="Icon8" />
              </Nav.Link>
              <Collapse in={open7} id="bar-payment" className="navItem">
                <Card>
                  <Card.Body>
                    <Button
                      variant="light"
                      style={{ fontSize: "15px" }}
                      onClick={AddPayment}
                    >
                      Add Payment
                    </Button>
                    <Button
                      variant="light"
                      style={{ fontSize: "15px" }}
                      onClick={PaymentList}
                    >
                      Pay List
                    </Button>
                  </Card.Body>
                </Card>
              </Collapse>
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
                      src={"http://127.0.0.1:8001/storage/" + item.Image}
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
      )}
    </>
  );
};

export default DoctorList;
