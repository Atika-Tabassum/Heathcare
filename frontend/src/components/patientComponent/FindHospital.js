import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useState } from 'react';
import Header from '../general/Header';
import './hospital.css';
import { Link } from 'react-router-dom';

const FindHospital = () => {
    const [hospitals, setHospitals] = useState([]);
    const getHospitals = async () => {
        const res = await fetch('http://localhost:3001/healthcare/hospitals');
        const data = await res.json();
        setHospitals(data);
    }

    useEffect(() => {
        getHospitals();
    }, []);

    return <Fragment>
        <Header />
        <body style={{ marginTop: '-30px' }}>
            <div className='hospital-data-container'>
                <div className='hospital-data'>
                    <div className='hospital-name' style={{ fontWeight: '600' }}>hospital name</div>
                    <div className='hospital-address' style={{ fontWeight: '600' }}>hospital address</div>
                </div>
                {hospitals.map(hospital => (
                    <div className='hospital-data'>
                        <div className='hospital-name'><Link to={`${hospital.email}`} className="link-style">{hospital.name}</Link></div>
                        <div className='hospital-address'>{hospital.address}</div>
                    </div>
                ))}
            </div>
        </body>
    </Fragment>
}

export default FindHospital