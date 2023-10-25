import React from 'react'
import {Link} from 'react-router-dom';

import './MainHome.css' ;
import Navbar from './Component/Navbar';



import p4 from './images/p4.jpg';


export default function FirstPage() {
  return (
    <div>
      <Navbar/>
	  <div>
        <section className="firstPage w-100" style={{ backgroundImage:`url(${p4})`,backgroundRepeat:"no-repeat" }}>
        <div className="content">
          <h2 className="cl">"Providing exceptional healthcare with empathy and expertise."</h2>
          <p className="cl2">Welcome to [Hospital Name], a leading healthcare institution dedicated to providing exceptional care and improving lives. With a legacy of excellence spanning [number of years] years, we have been at the forefront of medical advancements and compassionate patient care.

At [Hospital Name], our mission is to deliver exceptional healthcare with empathy and expertise."</p>
<div class="d-grid button2 gap-20 col-md-6 mx-auto">
                           <Link to="/login"> <button class="btn btn-outline-primary btn-lg" type="button">MAKE AN APPOINTMENT</button></Link>
                          </div>
						  
        </div>
      </section>
	  </div>
     

    </div>
  )
}
