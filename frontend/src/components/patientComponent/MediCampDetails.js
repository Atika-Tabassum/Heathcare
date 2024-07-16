import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../general/Header';
import './camp.css';

const MediCampDetails = () => {
    const [camps, setCamps] = useState([]);
    const [campDoctors, setCampDoctors] = useState([]);
    const [bookedCamps, setBookedCamps] = useState([]);

    const getAllCamps = async () => {
        try {
            const response = await fetch('http://localhost:3001/camps');
            const data = await response.json();
            setCamps(data.data);
            setCampDoctors(data.campsWithDoctors);
        } catch (error) {
            console.error('Error fetching camp details:', error);
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    const toggleBooking = (campId) => {
        const alreadyBooked = bookedCamps.some(camp => camp.camp_id === campId);

        if (alreadyBooked) {
            // Cancel booking
            setBookedCamps(bookedCamps.filter(camp => camp.camp_id !== campId));
        } else {
            // Book camp
            const campToBook = camps.find(camp => camp.camp_id === campId);
            if (campToBook) {
                setBookedCamps([...bookedCamps, campToBook]);
            }
        }
    };

    useEffect(() => {
        getAllCamps();
    }, []);

    return (
        <Fragment>
            <Header />
            <div className='camp-container'>
                <div style={{ margin: '90px' }}>
                    <h1 style={{ fontSize: '35px', display: 'flex', justifyContent: 'center', fontStyle: 'italic', textShadow: '7px 7px 7px rgba(0, 0, 0, 0.15)', paddingBottom: '40px' }}>
                        Medical Camps
                    </h1>
                    {camps.map(camp => (
                        <div className='link-styles' key={camp.camp_id}>
                            <ul className='camp-details'>
                                <li>
                                    <div className='camp-title'>{camp.description}</div>
                                    <strong>Details:</strong>
                                    <div className='camp-date' style={{ marginTop: '10px' }}><strong>Date: </strong>{formatDate(camp.camp_date)}</div>
                                    <div className='camp-location'><strong>Location: </strong>{camp.location}</div>
                                    <div className='camp-organizer'><strong>Organizer: </strong>{camp.hospital_name}</div>
                                    <div className='camp-doctors'>
                                        <strong>Doctors: </strong>
                                        {campDoctors[camp.camp_id] && campDoctors[camp.camp_id].length > 0 ?
                                            campDoctors[camp.camp_id].map((doctor, index) => (
                                                <span key={index}>{doctor.doctor_name} ({doctor.specialisation}){index !== campDoctors[camp.camp_id].length - 1 ? ', ' : ''}</span>
                                            )) :
                                            'no data available'}
                                        <div className='booking' style={{ paddingTop: '15px' }}>
                                            <button style={{
                                                height: '30px',
                                                fontFamily: 'Montserrat', backgroundColor: bookedCamps.some(booked => booked.camp_id === camp.camp_id) ? 'lightcoral' : 'lightblue',
                                                color: 'black', border: 'none', borderRadius: '2px', padding: '5px'
                                            }} onClick={() => toggleBooking(camp.camp_id)}>
                                                {bookedCamps.some(booked => booked.camp_id === camp.camp_id) ? 'Cancel' : 'Book'}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
                <div className='camp-book'>
                        <div className='booked-camps-container'>
                            <h2>
                                Booked Camps
                            </h2>
                            {bookedCamps.length > 0 ? (
                                bookedCamps.map(camp => (
                                    <ul key={camp.camp_id} className='booked-camp'>
                                        <li>
                                            <div className='camp-title'>{camp.description}</div>
                                            <strong>Details:</strong>
                                            <div className='camp-date' style={{ marginTop: '10px' }}><strong>Date: </strong>{formatDate(camp.camp_date)}</div>
                                            <div className='camp-location'><strong>Location: </strong>{camp.location}</div>
                                        </li>
                                    </ul>
                                ))
                            ) : (
                                <div>No camps booked.</div>
                            )}
                        </div>
                </div>
            </div>
        </Fragment>
    );
};

export default MediCampDetails;
