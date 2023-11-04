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
          <p className="cl2">Welcome to <b>Health Care System</b>, a leading healthcare institution dedicated to providing exceptional care and improving lives. With a legacy of excellence spanning <b>5</b> years, we have been at the forefront of medical advancements and compassionate patient care.

At <b>Health Care</b>, our mission is to deliver exceptional healthcare with empathy and expertise."</p>
<div class="d-grid button2 gap-20 col-md-6 mx-auto">
                           <Link to="/login"> <button class="btn btn-outline-primary btn-lg" type="button">Click to Start</button></Link>
                          </div>

                          <div>
      
    </div>

      
						  
        </div>
      </section>
	  </div>
     

    </div>
  )
}
