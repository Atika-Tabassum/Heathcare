import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./bookAmbulance.css";

const typeList = ["AC", "ICU", "CCU", "NICU", "Freezing"];

const BookAmbulance = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [mobile, setMobile] = useState("");
    const [type, setType] = useState("");
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState("");
    

    useEffect(() => {
        fetch("http://localhost:3001/hospital/getAllHospital")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched hospitals data:", data);
                setHospitals(data.data);
            })
            .catch((err) => console.log("Error received", err));
    }, []);

    const handleButtonClick = (e) => {
        e.preventDefault();
        alert("Booking submitted!");
    }

    return (
        <div className="page-container-2-amb">
            <form className="layoutamb" onSubmit={handleButtonClick}>
                <div className='inputsamb'>
                    <h2 className='bookampheader'>Book an Ambulance</h2>
                    <input className='inputamb'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        name="Name"
                        placeholder="Name"
                    />
                    <input className='inputamb'
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                        type="text"
                        name="Location"
                        placeholder="Location"
                    />
                    <input className='inputamb'
                        onChange={(e) => setMobile(e.target.value)}
                        value={mobile}
                        type="text"
                        name="Mobile"
                        placeholder="Mobile"
                    />
                    <select className='selectamb'
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                        name='type'
                    >
                        {typeList.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <select className='selectamb'
                        onChange={(e) => setSelectedHospital(e.target.value)}
                        value={selectedHospital}
                        name='hospitals'
                    >
                        {hospitals.length > 0 && hospitals.map((item) => (
                            <option key={item.user_id} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <button className='bookButton' type="submit">Book</button>
                </div>
            </form>
        </div>
    );
};

export default BookAmbulance;
