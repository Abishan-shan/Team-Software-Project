import React from 'react'
import p5 from '../images/p5.jpg';
import p10 from '../images/p10.jpg';
import p13 from '../images/p13.jpg';
import p12 from '../images/p12.jpg';
import p14 from '../images/p14.jpg';
import p15 from '../images/p15.jpg';
import p16 from '../images/p16.jpg';
import p17 from '../images/p17.jpg';
import p18 from '../images/p18.jpg';
import p19 from '../images/p19.jpg';


export default function Slider() {
  return (
    <div>
      <div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
  <div className="row">
      <div className="col-md-12 text-center">
         <h3 className='main-heading'>Our Services</h3>
          <div className="underling mx-auto" ></div>
          </div>
      </div>
    <div className="carousel-item active">
      
    <div className="row column-card">
          <div className="col-md-4">
          <div className="card" style={{width: '20rem'}}>

              
              <img src={p10} className="card-img-top img3" alt=""/>
              <div className="card-body card-height ">
                <h5 className="card-title">EMERGENCY SERVICES</h5>
                <p className="card-text ">Immediate Care, Round-the-Clock: our Hospital is your trusted destination for urgent medical needs. With 24/7 availability, our dedicated team of experienced doctors across all specialties ensures minimal waiting times and top-notch emergency services</p>
                <a href="#" className="btn btn-primary">view more</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
          <div className="card" style={{width: '20rem'}}>

              
              <img src={p13} className="card-img-top img3" alt=""/>
              <div className="card-body card-height ">
                <h5 className="card-title">MOTHER AND BABY CARE CENTRE</h5>
                <p className="card-text ">we offer comprehensive and convenient services, catering to every stage from conception to post-natal care. With expert medical professionals specializing in pregnancy, delivery, and pediatric treatment up to 14 years of age.</p>
                <a href="#" className="btn btn-primary">view more</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
          <div className="card" style={{width: '20rem'}}>

              
              <img src={p12} className="card-img-top img3" alt=""/>
              <div className="card-body card-height ">
                <h5 className="card-title">VACCINATIONS</h5>
                <p className="card-text ">We have a team of expert paediatricians and superior vaccination storage facilities so that our Vaccination Clinic runs on par with the National Vaccination Program</p>
                <a href="#" className="btn btn-primary">view more</a>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div className="carousel-item">
    <div className="row column-card">
          <div className="col-md-4">
          <div className="card" style={{width: '20rem'}}>

              
              <img src={p14} className="card-img-top img3" alt=""/>
              <div className="card-body card-height ">
                <h5 className="card-title">PHYSIOTHERAPY</h5>
                <p className="card-text ">Expert Physiotherapy, Backed by Science: At our Hospitals, our physicians collaborate closely with our therapists to provide you with the finest physiotherapy treatments. We  ensuring you receive the highest quality care.</p>
                <a href="#" className="btn btn-primary">view more</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
          <div className="card" style={{width: '20rem'}}>

              
              <img src={p15} className="card-img-top img3" alt=""/>
              <div className="card-body card-height">
                <h5 className="card-title">SURGICAL DEPARTMENT</h5>
                <p className="card-text ">We want to ensure you that you receive the very best surgical outcome which is why we have a comprehensive team of consultants specializing in surgical procedures, so you know you are in the safest hands</p>
                <a href="#" className="btn btn-primary">view more</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
          <div className="card" style={{width: '20rem'}}>

              
              <img src={p16} className="card-img-top img3" alt=""/>
              <div className="card-body card-height">
                <h5 className="card-title">OPD</h5>
                <p className="card-text ">Convenient OPD Services: Experience hassle-free consultations with a diverse panel of specialist doctors through our efficient and user-friendly OPD service. Seek expert medical advice easily and efficiently at Lanka Hospitals.</p>
                <a href="#" className="btn btn-primary">view more</a>
              </div>
            </div>
          </div>
        </div>  
    </div>
    <div className="carousel-item">
    <div className="row column-card">
          <div className="col-md-4">
          <div className="card" style={{width: '20rem'}}>

              
              <img src={p17} className="card-img-top img3" alt=""/>
              <div className="card-body card-height">
                <h5 className="card-title">EYE CLINIC</h5>
                <p className="card-text ">We are the only private eye clinic in Sri Lanka to offer a complete range of services in one central location, led by local and foreign consultant ophthalmologists with highly trained nurses</p>
                <a href="#" className="btn btn-primary">view more</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
          <div className="card" style={{width: '20rem'}}>

              
              <img src={p19} className="card-img-top img3" alt=""/>
              <div className="card-body card-height">
                <h5 className="card-title">RADIOLOGY SERVICES</h5>
                <p className="card-text ">Our radiology services are on par with some of the best hospitals in the region and by far one of the most impressive in Sri Lanka with state-of-the-art equipment ranging from MRI, CT, Ultra sound and routine and special radiological procedures.</p>
                <a href="#" className="btn btn-primary">view more</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
          <div className="card" style={{width: '20rem'}}>

              
              <img src={p18} className="card-img-top img3" alt=""/>
              <div className="card-body card-height">
                <h5 className="card-title">PHARMACIES</h5>
                <p className="card-text ">Accessible Medications, Anytime: Lanka Pharmacies cater to your urgent medication needs with round-the-clock service. Our reliable team ensures minimal wait times and a comprehensive range of pharmaceutical products.</p>
                <a href="#" className="btn btn-primary">view more</a>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  <button className="carousel-control-prev slider-icon " type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}
