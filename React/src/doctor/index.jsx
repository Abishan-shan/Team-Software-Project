import React from 'react';
import './style.css';

function DoctorDashboard() {
    const appoints = [
        {
            'name': 'abinaya',
            'age': 3,
            'gender': 'female',
            'schedule': '08.00am - 09.00am',
            'status': 'pending',
        },
        {
            'name': 'money',
            'age': 6,
            'gender': 'female',
            'schedule': '10.00am - 11.00pm',
            'status': 'pending',
        },
        {
            'name': 'Blue berry',
            'age': 8,
            'gender': 'female',
            'schedule': '11.00am - 12.00pm',
            'status': 'pending',
        }
    ];
    console.log(appoints);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>Health Care</h3>
                            </div>
                        </div>
                        <hr />
                        <div className="col-md-12">
                            <h5>Hi, doctor</h5>
                        </div>
                        <br />
                        <div className="col-md-12">
                            <span className="form-control btn btn-primary">Appointments</span>
                        </div>
                        <br />
                        <div className="col-md-12">
                            <span className="form-control btn btn-primary">Logout</span>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>
                                    List of appointments
                                </h3>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            {appoints.map((appoint) =>
                                <div className="temp">
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label htmlFor="">Patient</label>
                                                    </div>
                                                    <div className="col-md-1">
                                                        :
                                                    </div>
                                                    <div className="col-md-6">
                                                        <strong>{appoint.name}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label htmlFor="">Age :</label>
                                                    </div>
                                                    <div className="col-md-1">
                                                        :
                                                    </div>
                                                    <div className="col-md-6">
                                                        <strong>{appoint.age} years</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label htmlFor="">Gender</label>
                                                    </div>
                                                    <div className="col-md-1">
                                                        :
                                                    </div>
                                                    <div className="col-md-6">
                                                        <strong>{appoint.gender}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label htmlFor="">Schedule</label>
                                                    </div>
                                                    <div className="col-md-1">
                                                        :
                                                    </div>
                                                    <div className="col-md-6">
                                                        <strong>{appoint.schedule}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label htmlFor="">status</label>
                                                    </div>
                                                    <div className="col-md-1">
                                                        :
                                                    </div>
                                                    <div className="col-md-6">
                                                        <strong>{appoint.status}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <button className='btn btn-success form-control'>Approve</button>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <button className='btn btn-danger form-control'>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default DoctorDashboard;