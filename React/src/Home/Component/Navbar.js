import React from 'react'
import p1 from "./HealthLogo.png"

export default function Navbar() {
  return (
    <div>
        <div className="navbar-wrapper">
                <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                    <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">
                        <img
                            
                            src={p1}
                            alt="Logo"
                            className="rounded-circle p-1 mt-5 profile"
                            width="80"
                          />
                           
                    </a>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" href="/about">Services</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" href="#">Contact us</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" href="/login">Login</a>
                        </li>
                    </ul>
                    
                    </div>
                </div>
                </nav>
            </div>
    </div>
  )
}
