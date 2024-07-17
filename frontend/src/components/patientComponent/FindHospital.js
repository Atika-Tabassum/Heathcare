import React, { useEffect, useState, Fragment } from 'react';
import Header from '../general/Header';
import { Link } from 'react-router-dom';
import './hospital.css';
// import ToggleSwitch from '../general/ToggleSwitch';

const FindHospital = () => {
    const [hospitals, setHospitals] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isCheckedRound, setIsCheckedRound] = useState(false);
    const [address, setAddress] = useState('');

    const makeAddress = (user) => {
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

    const getHospitals = async () => {
        const res = await fetch('http://localhost:3001/healthcare/hospitals');
        const data = await res.json();
        setHospitals(data);
        console.log(data);
    };

    const onChangeFunc = (e) => {
        setInputValue(e.target.value);
    };


    useEffect(() => {
        getHospitals();
    }, []);


    return (
        <Fragment>
            <Header />
            <div className='search-bar'>
                <div><h4>Search Hospitals:</h4></div>
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
                    <span style={{ marginLeft: '10px' }}>filter by location</span>
                </div>
            </div>
            <div className='hospital-data-container'>
                <div className='hospital-data'>
                    <div className='hospital-name' style={{ fontWeight: '600' }}>hospital name</div>
                    <div className='hospital-address' style={{ fontWeight: '600' }}>hospital address</div>
                </div>
                {hospitals.filter((item) => {
                    if (inputValue.toLowerCase() === '') {
                        return item;
                    } else if (isCheckedRound) {
                        return item.address.toLowerCase().includes(inputValue.toLowerCase());
                    } else {
                        return item.name.toLowerCase().includes(inputValue.toLowerCase());
                    }
                }).map(hospital => (
                    <div className='hospital-data' key={hospital.user_id}>
                        <div className='hospital-name'>
                            <Link to={`/${hospital.user_id}/hospitalprofile`} className="link-style">{hospital.name}</Link>
                            <div className='tool-tip'>
                                {hospital.email}
                            </div>
                        </div>
                        <div className='hospital-address'>{makeAddress(hospital)}</div>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default FindHospital;
