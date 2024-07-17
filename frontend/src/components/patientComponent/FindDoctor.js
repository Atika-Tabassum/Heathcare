import { React, Fragment, useState, useEffect } from 'react'
import Header from '../general/Header';
import { Link } from 'react-router-dom';
import './doctor.css';
import './hospital.css';

const FindDoctor = () => {

    const [doctors, setDoctors] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isCheckedRound, setIsCheckedRound] = useState(false);
    const [existingAppointments, setExistingAppointments] = useState([]);
    const [doctor_specializationArr, setDoctor_specializationArr] = useState([]);

    const handleToggleRound = () => {
        console.log('clicked');
        setIsCheckedRound(!isCheckedRound);
        console.log(isCheckedRound + 'set');
    };

    const switchStyle = {
        position: 'relative',
        display: 'inline-block',
        width: '60px',
        height: '34px'
    };

    const sliderStyle = {
        position: 'absolute',
        cursor: 'pointer',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isCheckedRound ? '#f08080' : '#ccc',
        transition: '.4s',
        borderRadius: '34px'
    };

    const sliderBeforeStyle = {
        position: 'absolute',
        content: '""',
        height: '26px',
        width: '26px',
        left: '4px',
        bottom: '4px',
        backgroundColor: 'white',
        transition: '.4s',
        transform: isCheckedRound ? 'translateX(26px)' : 'translateX(0)',
        borderRadius: '50%'
    };

    const getDoctors = async () => {
        try {
            // TODO: patient id fix 
            // const patientId = 1;
            const patientId = localStorage.getItem("userId");
            const res = await fetch(`http://localhost:3001/healthcare/doctors?patient_id=${patientId}`);
            const data = await res.json();
            console.log(data.data);
            setDoctors(data.data);
            setExistingAppointments(data.appointment);
            setDoctor_specializationArr(data.specializationArray);
            console.log('LLLLL')
            console.log(data.specializationArray);

        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    const onChangeFunc = (e) => {
        setInputValue(e.target.value);
    };

    const bookAppointment = async (doctorId) => {
        try {
            console.log(doctorId);
            // TODO: patient id fix
            // const user = localStorage.getItem("user");
            const patientId = localStorage.getItem("userId");
            console.log(patientId);
            const res = await fetch(`http://localhost:3001/healthcare/appointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    doctor_id: doctorId,
                    patient_id: patientId
                }),
            });
            window.location.reload();

        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    }

    const getSpecializations = (doctorId) => {
        const doctor = doctor_specializationArr.find(doc => doc.doctor_user_id === doctorId);
        const all = doctor ? doctor.specializations.join(', ') : '';
        console.log("all: ")
        console.log(all)
        return all;
    };



    useEffect(() => {
        getDoctors();
    }, []);
    return <Fragment>
        <Header />
        <div className='search-bar'>
            <div><h4>Search Doctors:</h4></div>
            <label htmlFor="search"></label>
            <input
                type="text"
                id="search"
                onChange={onChangeFunc}
                value={inputValue}
                style={{
                    marginBottom: '15px',
                    width: '300px',
                    marginRight: '10px',
                    height: '40px',
                    fontFamily: 'Montserrat',
                    fontSize: '15px',
                    paddingLeft: '10px',
                    borderStyle: 'solid',
                    borderRadius: '3px',
                    borderColor: 'lightgray',
                    borderWidth: '0.2px',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
                }}
                placeholder='Search'
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    <label style={switchStyle}>
                        <input
                            type="checkbox"
                            checked={isCheckedRound}
                            onChange={handleToggleRound}
                            style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={sliderStyle}>
                            <span style={sliderBeforeStyle}></span>
                        </span>
                    </label>
                </div>
                <span style={{ marginLeft: '10px' }}>filter by specialization</span>
            </div>
        </div>
        <div className='doctor-data-container'>
            <div className='doctor-data'>
                <div className='doctor-name' style={{ fontWeight: '600' }}>Doctor name</div>
                <div className='doctor-hospital' style={{ fontWeight: '600' }}>Hospital name</div>
                <div className='doctor-specialization' style={{ fontWeight: '600' }}>Doctor specialization</div>
            </div>
            {doctors.filter((item) => {
                if (inputValue.toLowerCase() === '') {
                    return item;
                } else if (isCheckedRound) {
                    return item.specialisation.toLowerCase().includes(inputValue.toLowerCase());
                } else {
                    return item.name.toLowerCase().includes(inputValue.toLowerCase());
                }
            }).map(doctor => (
                <div className='doctor-data' key={doctor.user_id}>
                    <div className='doctor-name'>
                        <Link to={`/${doctor.user_id}/doctorprofile`} className="link-style">{doctor.name}</Link>
                        <div className='tool-tip'>
                            {doctor.email}
                        </div>
                    </div>
                    <div className='doctor-hospital'>
                        {doctor.hospital_name}
                    </div>
                    <div className='doctor-specialization'>
                        {getSpecializations(doctor.user_id)}
                    </div>

                    {Array.isArray(existingAppointments) ?
                        (
                            (existingAppointments.filter((item) => item.doctor_user_id === doctor.user_id).length === 0) ? (
                                <button className='book-btn' style={{ backgroundColor: 'skyblue' }} onClick={() => { bookAppointment(doctor.user_id) }}>
                                    Get an appointment
                                </button>
                            ) : (
                                (existingAppointments.filter((item) => item.doctor_user_id === doctor.user_id)[0].status === 'pending') ?
                                    (
                                        <button className='book-btn' style={{ backgroundColor: '#FDE47F' }} disabled>
                                            Requested
                                        </button>
                                    ) :
                                    (
                                        <button className='book-btn' style={{ backgroundColor: 'lightgreen' }} disabled>
                                            Approved
                                        </button>

                                        // {
                                        //     <button className='book-btn' style={{ backgroundColor: 'lightgreen' }} onClick={() => { bookAppointment(doctor.user_id) }}>
                                        //     Get an appointment
                                        // </button>
                                        // }
                                        // <button className='book-btn' style={{backgroundColor:'lightyellow'}} disabled>
                                        //     Requested
                                        // </button>

                                    ))
                        ) : (
                            <></>
                        )
                    }
                </div>
            ))}

        </div>
    </Fragment>
}

export default FindDoctor