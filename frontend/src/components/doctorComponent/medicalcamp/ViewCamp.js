import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../general/Header";
import img1 from "../../homeComponent/about-us.svg";
import img2 from "../../homeComponent/contact-us.svg";
import img3 from "../../general/location.svg";

const ViewCamp = () => {
  const userId = useParams().userId;
  const [isLoading, setIsLoading] = useState(true);
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/view/${userId}/org_camps`)
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
    <Fragment>
      <Header />
      <navbar className="navbar">
        <div className="navbar-icons">
          <img src={img2} alt="contact us" className="contact-us-icon" />
          <div className="tool-tip">Contact Us</div>
        </div>
      </navbar>

      <navbar className="navbar2">
        <div className="bottom-icon">
          <img src={img1} alt="about us" className="about-us-icon" />
          <div className="tool-tip">About Us</div>
        </div>
      </navbar>

      <div className="page-container">
        <div className="page-content"></div>
        <h1>Camps</h1>
        <ul>
          {Array.isArray(camps) ? (
            camps.map((item) => (
              <li key={item.camp_id}>
                <h2>{item.description}</h2>
                <p>{item.camp_date}</p>
                <div className="location-info">
                  <img src={img3} alt="location" className="location-icon" />
                  <span>{item.location}</span>
                </div>
                <Link to={`/${item.camp_id}/camp_details`}>
                  <p>View details of the campaign</p>
                </Link>
              </li>
            ))
          ) : (
            <div>
              <p>No camp available</p>
            </div>
          )}
        </ul>
      </div>
    </Fragment>
  );
};

export default ViewCamp;
