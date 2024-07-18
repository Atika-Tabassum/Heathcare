import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./viewcamp.css";
import Header from "../../general/Header";
import img1 from "../../homeComponent/about-us.svg";
import img2 from "../../homeComponent/contact-us.svg";
import img3 from "../../general/location.svg";

const ViewCamp = () => {
  const userId = useParams().userId;
  const [isLoading, setIsLoading] = useState(true);
  const [camps, setCamps] = useState([]);
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

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

      <div className="camp-details">
        <div style={{ margin: "90px" }}>
          <h1
            style={{
              fontSize: "35px",
              display: "flex",
              justifyContent: "center",
              fontStyle: "italic",
              textShadow: "7px 7px 7px rgba(0, 0, 0, 0.15)",
              paddingBottom: "40px",
            }}
          >
            Medical Camps
          </h1>
          <div className="camps-grid">
            {camps.map((camp) => (
              <div className="camp-card" key={camp.camp_id}>
                <div className="camp-title">{camp.description}</div>
                <strong>Details:</strong>
                <div className="camp-date" style={{ marginTop: "10px" }}>
                  <strong>Date: </strong>
                  {formatDate(camp.camp_date)}
                </div>
                <div className="camp-location">
                  <strong>Location: </strong>
                  {camp.ward_name}, {camp.union_name}, {camp.upazila_name},{" "}
                  {camp.district_name}, {camp.division_name}
                  {<br />}
                  {<br />}
                  <Link
                    to={`/${camp.camp_id}/camp_details`}
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    Learn more about the campaign
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewCamp;
