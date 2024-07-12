import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CampDetails = () => {
  const campId  = useParams().campId;
  const [isLoading, setIsLoading] = useState(true);
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/view/${campId}/camp_details`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setCamps(data.data);
        } else {
          console.error("Received data is not an array:", data);
        }
      })
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.log("Error received:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h1>Camp Details</h1>
      <ul>
        {Array.isArray(camps) ? (
          camps.map((item) => (
            <li key={item.camp_id}>
              <h2>{item.description}</h2>
              <p>{item.location}</p>
              <p>{item.camp_date}</p>
            </li>
          ))
        ) : (
          <div>
            <p>No camp available</p>
          </div>
        )}
      </ul>
    </section>
  );
};

export default CampDetails;
