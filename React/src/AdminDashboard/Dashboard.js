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
import { Link, useNavigate } from 'react-router-dom';
import logout from './Logout.png';



const DashBoard = () => {
  const navigate=useNavigate()
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
  const [NewPatients,setNewPatients]=useState([]);
  const [ Doctors,setDoctors]=useState([]);
  const [Total,setTotal]=useState();
  const [receivedData, setReceivedData] = useState(false);
  
  

  useEffect(()=>{
      getDoctorNum();
      getPatientNum();
      getAppointmentNum();
      getPatientNewNum();
      getNewAppointments();
      getNewPatients();
      getDoctors();
      getTotal();

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
  },[]);

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

  const AddPayment = () =>{
    navigate('/payment/AddPayment')
  }

  const PaymentList = () =>{
      navigate('/hello');
  }

  const SheduleList = ()=>{
    navigate("/doctorshedule/SheduleList");
  }

  const Prescription = ()=>{
    navigate("/prescription/AddPrescription");
  }

  const PrescriptionList = ()=>{
    navigate("/prescription/PrescriptionList");
  }


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
      navigate("/login");
    }
  };

  const getDoctorNum = async()=>{

    const response=await fetch("http://127.0.0.1:8001/api/DocCount",{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }

    });

    const res=await response.text();

    if(!response.ok)
    {
      console.log("Error");
    }

    else{
        setDoctorCount(res);
    }



  }


    const getPatientNum = async()=>{

      const response=await fetch("http://127.0.0.1:8001/api/PatCount",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
  
      });


    const res=await response.text();

    if(!response.ok)
    {
      console.log("Error");
    }

    else{
        setPatientCount(res);
    }

  }


  const getPatientNewNum = async()=>{

    const response=await fetch("http://127.0.0.1:8001/api/PatNewcount",{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }

    });




  const res=await response.text();

  if(!response.ok)
  {
    console.log("Error");
  }

  else{
      setPatientNewCount(res);
  }

}


const getNewPatients = async()=>{

  const response=await fetch("http://127.0.0.1:8001/api/PatNew",{
    method:"GET",
    headers:{
      "Content-Type":"application/json"
    }

  });




const res=await response.json();

if(!response.ok)
{
  console.log("Error");
}

else{
    setNewPatients(res);
}

}


  const getAppointmentNum = async()=>{

    const response=await fetch("http://127.0.0.1:8001/api/AppCount",{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }

    });


  const res=await response.text();

  if(!response.ok)
  {
    console.log("Error");
  }

  else{
      setAppointmentCount(res);
  }

}



const getNewAppointments = async()=>{

  const response=await fetch("http://127.0.0.1:8001/api/AppAdd",{
    method:"GET",
    headers:{
      "Content-Type":"application/json"
    }

  });


const res=await response.json();

if(!response.ok)
{
  console.log("Error");
}

else{
    setAppointments(res);
}

}


const getDoctors = async()=>{

  const response=await fetch("http://127.0.0.1:8001/api/Dview",{
    method:"GET",
    headers:{
      "Content-Type":"application/json"
    }

  });


const res=await response.json();

if(!response.ok)
{
  console.log("Error");
}

else{
    setDoctors(res);
}

}


const getTotal = async()=>{

  const response=await fetch("http://127.0.0.1:8001/api/TotalPayment",{
    method:"GET",
    headers:{
      "Content-Type":"application/json"
    }

  });


const res=await response.text();

if(!response.ok)
{
  console.log("Error");
}

else{
    setTotal(res);
}

}

  return (
    <>

    {receivedData && (
    
      <Row className="mt-1 row">
        <Col sm={5} xxs={2} xs={6} lg={3} md={4} xl={3} xxl={2} className="bar">
          <div>
            <p className="title"> Health care 
              
            <Button  variant="light" title="Logout" style={{ color: "white" ,width:30 ,height:30,marginLeft:30}} onClick={Logout} className="mt-2">
                      
                    
                  <img
                    src={logout}
                    alt="Logo"
                    className="profile2"
                    width="40"
                    style={{width:40 ,height:40,marginLeft:-18 , marginTop:-15}}

                    />
              </Button>
                 
            </p>
            
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
                <Card.Title>Doctors</Card.Title>
                <Card.Body>{DoctorCount}</Card.Body>
              </Card>
            </Col>

            <Col lg={4} sm={12} md={6}>
              <Card className="customCard">
                <Card.Title>Nurses</Card.Title>
                <Card.Body>3000</Card.Body>
              </Card>
            </Col>

            <Col lg={4} sm={12} md={6}>
              <Card className="customCard">
                <Card.Title>Patients</Card.Title>
                <Card.Body>{PatientCount}</Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={3}>
              <Card className="customCard">
                <Card.Title>Appointments</Card.Title>
                <Card.Body>{AppointmentCount}</Card.Body>
              </Card>

              <Card className="mt-5 customCard">
                <Card.Title>New Paients</Card.Title>
                <Card.Body>{PatientNewCount}</Card.Body>
              </Card>

              <Card className="mt-5 customCard">
                <Card.Title>Hospital Earns</Card.Title>
                <Card.Body>{Total}$</Card.Body>
              </Card>
            </Col>

            <Col lg={6} sm={12}>
              <Card
                className="table1"
                style={{ boxShadow: "0px 0px 10px 0px", width: "800px" }}
              >
                <Card.Header className="cardHeader" style={{ padding: "20px" }}>
                  Upcoming Appointment
                </Card.Header>
                <Card.Body className="ScrollViewAppoint">
                  <Table responsive="sm" hover >
                    <thead>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Date</th>
                      <th>Timing</th>
                      <th>Contact</th>
                    </thead>
                    <tbody>
                    {Appointments.map((item) => (
                        <tr key={item.id}>
                          <td>{item.FirstName} {item.LastName}</td>
                          <td>{item.AppointmentWith}</td>
                          <td>{item.Date}</td>
                          <td>9.00</td>
                          <td>0767672875</td>
                        </tr>
                          ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
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
                    {NewPatients.map((item) => (
                              <tr key={item.id}>

                                <td>{item.FName} {item.LName}</td>
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
                  Doctors
                </Card.Header>
                <Card.Body className="ScrollViewAppoint">
                  <Table hover>
                    <thead>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Mobile</th>
                      <th>Address</th>
                      <th>Department</th>
                    </thead>
                    <tbody>
                    {Doctors.map((item) => (
                              <tr key={item.id}>

                                <td>{item.FName} {item.LName}</td>
                                <td>{item.Designation}</td>
                                <td>{item.Mobile}</td>
                               <td>{item.Address}</td>
                               <td>{item.Department}</td>
                                
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
      )}

      
    </>
  );
};

export default DashBoard;
