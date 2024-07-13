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



import React, { Fragment, useState } from 'react';
import Map from './Map';

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

  return (
    <Fragment>
      <button onClick={() => updateLocation(23.8103, 90.4125, 'D')}>recenter</button>
      <Map 
        latitude={selectedLocation.latitude} 
        longitude={selectedLocation.longitude} 
        markerLabel={selectedLocation.markerLabel} 
      />
    </Fragment>
  );
}

export default EmergencyService;


