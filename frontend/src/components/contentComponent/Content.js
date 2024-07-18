import React, { useState, useEffect, Fragment } from "react";
import ReactPlayer from "react-player";
import "./Content.css";
import Header1 from "../general/header1";
import image6 from "../homeComponent/about-us.svg";

const Content = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState([]);

  const aboutUs = () => {
    window.location.href = "http://localhost:3000/aboutus";
  };


  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/contents`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setContent(data.data);
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
      <Header1></Header1>

      <div class="page-content">
        <div class="page-title">Welcome to <name style={{ color: '#991767' }}>CareConnect</name></div>
        <div class="motto" style={{ color: '#991767', fontWeight: '600', fontSize: '18px' }}>"Your Health Our Priority"</div>
      </div>
      <navbar class="navbar">
        {/* <div class="navbar-icons">
          <img src={image4} onClick={goToNearbyHospital} alt="location" className="location-icon" />
          <div class="tool-tip">Find nearby Hospitals</div>
        </div>
        <div class="navbar-icons">
          <img src={image5} onClick={goToBloodDonation} alt="contact us" className="contact-us-icon" />
          <div class="tool-tip">Need Blood?</div>
        </div> */}
      </navbar>
      <section>
        {/* <h1 align='center'><i>Contents</i></h1> */}
        <div className="content">
          <ul>
            {Array.isArray(content) ? (
              content.map((item) => (
                <li key={item.content_id}>
                  <h4>{item.topic}</h4>
                  <p>{item.description}</p>
                  <ReactPlayer
                    url={item.video}
                    controls={true}
                    width="100%"
                    height="250px"
                  />
                </li>
              ))
            ) : (
              <div>
                <p>No content available</p>
              </div>
            )}
          </ul>
        </div>
      </section>
      <navbar class="navbar2">
        <div class="bottom-icon">
          <img src={image6} onClick={aboutUs} alt="about us" className="about-us-icon" />
          <div class="tool-tip">About Us</div>
        </div>
      </navbar>
    </Fragment>
  );
};

export default Content;
