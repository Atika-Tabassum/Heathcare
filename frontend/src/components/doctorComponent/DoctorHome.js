import { React, Fragment } from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import '../homeComponent/homepage.css';
import '../homeComponent/page.css';
import '../general/general.css';
import img1 from '../general/logo.svg';
import img2 from '../general/user.svg';
import image1 from '../homeComponent/clinic-building.svg';
import image2 from '../homeComponent/clinic-building.svg';
import image5 from '../homeComponent/contact-us.svg';
import image6 from '../homeComponent/about-us.svg';
import c1 from '../homeComponent/facebook.svg';
import c2 from '../homeComponent/instagram.svg';
import c3 from '../homeComponent/twitter.svg';
import c4 from '../homeComponent/whatsapp.svg';


const DoctorHome = () => {
  
  const navigate = useNavigate();
  const userId = useParams().userId;

  const myProfile = () => {
    navigate(`/${userId}/myprofile`);
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
    <div class="page-container">
      <div class="page-content">
        <div class="page-title">
          Welcome to *name *
        </div>
        <div class="motto">
          *motto likhbo*
        </div>
        <div class="page-description">
          *decription*
        </div>
      </div>
      <div>
        *services*
      </div>
      <div class="services">

        
        <button class="service-icons">
          <img src={image1} alt="appointment" className="clinic-icon" />
          <div class="tool-tip">
            appointments
          </div>
        </button>
        <button class="service-icons" onClick={()=>{navigate(`/${userId}/orgmedicalcamp`)}}>
          <img src={image2} alt="medical camp" className="clinic-icon" />
          <div class="tool-tip">
           organize a free medical camp
          </div>
        </button>
        <button class="service-icons" onClick={()=>{navigate(`/${userId}/org_camps`)}}>
          <img src={image2} alt="medical camp" className="clinic-icon" />
          <div class="tool-tip">
           view your medical camps
          </div>
        </button>
      </div>
    </div>


    <navbar class="navbar">
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

export default DoctorHome;
