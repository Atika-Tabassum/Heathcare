import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import Header from "../general/Header";
import "../homeComponent/homepage.css";
import "../homeComponent/page.css";
import "../general/general.css";
import image5 from "../homeComponent/contact-us.svg";
import image6 from "../homeComponent/about-us.svg";

const Profile = () => {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/myprofile`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const data = await response.json();
      setUser(data.data[0]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setIsLoading(false);
    }
  };

  const goToBloodDonation = () => {
    // TODO: blood donation link fix
    window.location.href = "http://localhost:3000/showDonors";
  };

  const updateDonationStatus = async (status) => {
    try {
      console.log("frontend profile.js");
      const response = await fetch(`http://localhost:3001/bloodDonation/${userId}/updateDonationStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ will_donate_blood: status }),
      });
      if (!response.ok) {
        throw new Error("Failed to update donation status");
      }
      const data = await response.json();
      setUser((prevUser) => ({ ...prevUser, will_donate_blood: status }));
    } catch (error) {
      console.error("Error updating donation status:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <Header />

      <navbar className="navbar">
        <div className="navbar-icons">
          <img src={image5} alt="contact us" className="contact-us-icon" />
          <div className="tool-tip">Contact Us</div>
        </div>
        <div className="navbar-icons">
          <img src={image5} onClick={goToBloodDonation} alt="contact us" className="contact-us-icon" />
          <div className="tool-tip">Need Blood?</div>
        </div>
      </navbar>

      <navbar className="navbar2">
        <div className="bottom-icon">
          <img src={image6} alt="about us" className="about-us-icon" />
          <div className="tool-tip">About Us</div>
        </div>
      </navbar>
      
      <div className="page-container" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", backgroundColor: "#ffc0cb", borderRadius: "5px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <div className="page-content">
         <h2 style={{ marginBottom: "20px", textAlign: "center" }}>User Profile</h2>
         <div style={{ marginBottom: "15px" }}>
            <p><b>Name: </b> {user.name}</p>
            <p><b>Email: </b> {user.email}</p>
            <p><b>Ready to Donate Blood? </b> {user.will_donate_blood ? "Yes" : "No"}</p>
         </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
         <button onClick={() => updateDonationStatus(true)} style={{ marginRight: "10px", padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#ff69b4", color: "#fff", border: "none", borderRadius: "5px" }}>Yes, I will donate</button>
         <button onClick={() => updateDonationStatus(false)} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#ff69b4", color: "#fff", border: "none", borderRadius: "5px" }}>No, I won't donate</button>
      </div>
      </div>
      </div>
    </Fragment>
  );
};

export default Profile;
