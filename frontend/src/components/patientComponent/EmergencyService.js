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
  const [hospital_ambulance_map, sethospital_ambulance_map] = useState([]);
  const [availableArr, setavailableArr] = useState([]);
  const [totalAvailable, settotalAvailable] = useState(0);

  const getAmbulances = async () => {
    try {
      const response = await fetch("http://localhost:3001/getambulance");
      const jsonData = await response.json();
      setambulances(jsonData.data);
      console.log("pppppp");
      console.log(jsonData.data);
      sethospital_ambulance_map(jsonData.ambulance_hospital_map);
      setavailableArr(jsonData.availableAmbulances);
      console.log("///");
      console.log(jsonData.availableAmbulances);
      console.log(".....");
      settotalAvailable(jsonData.totalAvailable);
      console.log(jsonData.totalAvailable);
    } catch (error) {
      console.error(error.message);
    }
  }

  const bookAmbulance = async (id) => {
    console.log("booked");
    try {
      const bookingId = id;
      console.log("hihihi" + bookingId);
      const response = await fetch(`http://localhost:3001/bookambulance/${bookingId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  }


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
                <div style={{ borderStyle: 'solid', borderColor: 'lightgray', borderWidth: '0.5px', margin: '10px', paddingLeft: '20px' }}>
                  <h4>Ambulance: {ambulance}</h4>
                  <h5>Hospital:</h5>
                  <ul>
                    {hospital_ambulance_map[ambulance]?.map((name, idx) => (
                      <li key={idx}>{name}</li>
                    ))}
                    {availableArr.includes(ambulance) ? <button style={{ fontFamily: 'Montserrat', backgroundColor: 'lightblue', color: 'black', border: 'none', borderRadius: '2px', padding: '5px' }} onClick={() => { bookAmbulance(ambulance) }}>Book</button> : <button style={{ fontFamily: 'Montserrat', backgroundColor: 'lightcoral', color: 'black', border: 'none', borderRadius: '2px', padding: '5px' }}>Not Available</button>}
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


