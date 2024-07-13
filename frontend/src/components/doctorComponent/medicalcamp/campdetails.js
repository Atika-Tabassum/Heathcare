import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../homeComponent/homepage.css";
import "../../homeComponent/page.css";
import "../../general/general.css";
import img1 from "../../general/logo.svg";
import img2 from "../../general/user.svg";
import image3 from "../../general/notification.svg";
import image5 from "../../homeComponent/contact-us.svg";
import image6 from "../../homeComponent/about-us.svg";
// import c1 from "../../homeComponent/facebook.svg";
// import c2 from "../../homeComponent/instagram.svg";
// import c3 from "../../homeComponent/twitter.svg";
// import c4 from "../../homeComponent/whatsapp.svg";

const CampDetails = () => {
  const campId = useParams().campId;
  const [isLoading, setIsLoading] = useState(true);
  const [camps, setCamps] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const myProfile = () => {
    navigate(`/${userId}/myprofile`);
  };

  const handleNotifications = () => {
    navigate(`/${userId}/notifications`);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/view/${campId}/camp_details`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setCamps(data.data);
          if (Array.isArray(data.doctors)) setDoctors(data.doctors);
          else setDoctors([]);
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
      <header>
        <div className="header-icons">
          <div className="logo-section">
            <img src={img1} alt="logo" className="logo-icon" />
            <div className="description">Personal Healthcare Assistant</div>
          </div>

          <div className="spacer"></div>

          <button className="user-dashboard" onClick={handleNotifications}>
            <div className="user-section">
              <img src={image3} alt="notifications" className="user-icon" />
            </div>
          </button>

          <button className="user-dashboard" onClick={myProfile}>
            <div className="user-section">
              <img src={img2} alt="user" className="user-icon" />
            </div>
          </button>
        </div>
      </header>

      <navbar className="navbar">
        <div className="navbar-icons">
          <img src={image5} alt="contact us" className="contact-us-icon" />
          <div className="tool-tip">Contact Us</div>
        </div>
      </navbar>

      <navbar className="navbar2">
        <div className="bottom-icon">
          <img src={image6} alt="about us" className="about-us-icon" />
          <div className="tool-tip">About Us</div>
        </div>
      </navbar>

      {/* <div className="bottom-bar">
        <div className="contact-icons">
          <img src={c1} alt="contact us" />
        </div>
        <div className="contact-icons">
          <img src={c2} alt="contact us" />
        </div>
        <div className="contact-icons">
          <img src={c3} alt="contact us" />
        </div>
        <div className="contact-icons">
          <img src={c4} alt="contact us" />
        </div>
      </div> */}

      <div className="page-container">
        <div className="page-content"></div>
        <h1>Camp Details</h1>
        <ul>
          {Array.isArray(camps) ? (
            camps.map((item) => (
              <li key={item.camp_id}>
                <h2>{item.description}</h2>
                {/* <div classname=> */}
                {item.img && (
                  <img
                    src={`data:image/jpg;base64,${item.img}`}
                    alt="Camp"
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
                {/* </div> */}
                <p>Location : {item.location}</p>
                <p>Date : {item.camp_date}</p>
                <p>
                  <b>Organizer</b>{" "}
                </p>
                <p>Name : {item.name}</p>
                <p>Email : {item.email}</p>
                <p>Contact_no : {item.contact_no}</p>
                <p>
                  <b>Other Doctors </b>
                </p>
                <ul>
                  {doctors.map((doctor) => (
                    <li key={doctor.email}>
                      <p>Name : {doctor.name}</p>
                      <p>Email : {doctor.email}</p>
                      <p>contact_no : {doctor.contact_no}</p>
                    </li>
                  ))}
                </ul>
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

export default CampDetails;
