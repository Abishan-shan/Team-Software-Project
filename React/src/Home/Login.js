import React, { useState,useEffect } from 'react'
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import {
    Form,
	Button,
	Alert,
  } from "react-bootstrap";
//,useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export default function Login() {
	const navigate = useNavigate();
	const [justifyActive, setJustifyActive] = useState('tab1');
    const [showError,setShowError]=useState(false);
	const [userName,setUsername]= useState("hi");



	const [List,setList]=useState({
		
		"Email":"",
		"Password":""
	});

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const HandleChange = (e)=>{
	const {name,value}=e.target;


	setList((prevState) => ({
	  ...prevState,
	  [name]:value
	}));
}

  const onSubmit =async (e)=>{
	e.preventDefault();
	console.log(List);


	const response = await fetch("http://127.0.0.1:8001/api/loginAll",{

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

      const res=await response.json();
	  console.log(res);

      if(res.Username === "admin")
      {
		const Dt=res.Username;
		const data = {
			value: Dt,
			expiresAt: new Date().getTime() + 3600 * 1000, // Set expiration to 1 hour from now
		  };
		  
		localStorage.setItem('myData',JSON.stringify(data));
		navigate('/adminDashboard');

        setList({

          
          "Email":"",
          "Password":"",
    
          })
      } 

	  if(res.History)
      {
		localStorage.setItem('myData',res.FName +" "+res.LName );
		//navigate('/adminDashboard');
		console.log("entered successfully PATIENT");
        setList({

          
          "Email":"",
          "Password":"",
    
          })
      } 

	  if(res.Bio )
      {

		const Dt=res.FName+ " "+ res.LName;
		const data = {
			value: Dt,
			expiresAt: new Date().getTime() + 3600 * 1000, // Set expiration to 1 hour from now
		  };
		  console.log(data);
		localStorage.setItem('myData',JSON.stringify(data));
		localStorage.setItem('myProfile',JSON.stringify(res));
		console.log("entered Successfully DOCTOR");
		navigate('/Doctor/Dash');


        setList({

          
          "Email":"",
          "Password":"",
    
          })
      } 

	  else
	  {
		setShowError(true);
		setList({
			"Email":"",
			"Password":"",
	  
			})
	  }




  }
  return (

	
    <div >

		{
		showError && (
			<Alert variant="danger" className="mt-5" onClose={()=>{setShowError(false)}} dismissible>
				 Invalid email or password
			</Alert>
		)

	  }
			  <MDBContainer className="p-3 my-5 d-flex flex-column w-50"  >

			  <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between' >
				<MDBTabsItem>
				  <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
					Login
				  </MDBTabsLink>
				</MDBTabsItem>
				<MDBTabsItem>
				  <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
					Register
				  </MDBTabsLink>
				</MDBTabsItem>
			  </MDBTabs>

			  <MDBTabsContent>

				<MDBTabsPane show={justifyActive === 'tab1'}>

				  <div className="text-center mb-3" >
					

					<div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
					  <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
						<MDBIcon fab icon='facebook-f' size="sm"/>
					  </MDBBtn>

					  <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
						<MDBIcon fab icon='twitter' size="sm"/>
					  </MDBBtn>

					  <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
						<MDBIcon fab icon='google' size="sm"/>
					  </MDBBtn>

					  <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
						<MDBIcon fab icon='github' size="sm"/>
					  </MDBBtn>
					</div>

					
				  </div>


				  <Form onSubmit={onSubmit}>
						<MDBInput wrapperClass='mb-4' name="Email" label='Email address' value={List.Email}
                            onChange={HandleChange} id='form1' type='email'/>
						
						<MDBInput wrapperClass='mb-4' value={List.Password}
                            onChange={HandleChange} label='Password' name="Password" id='form2' type='password'/>

						<div className="d-flex justify-content-between mx-4 mb-4">
							<MDBCheckbox name='flexCheck'  id='flexCheckDefault' label='Remember me' />
							
						</div>

						<Button type="submit" variant="primary" className="mb-4 w-100">
							Login
						</Button>

				  </Form>
				  <p className="text-center"><a href="/">Back Home Page </a></p>

				</MDBTabsPane>

				<MDBTabsPane show={justifyActive === 'tab2'}>

				  <div className="text-center mb-3">
					

					<div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
					  <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
						<MDBIcon fab icon='facebook-f' size="sm"/>
					  </MDBBtn>

					  <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
						<MDBIcon fab icon='twitter' size="sm"/>
					  </MDBBtn>

					  <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
						<MDBIcon fab icon='google' size="sm"/>
					  </MDBBtn>

					  <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
						<MDBIcon fab icon='github' size="sm"/>
					  </MDBBtn>
					</div>

					
				  </div>

				  <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text'/>
				  <MDBInput wrapperClass='mb-4' label='Phone Number' id='form1' type='Number'/>
				  <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
				  <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/>

				  

				  <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>

				</MDBTabsPane>

			  </MDBTabsContent>

			</MDBContainer>
    </div>
  )
}
