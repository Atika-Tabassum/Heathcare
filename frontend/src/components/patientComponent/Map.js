// import React from 'react';
// import { Fragment } from 'react';
// import './map.css'; 

// const Map = () => {
//   return (
//     <Fragment>
//       <div className='map-container'>
//         <iframe 
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.073292073073!2d79.8613663147725!3d6.927079994993073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afce0b1b1b1b1b1%3A0x7b1b1b1b1b1b1b1!2sKandy%20General%20Hospital!5e0!3m2!1sen!2slk!4v1629783660003!5m2!1sen!2slk&markers=color:red%7Clabel:H%7C6.92708,79.86137"
//           width="600"
//           height="450"
//           style={{ border: 0 }}
//           allowFullScreen=""
//           loading="lazy"
//         ></iframe>
//       </div>
//     </Fragment>
//   );
// }

// export default Map;



import React from 'react';
import { Fragment } from 'react';
import './map.css';

const Map = ({ latitude, longitude, markerLabel }) => {
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.073292073073!2d${longitude - 0.05}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afce0b1b1b1b1b1b1%3A0x7b1b1b1b1b1b1b1!2sKandy%20General%20Hospital!5e0!3m2!1sen!2slk!4v1629783660003!5m2!1sen!2slk&markers=color:red%7Clabel:${markerLabel}%7C${latitude},${longitude}`;
// const mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.073292073073!2d79.8613663147725!3d6.927079994993073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afce0b1b1b1b1b1%3A0x7b1b1b1b1b1b1b1!2sKandy%20General%20Hospital!5e0!3m2!1sen!2slk!4v1629783660003!5m2!1sen!2slk&markers=color:red%7Clabel:H%7C6.92708,79.86137"

  return (
    <Fragment>
      <div className='map-container'>
        <iframe 
          src={mapSrc}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </Fragment>
  );
}

export default Map;

