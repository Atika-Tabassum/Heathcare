import { React, Fragment } from "react";
import "./homepage.css";
import "./page.css";
import img2 from "../general/user.svg";
import Header from "../general/Header";
import image1 from "../general/find_doctor.svg";
import image2 from "./ambulance.svg";
import image3 from "./clinic-building.svg";
import image4 from "./location.svg";
import image5 from "./infusion.svg";
import image6 from "./about-us.svg";
import image7 from "./awareness.svg";
import image8 from "../general/notification.svg";
import image9 from "../general/blog.svg";
import { useNavigate } from "react-router-dom";
// import c1 from "./facebook.svg";
// import c2 from "./instagram.svg";
// import c3 from "./twitter.svg";
import c4 from "./chat.svg";

const Home = () => {
  const navigate = useNavigate();
  const myProfile = () => {
    // TODO - userID
    const user_id = localStorage.getItem("userId");
    console.log(user_id);

    window.location.href = `http://localhost:3000/${user_id}/myprofile`;
  };

  const findDoctor = () => {
    window.location.href = "http://localhost:3000/finddoctor";
  };

  const emergencyService = () => {
    window.location.href = "http://localhost:3000/ambulanceHomepage";
  };

  const findHospital = () => {
    window.location.href = "http://localhost:3000/findhospital";
  };

  const goTo = () => {
    window.location.href = "http://localhost:3000/medicalcampdetails";
  };

  const goToNearbyHospital = () => {
    window.location.href = "http://localhost:3000/findnearbyhospital";
  };

  const goToBloodDonation = () => {
    // TODO: blood donation link fix
    window.location.href = "http://localhost:3000/showDonors";
  };

  const aboutUs = () => {
    window.location.href = "http://localhost:3000/aboutus";
  };

  const goToBlog = () => {
    window.location.href = "http://localhost:3000/blog";
  };

  const goToChat = () => {
    const userid= localStorage.getItem("userId");
    window.location.href = `http://localhost:3000/${userid}/chat_preview`;
  };

  return (
    <Fragment>
      <header>
        <div class="header-icons">
          <Header />
          <div className="spacer"></div>

          <button className="user-dashboard">
            <div className="user-section">
              <img src={image8} alt="notifications" className="user-icon" />
            </div>
          </button>

          <button class="user-dashboard" onClick={myProfile}>
            <div class="user-section">
              <img src={img2} alt="user" className="user-icon" />
              <div class="user-profile">my profile</div>
            </div>
          </button>
        </div>
      </header>
      <div class="page-container">
        <div class="page-content">
          <div class="page-title">Welcome to <name style={{ color: '#991767' }}>CareConnect</name></div>
          <div class="motto" style={{ color: '#991767', fontWeight: '600', fontSize: '18px' }}>"Your Health Our Priority"</div>
          <div class="page--description">
            Welcome to <name style={{ color: '#991767' }}>CareConnect</name>, your trusted partner in health and wellness.<br />
            We offer comprehensive services including primary care, specialty consultations, telemedicine, mental health support, diagnostic services, and personalized wellness programs. Our
            experienced team prioritizes compassionate, patient-centered care using the latest medical technologies. Accessible and
            committed to excellence, we strive to improve your health and well-being with every interaction.
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', fontSize: '18px', fontWeight: '600' }}>Our Services</div>
        <div class="services">
          <button class="service-icons" onClick={findDoctor}>
            <img src={image1} alt="find doctor" className="find-doctor-icon" />
            <div class="tool-tip">Find Doctor</div>
          </button>
          <button class="service-icons" onClick={emergencyService}>
            <img src={image2} alt="ambulance" className="ambulance-icon" />
            <div class="tool-tip">Find Emergency Services</div>
          </button>
          <button class="service-icons" onClick={findHospital}>
            <img src={image3} alt="clinic" className="clinic-icon" />
            <div class="tool-tip">Find Hospital</div>
          </button>
          <button class="service-icons" onClick={goTo}>
            <img src={image7} alt="awareness" className="awareness-icon" />
            <div class="tool-tip">Medical Camp</div>
          </button>
          {/* <button className="service-icons" onClick={() => navigate(`/blog`)}>
            <img src={image9} alt="blogs" className="blog-icon" />
            <div className="tool-tip">blogs</div>
          </button> */}
        </div>
      </div>

      <navbar class="navbar">
        <div class="navbar-icons">
          <img
            src={image4}
            onClick={goToNearbyHospital}
            alt="location"
            className="location-icon"
          />
          <div class="tool-tip">Find nearby Hospitals</div>
        </div>
        <div class="navbar-icons">
          <img
            src={image5}
            onClick={goToBloodDonation}
            alt="contact us"
            className="contact-us-icon"
          />
          <div class="tool-tip">Need Blood?</div>
        </div>
        <div class="navbar-icons">
          <img
            src={image9}
            onClick={goToBlog}
            alt="blog"
            className="blog-icon"
            style={{ height: "27px" }}
          />
          <div class="tool-tip" style={{right:'-1px'}}>Blog</div>
        </div>
        <div class="navbar-icons">
          <img
            src={c4}
            onClick={goToChat}
            alt="chat"
            className="chat-icon"
            style={{ height: "27px" }}
          />
          <div class="tool-tip" style={{right:'-1px'}}>Chat</div>
        </div>
      </navbar>
      <navbar class="navbar2">
        <div class="bottom-icon">
          <img
            src={image6}
            onClick={aboutUs}
            alt="about us"
            className="about-us-icon"
          />
          <div class="tool-tip">About Us</div>
        </div>
      </navbar>
      {/* <div class="bottom-bar">
        <div class="contact-icons">
          <img src={c1} alt="contact us" />
        </div>
        <div class="contact-icons">
          <img src={c2} alt="contact us" />
        </div>
        <div class="contact-icons">
          <img src={c3} alt="contact us" />
        </div>
        <div class="contact-icons">
          <img src={c4} alt="contact us" />
        </div>
      </div> */}
    </Fragment>
  );
};

export default Home;
