import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import Header from "./general/Header";
import "./homeComponent/homepage.css";
import "./homeComponent/page.css";
import "./general/general.css";
import image5 from "./homeComponent/contact-us.svg";
import image6 from "./homeComponent/about-us.svg";

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
      </navbar>

      <navbar className="navbar2">
        <div className="bottom-icon">
          <img src={image6} alt="about us" className="about-us-icon" />
          <div className="tool-tip">About Us</div>
        </div>
      </navbar>
      <div className="page-container">
        <div className="page-content"></div>
        <p>
          <b>Name:</b> {user.name}
        </p>
        <p>
          <b>Email:</b> {user.email}
        </p>
      </div>
    </Fragment>
  );
};

export default Profile;
