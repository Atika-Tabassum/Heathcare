import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import Header from '../general/Header';
import './hospital.css';

const FindAmbulance = ({ patientUserId, hospitalUserId }) => {
    const [ambulance, setAmbulance] = useState([]);

    const getAmbulance = async () => {
        try {
            const res = await fetch(`http://localhost:3001/ambulance/${patientUserId}/${hospitalUserId}/bookAmbulance`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setAmbulance(data); // Adjust according to your backend response structure
        } catch (error) {
            console.error('Error fetching ambulance data:', error);
        }
    };

    useEffect(() => {
        if (patientUserId && hospitalUserId) {
            getAmbulance();
        }
    }, [patientUserId, hospitalUserId]);

    return (
        <Fragment>
            <Header />
            <div style={{ marginTop: '-30px' }}>
                <div className='ambulance-data-container'>
                    <div className='ambulance-data'>
                        <div className='ambulance-name' style={{ fontWeight: '600' }}>Ambulance Name</div>
                        <div className='hospital-name' style={{ fontWeight: '600' }}>Hospital Name</div>
                    </div>
                    {ambulance.map((item, index) => (
                        <div key={index} className='ambulance-data'>
                            <div className='ambulance-bookingdate'>{ambulance.booking_date}</div>

                            <div className='patient-id'>{ambulance.patent_user_id}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

export default FindAmbulance;
