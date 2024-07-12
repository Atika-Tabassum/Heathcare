import { React, Fragment } from 'react';
import './homepage.css';
import '../../general.css';
import img1 from './huhu.svg';
import img2 from './user.svg';
import image1 from './find_doctor.svg';
import image2 from './ambulance.svg';
import image3 from './clinic-building.svg';
import image4 from './location.svg';
import image5 from './contact-us.svg';
import image6 from './about-us.svg';

const Home = () => {
  const myProfile = () => {
    window.location.href = "http://localhost:3001/users/1/myprofile";
  };

  return <Fragment>
    <header>
      <div class="header-icons">
        <div class="logo-section">
          <img src={img1} alt="logo" className="logo-icon" />
          <div class="description">
            Personal Healthcare Assistant
          </div>
        </div>
        <button class="user-dashboard" onClick={myProfile}>
          <div class="user-section">
            <img src={img2} alt="user" className="user-icon" />
          </div>
        </button>
      </div>
    </header>
    <navbar class="navbar">
      <div class="navbar-icons">
        <img src={image1} alt="find doctor" className="find-doctor-icon" />
        <div class="tool-tip">
          Find Doctor
        </div>
      </div>
      <div class="navbar-icons">
        <img src={image2} alt="ambulance" className="ambulance-icon" />
        <div class="tool-tip">
          Emergency services
        </div>
      </div>
      <div class="navbar-icons">
        <img src={image3} alt="clinic" className="clinic-icon" />
        <div class="tool-tip">
          get an appointment
        </div>
      </div>
      <div class="navbar-icons">
        <img src={image4} alt="location" className="location-icon" />
        <div class="tool-tip">
          Find nearby Hospitals
        </div>
      </div>
      <div class="navbar-icons">
        <img src={image5} alt="contact us" className="contact-us-icon" />
        <div class="tool-tip">
          Contact Us
        </div>
      </div>


    </navbar>
    <navbar class="navbar2">
      <div class="bottom-icon">
        <img src={image6} alt="about us" className="about-us-icon" />
        <div class="tool-tip">
          About Us
        </div>
      </div>
    </navbar>

  </Fragment>
}

export default Home;
