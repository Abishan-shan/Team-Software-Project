import {
  Col,
  Collapse,
  Nav,
  Row,
  Card,
  Button,
  Table,
  Form,
  Alert
} from "react-bootstrap";
import "./payment.css";
import "../Dashboard.css";
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

const PaymentList = () => {
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
  const [showAlert,setShowAlert]=useState(false);
  const [Udata, setUdata] = useState([]);
  const [showEdit, setShowedit] = useState(false);
  const [list, setList] = useState(true);
  const [id, setId] = useState("");
  const [receivedData, setReceivedData] = useState(false);

  useEffect(() => {
    getData();

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

  const DoctorList = () => {
    navigate("/doctor/doctorList");
  };

  const PatientList = () => {
    navigate("/patient/patientList");
  };

  const AddPatient = () => {
    navigate("/patient/AddPatient");
  };

  const AddDepartment = () => {
    navigate("/department/AddDepartment");
  };

  const DepartmentList = () => {
    navigate("/department/departmentList");
  };

  const AddShedule = () => {
    navigate("/doctorshedule/AddShedule");
  };

  const AddAppointment = () => {
    navigate("/appointment/AddAppointment");
  };

  const AppointmentList = () => {
    navigate("/appointment/AppointmentList");
  };

  const SheduleList = () => {
    navigate("/doctorshedule/SheduleList");
  };

  const AddPayment = () => {
    navigate("/payment/AddPayment");
  };

  const Prescription = () => {
    navigate("/prescription/AddPrescription");
  };

  const PrescriptionList = () => {
    navigate("/prescription/PrescriptionList");
  };

  const getData = async () => {
    const response = await fetch("http://127.0.0.1:8001/api/Payview", {
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

    const response = await fetch(`http://127.0.0.1:8001/api/Paydelete/${id}`, {
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

    const response = await fetch(`http://127.0.0.1:8001/api/Payedit/${id}`, {
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

  const HandleChange = (e) => {
    const { name, value } = e.target;

    console.log(name);

    if (name === "PaymentMode") {
      const selectedOptions = Array.from(e.target.options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setUdata((prevState) => ({
        ...prevState,
        [name]: selectedOptions,
      }));
    } else if (name === "PaymentStatus") {
      const selectedOptions = Array.from(e.target.options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setUdata((prevState) => ({
        ...prevState,
        [name]: selectedOptions,
      }));
    } else {
      setUdata((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(Udata);

    const response = await fetch("http://127.0.0.1:8001/api/Payupdate/"+id, {
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

  return (
    <>
    {receivedData &&(
      <Row className="mt-1 row">
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
                    <Button variant="light" onClick={DoctorList}>
                      Doctor List
                    </Button>
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
                    <Button variant="light" style={{ fontSize: "15px" }}>
                      Pay List
                    </Button>
                  </Card.Body>
                </Card>
              </Collapse>
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
            <Col lg={6} sm={12} xxl={2}>
              <Card
                className="table1 mb-5 mt-5"
                style={{ boxShadow: "0px 0px 10px 0px", width: "950px" }}
              >
                <Card.Header className="cardHeader" style={{ padding: "20px", fontWeight:"bolder" , fontSize:"1.3em" }}>
                  Payment List
                </Card.Header>
                <Card.Body className="ScrollViewPatienList">
                  <Table responsive="sm" hover>
                    <thead>
                      <th>Patient Id</th>
                      <th>Account Name</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>PaymentMode</th>
                      <th>Status</th>
                      <th>Description</th>
                      <th colSpan={2}>Actions</th>
                    </thead>
                    <tbody>
                      {data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.PatientId}</td>
                          <td>{item.AccountName}</td>
                          <td>{item.Date}</td>
                          <td>{item.TotalAmount}</td>
                          <td>{item.PaymentMode}</td>
                          <td>{item.PaymentStatus}</td>
                          <td>{item.Description}</td>
                          <td>
                            <Button
                              variant="primary"
                              onClick={() => {
                                onEdit(item.id);
                                setId(item.id);
                              }}
                            >
                              {" "}
                              edit
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => onDelete(item.id)}
                            >
                              {" "}
                              delete{" "}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Col>
        )}

        {/* this is for edit page */}

        {showEdit && (
          <Col xl={9} sm={7} xxs={10} xs={6} lg={9} md={8} className=" scroll">
            <Card className="colScroll mt-5 mb-5 ms-5">
              <Card.Header style={{ fontWeight: "bold" }}>
                Add Payment
              </Card.Header>

              {showAlert && (
                <Alert
                  variant="success"
                  className="mt-5"
                  onClose={() => {
                    setShowAlert(false);
                  }}
                  dismissible
                >
                  Updated successfully
                </Alert>
              )}

              <Card.Body>
                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col xl={12} md={12}>
                      <Row>
                        <Col xl={6}>
                          <Form.Group>
                            <Form.Label>Patient ID</Form.Label>
                            <Form.Control
                              type="text"
                              name="PatientId"
                              value={Udata.PatientId}
                              onChange={HandleChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col xl={6}>
                          <Form.Group>
                            <Form.Label>Account Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="AccountName"
                              value={Udata.AccountName}
                              onChange={HandleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>

                    <Col xl={12} md={12}>
                      <Row>
                        <Col xl={6}>
                          <Form.Group>
                            <Form.Label>Payment Date</Form.Label>
                            <Form.Control
                              type="date"
                              name="Date"
                              value={Udata.Date}
                              onChange={HandleChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col xl={6}>
                          <Form.Group>
                            <Form.Label>Total Amount</Form.Label>
                            <Form.Control
                              type="text"
                              name="TotalAmount"
                              value={Udata.TotalAmount}
                              onChange={HandleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>

                    <Col xl={12} md={12}>
                      <Row>
                        <Col xl={6}>
                          <Form.Group>
                            <Form.Label>Payment mode</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              name="PaymentMode"
                              value={Udata.PaymentMode}
                              onChange={HandleChange}
                            >
                              <option></option>
                              <option value="debit">debit</option>
                              <option value="credit">credit</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col xl={6}>
                          <Form.Group>
                            <Form.Label>Payment status</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              name="PaymentStatus"
                              value={Udata.PaymentStatus}
                              onChange={HandleChange}
                            >
                              <option></option>
                              <option value="complete">complete</option>
                              <option value="pending">pending</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>

                    <Col xl={12} md={12}>
                      <Row>
                        <Col xl={12}>
                          <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              type="text"
                              className="short"
                              name="Description"
                              value={Udata.Description}
                              onChange={HandleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>

                    <Col xl={12} md={12}>
                      <Row>
                        <Col xl={6}>
                          <Form.Group>
                            <Form.Label className="me-2">Sex</Form.Label> <br />
                            <Form.Check // prettier-ignore
                              type="radio"
                              label="Male"
                              id="radio-1"
                              name="Sex"
                              inline
                              value="male"
                              onChange={HandleChange}
                            />
                            <Form.Check // prettier-ignore
                              inline
                              type="radio"
                              label="Female"
                              name="Sex"
                              id="radio-2"
                              value="female"
                              onChange={HandleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>

                    <Col xl={12} md={12}>
                      <Row>
                        <Col xl={6}>
                          <Button
                            type="submit"
                            variant="primary"
                            className="mt-5"
                          >
                            Update
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
      )}
    </>
  );
};

export default PaymentList;
