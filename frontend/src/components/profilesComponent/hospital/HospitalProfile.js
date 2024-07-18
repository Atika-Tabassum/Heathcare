import { React, Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../general/Header';
import './hp.css';
import img1 from './email.svg';
import img2 from './contact.svg';
import img3 from './address.svg';



const HospitalProfile = () => {

    const [info, setInfo] = useState({});
    const [doctors, setDoctors] = useState([]);
    const userId = useParams().userId;
    const [address, setAddress] = useState('');
    const [doctor_specializationArr, setDoctor_specializationArr] = useState([]);

    const makeAddress = (user) => {
        console.log('user', user);
        const addressFields = [
            user.division_name,
            user.district_name,
            user.upazila_name,
            user.union_name,
            user.ward_name,
            user.village_name,
            user.street_address,
            user.postal_code
        ];

        const fullAddress = addressFields.filter(field => field).join(", ");
        console.log('address', fullAddress);
        return fullAddress;
    }

    const getSpecializations = (doctorId) => {
        const doctor = doctor_specializationArr.find(doc => doc.doctor_user_id === doctorId);
        const all = doctor ? doctor.specializations.join(', ') : '';
        // console.log("all: ")
        // console.log(all)
        return all;
    };


    // console.log(userId);
    const getHospitalInfo = async () => {
        try {
            // console.log('?????' + userId);
            const res = await fetch(`http://localhost:3001/healthcare/getHospitalInfo/${userId}`);
            const data = await res.json();
            setInfo(data.data.hospital);
            setDoctors(data.data.doctors);
            setDoctor_specializationArr(data.data.specializationArray);
            // makeAddress(data.data.hospital);
            setAddress(makeAddress(data.data.hospital));
            // console.log(info);
            // console.log('LLLLL');
            // console.log(doctors);
            // console.log(doctor_specializationArr);

            console.log(data.data.hospital);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getHospitalInfo();
    }, []);

    return (
        <Fragment>
            <Header />
            <body>
                <div className='hospital-profile-container' style={{ paddingTop: '100px' }}>
                    <div className='hospital-profile'>
                        <div className='hospitalname' >
                            {info.name}
                        </div>
                        <div className='hospital-info'>
                            <div className='hospital-address'>
                                <img src={img3} alt='address' />{address}
                            </div>
                            <div className='hospital-email'>
                                <img src={img1} alt='address' /> {info.email}
                            </div>
                            <div className='hospital-contact'>
                                <img src={img2} alt='address' /> {info.contact_no || 'Not available'}
                            </div>
                        </div>
                    </div>
                    <div className='doctors'>
                        <div className='doctor-title' style={{ display: 'flex', justifyContent: 'center', fontSize: '20px', marginTop: '20px', marginBottom: '20px', borderTopStyle: 'solid', borderTopWidth: '0.5px', borderTopColor: 'lightgray', paddingTop: '30px' }}>
                            <strong>Doctors:</strong>
                        </div>
                        <div className='doctors-list'>
                            <div className='doctor-name'>
                                <strong>Name</strong>
                            </div>
                            <div className='doctor-specialisation'>
                                <strong>Specialization</strong>
                            </div>
                            <div className='doctor-contact'>
                                <strong>Contact-info</strong>
                            </div>
                        </div>
                        {doctors.map(doctor => (
                            <div className='doctors-list'>
                                <div className='doctor-name'>
                                    {doctor.name}
                                </div>
                                <div className='doctor-specialization'>
                                    {getSpecializations(doctor.user_id)}
                                </div>
                                <div className='doctor-contact'>
                                    {doctor.contact_no}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </body>
        </Fragment>
    )
}

export default HospitalProfile