import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./bookAmbulance.css";

const typeList = ["AC", "ICU", "CCU", "NICU", "Freezing"];

const Modal = ({ message, onClose }) => (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <p>{message}</p>
        </div>
    </div>
);

const BookAmbulance = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [mobile, setMobile] = useState("");
    const [type, setType] = useState("");
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMessage, setShowMessage] = useState("");
    const [bookingMessage, setBookingMessage] = useState("");

    useEffect(() => {
        console.log("Component mounted, fetching hospitals...");
        fetch("http://localhost:3001/hospitalForAmb/getAllHospital")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched hospitals data:", data);
                setHospitals(data.data);
            })
            .catch((err) => console.log("Error received", err));
    }, []);

    const onBookButtonClick = async (e) => {
        e.preventDefault();
        console.log("onBookButtonClick function is triggered");
        console.log("Name:", name);
        try {
            const body = {
                name,
                location,
                mobile,
                type,
                selectedHospital,
            };
    
            const response = await fetch("http://localhost:3001/ambulance/bookAmbulance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
    
            const responseData = await response.json();
            console.log("Response Data:", responseData);
    
            if (!response.ok) {
                setShowMessage(responseData.message);
                setIsModalOpen(true);
                return;
            }
    
            localStorage.setItem("name", responseData.name);
            localStorage.setItem("location", responseData.location);
            localStorage.setItem("mobile", responseData.mobile);
            localStorage.setItem("type", responseData.type);
            localStorage.setItem("selectedHospital", responseData.selectedHospital);

            // Display booking confirmation message
            setBookingMessage("Ambulance is coming soon.");
            setIsModalOpen(true);

        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setBookingMessage("");
    };

    return (
        <div className="page-container-2-amb">
            <form className="layoutamb">
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
                    <button onClick={onBookButtonClick}
                        className='bookButton' 
                        type="button"
                    >Book</button>
                </div>
            </form>
            
            {isModalOpen && (
                <Modal message={bookingMessage} onClose={closeModal} />
            )}
        </div>
    );
};

export default BookAmbulance;
