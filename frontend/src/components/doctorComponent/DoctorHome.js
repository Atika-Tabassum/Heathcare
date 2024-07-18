import React, { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../homeComponent/homepage.css';
import '../homeComponent/page.css';
import '../general/general.css';
import img1 from '../general/logo.svg';
import img2 from '../general/user.svg';
import image1 from '../general/view.svg';
import image2 from '../homeComponent/clinic-building.svg';
import image3 from '../general/notification.svg';
import image5 from '../homeComponent/contact-us.svg';
import image6 from '../general/appointment.svg';
import c1 from '../homeComponent/facebook.svg';
import c2 from '../homeComponent/instagram.svg';
import c3 from '../homeComponent/twitter.svg';
import c4 from '../homeComponent/whatsapp.svg';


const DoctorHome = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const myProfile = () => {
    navigate(`/${userId}/myprofile`);
  };

  const handleNotifications = () => {
    navigate(`/${userId}/notifications`);
  };

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

      <div className="page-container">
        <div className="page-content">
          <div className="page-title">Welcome to <name style={{ color: '#991767' }}>CareConnect</name> </div>
          <div class="motto" style={{ color: '#991767', fontWeight: '600', fontSize: '18px' }}>"Your Health Our Priority"</div>
          <div class="page--description">
            Welcome to <name style={{ color: '#991767' }}>CareConnect</name>, your trusted partner in health and wellness.<br />                                                             
            We offer comprehensive services including primary care, specialty consultations, telemedicine, mental health support, diagnostic services, and personalized wellness programs. Our
            experienced team prioritizes compassionate, patient-centered care using the latest medical technologies. Accessible and
            committed to excellence, we strive to improve your health and well-being with every interaction.
          </div>
        </div>
        {/* <div style={{display:'flex', justifyContent:'center', fontSize:'18px', fontWeight:'600'}}>Updates</div> */}
        <div className="services">
          <button className="service-icons"
            onClick={() => navigate(`/${userId}/appointments`)}>
            <img src={image6} alt="appointment" className="clinic-icon" />
            <div className="tool-tip">appointments</div>
          </button>
          <button
            className="service-icons"
            onClick={() => navigate(`/${userId}/orgmedicalcamp`)}
          >
            <img src={image2} alt="medical camp" className="clinic-icon" />
            <div className="tool-tip">organize a free medical camp</div>
          </button>
          <button
            className="service-icons"
            onClick={() => navigate(`/${userId}/org_camps`)}
          >
            <img src={image1} alt="medical camp" className="clinic-icon" />
            <div className="tool-tip">view your medical camps</div>
          </button>
          <button className="service-icons"
            onClick={() => navigate(`/${userId}/chat_preview`)}>
            <img src={image5} alt="appointment" className="clinic-icon" />
            <div className="tool-tip">chats</div>
          </button>
        </div>
      </div>

      {/* <navbar className="navbar">
        <div className="navbar-icons">
          <img src={image5} alt="contact us" className="contact-us-icon" />
          <div className="tool-tip">Contact Us</div>
        </div>
      </navbar> */}

      {/* <navbar className="navbar2">
        <div className="bottom-icon">
          <img src={image6} alt="about us" className="about-us-icon" />
          <div className="tool-tip">About Us</div>
        </div>
      </navbar> */}

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
    </Fragment>
  );
};

export default DoctorHome;
