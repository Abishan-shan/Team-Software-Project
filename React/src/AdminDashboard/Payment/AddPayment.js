import {
  Col,
  Collapse,
  Nav,
  Row,
  Card,
  Button,
  Alert,
  Form,
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
import { Payment } from "@mui/icons-material";

const AddPayment = () => {
  const navigate = useNavigate();
  const [showAlert,setShowAlert]=useState(false);
  const [List,setList]=useState({
      "PatientId":"",
      "AccountName":"",
      "Date":"",
      "TotalAmount":"",
      "PaymentMode":"",
      "PaymentStatus":"",
      "Description":"",
      "Sex":"",
  });
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);
  const [receivedData, setReceivedData] = useState(false);


  useEffect(()=>{

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

  },[])

  const AddDoctor = () =>{

    navigate('/doctor/addDoctor');
}

const AddHome = () =>{

  navigate('/adminDashboard');
}

const DoctorList = () =>{
  navigate('/doctor/doctorList');
}

const PatientList = () =>{
  navigate('/patient/patientList')
}

const AddPatient = () =>{
  navigate('/patient/AddPatient')
}

const AddDepartment = () =>{
  navigate('/department/AddDepartment')
}

const DepartmentList = () =>{
  navigate('/department/departmentList')
}

const AddShedule = () =>{
  navigate('/doctorshedule/AddShedule')
}

const AddAppointment = () =>{
  navigate('/appointment/AddAppointment')
}

const AppointmentList = () =>{
  navigate('/appointment/AppointmentList')
}


const SheduleList = ()=>{
  navigate("/doctorshedule/SheduleList");
}

const PaymentList = ()=>{
  navigate('/hello');
}

const Prescription = ()=>{
  navigate("/prescription/AddPrescription");
}

const PrescriptionList = ()=>{
  navigate("/prescription/PrescriptionList");
}


const HandleChange = (e)=>{

  const {name,value}=e.target;

      console.log(name);

      if (name === 'PaymentMode') {
        const selectedOptions = Array.from(e.target.options)
          .filter((option) => option.selected)
          .map((option) => option.value);
        setList((prevState) => ({
          ...prevState,
          [name]: selectedOptions,
        }));
      } 
      else if(name === 'PaymentStatus'){
        const selectedOptions = Array.from(e.target.options)
          .filter((option) => option.selected)
          .map((option) => option.value);
        setList((prevState) => ({
          ...prevState,
          [name]: selectedOptions,
        }));
      } 

      
      else {
        setList((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }

    
}


const onSubmit =async (e)=>{
    e.preventDefault();
    console.log(List);
    List.PaymentMode=List.PaymentMode.toString();
    List.PaymentStatus=List.PaymentStatus.toString();

    const response = await fetch("http://127.0.0.1:8001/api/addPayment",{

      method: "POST",
      body: JSON.stringify(List),
      headers: {
        "Content-Type": "application/json",
      },
      })

      if(response.status === 401)
      {
        throw new Error("enter proper data");
      }
      
      if(!response.ok)
      {
        throw new Error("Http failed with status",response.status);
      }

      const res=await response.text();
      console.log(res);

      if(res === "saved successfully")
      {

        setShowAlert(true);

        setList({

          "PatientId":"",
            "AccountName":"",
            "Date":"",
            "TotalAmount":"",
            "PaymentMode":"",
            "PaymentStatus":"",
            "Description":"",
            "Sex":"",
        });
      } 

}

const onReset =()=>{
  setList({

    "PatientId":"",
      "AccountName":"",
      "Date":"",
      "TotalAmount":"",
      "PaymentMode":"",
      "PaymentStatus":"",
      "Description":"",
      "Sex":"",
  })
}

  return (
    <>

    {receivedData && (
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
              </Nav.Link> <Collapse in={open8} id="bar-doctor" className="navItem">
                <Card>
                  <Card.Body>
                    <Button variant="light" onClick={AddHome} style={{marginLeft:"3vw"}}>MedBoard</Button>
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
                    <Button variant="light" onClick={AddDoctor}>Add Doctor</Button>
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
                    <Button variant="light" onClick={AddPatient}>Add Patient</Button>
                    <Button variant="light" onClick={PatientList}>Patient List</Button>
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
                    <Button variant="light" style={{ fontSize: "11px" }} onClick={AddDepartment}>
                      Add Department
                    </Button>
                    <Button variant="light" style={{ fontSize: "11px" }} onClick={DepartmentList}>
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
                    <Button variant="light" style={{ fontSize: "11px" }} onClick={AddShedule}>
                      Add Schedule
                    </Button>
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
                {" "}
                <MedicationIcon className="Icon" />
                Prescription
                <ArrowDropDownIcon className="Icon6" />
              </Nav.Link>
              <Collapse in={open5} id="bar-prescription" className="navItem">
                <Card>
                  <Card.Body>
                    <Button variant="light" style={{ fontSize: "11px" }} onClick={Prescription}>
                      Add Prescription
                    </Button>
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
                    <Button variant="light" style={{ fontSize: "15px" }} >
                      Add Payment
                    </Button>
                    <Button variant="light" style={{ fontSize: "15px" }} onClick={PaymentList}>
                      Pay List
                    </Button>
                  </Card.Body>
                </Card>
              </Collapse>
            </Nav.Item>
          </Nav>
        </Col>

        <Col xl={9} sm={7} xxs={10} xs={6} lg={9} md={8} className=" scroll">
          <Card className="colScroll mt-5 mb-5 ms-5">
            <Card.Header style={{ fontWeight: "bold" }}>
              Add Payment
            </Card.Header>

            {
              showAlert && (
                  <Alert variant="success" className="mt-5" onClose={()=>{setShowAlert(false)}} dismissible>
                      Details added successfully
                  </Alert>
              )

            }

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
                          value={List.PatientId}
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
                          value={List.AccountName}
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
                          value={List.Date}
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
                          value={List.TotalAmount}
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
                          value={List.PaymentMode}
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
                          value={List.PaymentStatus}
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
                          value={List.Description}
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
                      <Button variant="danger" className="me-4 mt-5" onClick={onReset}>
                        Reset
                      </Button>
                      <Button type="submit" variant="primary" className="mt-5">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      )}
    </>
  );
};

export default AddPayment;
