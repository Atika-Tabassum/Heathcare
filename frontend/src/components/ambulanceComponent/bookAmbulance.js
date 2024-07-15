import React from 'react';
import { useNavigate } from "react-router-dom";
import "./bookAmbulance.css";
import {useState} from 'react';

const typeList = ["AC", "ICU", "CCU", "NICU", "Freezing"];


const BookAmbulance = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [mobile, setMobile] = useState("");
    const [type, setType] = useState("");
    const [hospital, setHospital] = useState("");
    const handleButtonClick = (e) => {
        e.preventDefault();
        alert("DIE");
    }

    return <section>
        <form onSubmit={handleButtonClick}>
        <div className='inputs'>
            <h2>Book an Ambulance</h2>
            <input onChange={(e)=> setName(e.target.value)}
              value = {name} 
              type = "text" 
              name = "Name" 
              placeholder="Name"
            />
            <input onChange={(e)=> setLocation(e.target.value)}
              value = {location}
              type = "text" 
              name = "Location" 
              placeholder="Location"
            />
            <input onChange={(e)=> setMobile(e.target.value)}
              value = {mobile}
              type = "text" 
              name = "Mobile" 
              placeholder="Mobile"
            />
            <select onChange={(e)=> setType(e.target.value)} value = {type} name = 'type'>
                {typeList.map((item)=>(
                <option key = {item} value = {typeList[item]}> 
                {item}
                </option>
            ))}
            </select>
            <button>Book</button>
        </div>
        </form>
    </section>;
};

export default BookAmbulance;
