import { Col, Collapse, Nav, Row, Card, Button,Alert,Form } from "react-bootstrap";
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
import { useNavigate } from 'react-router-dom';


const AddPrescription = () => {
  const navigate=useNavigate();
  const [showAlert,setShowAlert]=useState(false);
    const [showError,setShowError]=useState(false);
  const [List,setList]=useState({
    "MName":"",
    "Dosage":"",
    "Frequency":"",
    "Prescriber":"",
    "PatientId":"",
    "MDetails":"",
    "SDate":"",
    "EDate":"",
    "Note":""
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

  const AddPayment = () =>{
    navigate('/payment/AddPayment')
  }

  const PaymentList = () =>{
      navigate('/hello');
  }

  const SheduleList = ()=>{
    navigate("/doctorshedule/SheduleList");
  }

  
  const PrescriptionList = ()=>{
    navigate("/prescription/PrescriptionList");
  }


  const onReset = ()=>{
    setList(
      {
        "MName":"",
        "Dosage":"",
        "Frequency":"",
        "Prescriber":"",
        "PatientId":"",
        "MDetails":"",
        "SDate":"",
        "EDate":"",
        "Note":""
      }
    )
  }

  const onSubmit =async (e)=>{
      e.preventDefault();
      console.log(List);


      const response = await fetch("http://127.0.0.1:8001/api/addPrescription",{

      method: "POST",
      body: JSON.stringify(List),
      headers: {
        "Content-Type": "application/json",
      },
      })

      if(response.status === 401 || response.status === 500)
      {
        setShowError(true);
        console.log("enter proper data");
      }
      
      if(!response.ok)
      {
        setShowError(true);
        //throw new Error("Http failed with status",response.status);
      }

      const res=await response.text();
      console.log(res);

      if(res === "saved successfully")
      {

        setShowAlert(true);

        setList(
          {
            "MName":"",
            "Dosage":"",
            "Frequency":"",
            "Prescriber":"",
            "PatientId":"",
            "MDetails":"",
            "SDate":"",
            "EDate":"",
            "Note":""
          })
      } 
  }


  const HandleChange = (e)=>{
        const {name,value}=e.target;

        setList((prevState)=>({
              ...prevState,
              [name]:value
        })
        )
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
                    <Button variant="light" onClick={DoctorList}>Doctor List</Button>
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
                    <Button variant="light" style={{ fontSize: "11px" }}>
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
                    <Button variant="light" style={{ fontSize: "10px" }}>
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
                    <Button variant="light" style={{ fontSize: "15px" }} onClick={AddPayment}>
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
              <Card.Header style={{fontWeight:"bold"}}>Add Prescription</Card.Header>

              {
              showAlert && (
                  <Alert variant="success" className="mt-5" onClose={()=>{setShowAlert(false)}} dismissible>
                      Details added successfully
                  </Alert>
              )

            }

            {
              showError && (
                  <Alert variant="danger" className="mt-5" onClose={()=>{setShowError(false)}} dismissible>
                       Enter your Proper Data
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
                          <Form.Label>Medication Name</Form.Label>
                          <Form.Control 
                              type="text" 
                              name="MName"
                              value={List.MName}
                              onChange={HandleChange}
                              />
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group>
                          <Form.Label>Dosage</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="Dosage"
                            placeholder="20mg"
                            value={List.Dosage}
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
                          <Form.Label>Frequency</Form.Label>
                          <Form.Control
                            type="text"
                            name="Frequency"
                            value={List.Frequency}
                            onChange={HandleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group>
                          <Form.Label>Prescriber</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="Prescriber"
                            value={List.Prescriber}
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
                          <Form.Label>Patient Id</Form.Label>
                          <Form.Control 
                            type="number" 
                            name="PatientId"
                            value={List.PatientId}
                            onChange={HandleChange}
                            />
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group>
                          <Form.Label>Medication Details</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="MDetails"
                            value={List.MDetails}
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
                          <Form.Label>Start Date</Form.Label>
                          <Form.Control 
                            type="date" 
                            name="SDate"
                            value={List.SDate}
                            onChange={HandleChange}
                            />
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group>
                          <Form.Label>End Date</Form.Label>
                          <Form.Control 
                            type="date" 
                            name="EDate"
                            value={List.EDate}
                            onChange={HandleChange}
                            />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>


                  <Col xl={12} md={12}>
                  <Row>
                    <Col xl={12}>
                      <Form.Group >
                        <Form.Label>Note</Form.Label>
                        <Form.Control 
                          type="text" 
                          className="short"
                          name="Note"
                          value={List.Note}
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

export default AddPrescription;
