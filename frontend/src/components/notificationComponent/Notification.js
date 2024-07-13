import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../homeComponent/homepage.css";
import "../homeComponent/page.css";
import "../general/general.css";
import img1 from "../general/logo.svg";
import img2 from "../general/user.svg";
import image3 from "../general/notification.svg";
import image5 from "../homeComponent/contact-us.svg";
import image6 from "../homeComponent/about-us.svg";
import c1 from "../homeComponent/facebook.svg";
import c2 from "../homeComponent/instagram.svg";
import c3 from "../homeComponent/twitter.svg";
import c4 from "../homeComponent/whatsapp.svg";

const Notification = () => {
  const navigate = useNavigate();
  const userId = useParams().userId;
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  localStorage.setItem("userId", userId);

  const handleClick = async (campId, select) => {
    try {
      fetch(`http://localhost:3001/view/${userId}/${campId}/${select}/response`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === "success") {
            navigate(`/${userId}/myprofile`);
          } else {
            console.error("Failed to update response:", data);
          }
        });
    } catch (error) {
      console.error("Error occurred while updating response:", error);
    }
  };

  const myProfile = () => {
    navigate(`/${userId}/myprofile`);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/view/${userId}/notifications`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setNotifications(data.data);
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

          <button className="user-dashboard" onClick={myProfile}>
            <div className="user-section">
              <img src={img2} alt="user" className="user-icon" />
            </div>
          </button>

          <button className="user-dashboard">
            <div className="user-section">
              <img src={image3} alt="notifications" className="user-icon" />
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

      <div className="bottom-bar">
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
      </div>

      <div className="page-container">
        <div className="page-content"></div>
        <h1>Notifications</h1>
        <ul>
          {Array.isArray(notifications) && notifications.length > 0 ? (
            notifications.map((item) => (
              <li key={item.notification_id}>
                {item.type === "invitation" ? (
                  <div>
                     {item.description}
                    <Link to={`/${item.camp_id}/camp_details`}>
                      <p>Learn More About the campaign</p>
                    </Link>
                    <button onClick={() => handleClick(item.camp_id, 1)}>
                      <b>Accept</b>
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={() => handleClick(item.camp_id, 0)}>
                      <b>Deny</b>
                    </button>
                  </div>
                ) : (
                  <div>
                    {item.description}
                    <Link to={`/${item.camp_id}/camp_details`}> the camp
                    </Link>
                  </div>
                )}
                <br/>
                <br/>
              </li>
            ))
          ) : (
            <div>
              <p>No notifications available</p>
            </div>
          )}
        </ul>
      </div>
    </Fragment>
  );
};

export default Notification;
