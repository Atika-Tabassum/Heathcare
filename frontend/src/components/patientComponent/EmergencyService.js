// import React, { Fragment ,useState} from 'react'
// import Map from './Map'

// const EmergencyService = () => {
//   const[selectedLocation, setSelectedLocation] = useState(null);

//   return <Fragment>
//     <Map />
//   </Fragment>
// }

// export default EmergencyService





// import React, { Fragment, useState } from 'react';
// import Map from './Map';

// const EmergencyService = () => {
//   const [selectedLocation, setSelectedLocation] = useState({
//     latitude: 6.92708,
//     longitude: 79.86137,
//     markerLabel: 'H'
//   });

//   const updateLocation = (newLatitude, newLongitude, newLabel) => {
//     console.log(selectedLocation);
//     console.log('Updating location');
//     setSelectedLocation({
//       latitude: newLatitude,
//       longitude: newLongitude,
//       markerLabel: newLabel
//     });
//     console.log('Updated location');
//     console.log(selectedLocation);

//   };

//   return (
//     <Fragment>
//       <button onClick={() => updateLocation(6.92708, 79.86137, 'H')}>Kandy General Hospital</button>
//       <button onClick={() => updateLocation(6.9147, 79.9733, 'C')}>Colombo National Hospital</button>
//       <Map 
//         latitude={selectedLocation.latitude} 
//         longitude={selectedLocation.longitude} 
//         markerLabel={selectedLocation.markerLabel} 
//       />
//     </Fragment>
//   );
// }

// export default EmergencyService;



import React, { Fragment, useEffect, useState } from 'react';
import Map from './Map';
import Header from '../general/Header'
import './emergency.css'

const EmergencyService = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 6.92708,
    longitude: 79.86137,
    markerLabel: 'H'
  });

  const updateLocation = (newLatitude, newLongitude, newLabel) => {
    setSelectedLocation({
      latitude: newLatitude,
      longitude: newLongitude,
      markerLabel: newLabel
    });
  };


  const [ambulances, setambulances] = useState([]);

  const getAmbulances = async () => {
    try {
      const response = await fetch("http://localhost:3001/getambulance");
      const jsonData = await response.json();
      setambulances(jsonData.data);
      console.log(jsonData.data);
      sethospital_ambulance_map(jsonData.ambulance_hospital_map);
    } catch (error) {
      console.error(error.message);
    }
  }

  const [hospital_ambulance_map, sethospital_ambulance_map] = useState([]);



  useEffect(() => {
    getAmbulances();
  }, []);

  return (
    <Fragment>
      <Header />
      <body>
        {/* <div className=".map-container">
          <button onClick={() => updateLocation(23.8103, 90.4125, 'D')}>recenter</button>
          <Map
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
            markerLabel={selectedLocation.markerLabel}
          />
        </div> */}
        <section>
          <div className='ambulance-grid'>
            {ambulances.map((ambulance, index) => (
              <div className='ambulance-booking' key={index}>
                <div style={{borderStyle:'solid', borderColor:'lightgray', borderWidth:'0.5px', margin:'10px', paddingLeft:'20px'}}> 
                  <h4>Ambulance: {ambulance.booking_id}</h4>
                  <h5>Hospital:</h5>
                  <ul>
                    {hospital_ambulance_map[ambulance.booking_id]?.map((name, idx) => (
                      <li key={idx}>{name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

      </body>
    </Fragment>
  );
}

export default EmergencyService;


