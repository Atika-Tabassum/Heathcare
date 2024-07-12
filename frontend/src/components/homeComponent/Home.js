import { React, Fragment } from 'react';
import './homepage.css';
import './page.css';
import img2 from '../general/user.svg';
import Header from '../general/Header';
import image1 from '../general/find_doctor.svg';
import image2 from './ambulance.svg';
import image3 from './clinic-building.svg';
import image4 from './location.svg';
import image5 from './contact-us.svg';
import image6 from './about-us.svg';
import image7 from './awareness.svg';
import c1 from './facebook.svg';
import c2 from './instagram.svg';
import c3 from './twitter.svg';
import c4 from './whatsapp.svg';

const Home = () => {


  const myProfile = () => {
    window.location.href = "http://localhost:3000/1/myprofile";
  };

  const findDoctor = () => {
    window.location.href = "http://localhost:3000/finddoctor";
  };

  return <Fragment>
    <header>
      <div class="header-icons">
        <Header />
        <button class="user-dashboard" onClick={myProfile} >
          <div class="user-section">
            <img src={img2} alt="user" className="user-icon" />
            <div class="user-profile">
              my profile
            </div>
          </div>
        </button>
      </div>
    </header>
    <div class="page-container">
      <div class="page-content">
        <div class="page-title">
          Welcome to *name *
        </div>
        <div class="motto">
          *motto likhbo*
        </div>
        <div class="page-description">
          *description*
        </div>
      </div>
      <div>
        *services*
      </div>
      <div class="services">

        <button class="service-icons" onClick={findDoctor}>
          <img src={image1} alt="find doctor" className="find-doctor-icon" />
          <div class="tool-tip">
            Find Doctor
          </div>
        </button>
        <button class="service-icons">
          <img src={image2} alt="ambulance" className="ambulance-icon" />
          <div class="tool-tip">
            Emergency services
          </div>
        </button>
        <button class="service-icons">
          <img src={image3} alt="clinic" className="clinic-icon" />
          <div class="tool-tip">
            get an appointment
          </div>
        </button>
        <button class="service-icons">
          <img src={image7} alt="awareness" className="awareness-icon" />
          <div class="tool-tip">
            *ki naam dibo*
          </div>
        </button>
      </div>
    </div>


    <navbar class="navbar">
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

    <div class="bottom-bar">
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
    </div>
  </Fragment>
}

export default Home;
