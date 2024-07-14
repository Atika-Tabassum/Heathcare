import React from "react";
import { useNavigate } from "react-router-dom";
import "./ambulanceHomepage.css";

const ambulanceList = [
    {
        id: 0,
        type: "AC",
        description: "An AC ambulance is just an ordinary ambulance which delivers exceptional high-end service.",
    },
    {
        id: 1,
        type: "ICU",
        description: "ICU Ambulance is an emergency service that carries seriously injured patients to the hospital."
    },
    {
        id: 2,
        type: "CCU",
        description: "Critical Care Unit ambulance, similar to ICU but might be specific to cardiac care",
    },
    {
        id: 3,
        type: "NICU",
        description: "NICU Ambulance is specific to care for premature babies and sick newborns.",
    },
    {
        id: 4,
        type: "Freezing",
        description: "The freezing ambulance is used to carry a corpse over long distances.",
    }
];

const AmbulanceHomepage = () => {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/ambulance/${id}`);
    };

    const handleButtonClick = () => {
        navigate("/bookambulance");
    };

    return (
        <div className="page-container">
            <button className="booking" onClick={handleButtonClick}>Book an ambulance</button>
            <h1 className="header">Which type of ambulance do you need?</h1>
            
            <div className="container">
                {ambulanceList.map((item) => (
                    <div key={item.id} className="card" onClick={() => handleCardClick(item.id)}>
                        <h3>{item.type} Ambulance</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AmbulanceHomepage;
