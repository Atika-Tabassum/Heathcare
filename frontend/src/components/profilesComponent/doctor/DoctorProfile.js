import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../general/Header'
import userimg from '../../general/user.svg'
import './dp.css'
const DoctorProfile = () => {
    const [info, setInfo] = useState({});

    const userId = useParams().userId;
    console.log(userId);
    const getDoctorInfo = async () => {
        try {
            const res = await fetch(`http://localhost:3001/healthcare/doctors/${userId}`);
            const data = await res.json();
            setInfo(data.data);
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDoctorInfo();
    }, []);


    return <Fragment>
        <Header />
        <body>
            <div className='user-img'>
                <img className='img1' src={userimg} alt='user' />
                <div className='doctor-info'>
                    <div style={{ padding: '10px' }}>{info.name}</div>
                    <div style={{ padding: '10px' }}>({info.specialisation})</div>
                </div>
            </div>
            <div className='doctor-info-list'>
                <div style={{ padding: '10px' }}><strong>Contact: </strong> {info.contact || 'not available'}</div>
                <div style={{ padding: '10px' }}><strong>Email: </strong>{info.email || 'not available'}</div>
                <div style={{ padding: '10px' }}><strong>Hospital: </strong>{info.hospital_name || 'not available'}</div>
            </div>
        </body>
    </Fragment>
}

export default DoctorProfile