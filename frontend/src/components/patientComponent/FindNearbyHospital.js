import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import Header from '../general/Header';
import './FindNearbyHospital.css'; // Ensure this is the correct path to your CSS file

const FindNearbyHospital = () => {
  const [nearbyHospitals, setNearbyHospitals] = useState([]);

  useEffect(() => {
    const fetchNearbyHospitals = async () => {
      const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
      if (userId) {
        try {
          const response = await fetch(`http://localhost:3001/hospitals/nearby/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch nearby hospitals');
          }
          const data = await response.json();
          setNearbyHospitals(data);
        } catch (error) {
          console.error('Error fetching nearby hospitals:', error);
        }
      } else {
        console.error('User ID not found in local storage');
      }
    };

    fetchNearbyHospitals();
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="page-container">
        <h1 align="center">Find Nearby Hospital</h1>
        <div className="hospital-container">
          {nearbyHospitals.length > 0 ? (
            nearbyHospitals.map((hospital) => (
              <div key={hospital.hospital_user_id} className="hospital-card">
                <h3>{hospital.hospital_name}</h3>
                <p>{hospital.description}</p>
                {hospital.image ? (
                  <img
                    src={hospital.image}
                    alt={hospital.hospital_name}
                    className="hospital-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'fallback-image-url.jpg'; // Provide a fallback image URL
                    }}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
            ))
          ) : (
            <p>No nearby hospitals found.</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default FindNearbyHospital;
