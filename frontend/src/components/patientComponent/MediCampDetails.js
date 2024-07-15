import React, { Fragment, useEffect, useState } from 'react'
import Header from '../general/Header'

const MediCampDetails = () => {

    const [camps, setCamps] = useState([]);
    const getAllCamps = async () => {
        try {
            const response = await fetch('http://localhost:3001/camps');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching camp details:', error);
        }
    };

    // Call the function to fetch data
    getAllCamps();


    useEffect(() => {
        getAllCamps();
    }, []);

    return <Fragment>
        <Header />
        <body>
            <div>
                <h1>Medical Camps</h1>
                {
                    camps.map(camp => (
                        <div>
                            <h3>{camps.camp_id}</h3>
                            <p>{camps.camp_date}</p>
                            <p>{camps.camp_location}</p>
                        </div>
                    ))
                }
            </div>
        </body>
    </Fragment>
}

export default MediCampDetails