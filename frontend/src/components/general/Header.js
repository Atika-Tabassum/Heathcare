import { react, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./general.css";
import "./header.css";
import img1 from "./logo.svg";
import img2 from "./user.svg";
import img3 from "./notification.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const goHome = () => {
    window.location = "/home";
  };

  const myProfile = () => {
    navigate(`/${userId}/myprofile`);
  };

  const handleNotifications = () => {
    navigate(`/${userId}/notifications`);
  };

  return (
    <Fragment>
      <header>
        <div class="header-icons">
          <div class="logo-section">
            {/* <Link to="/home" className="link-style"></Link> */}
            <img src={img1} alt="logo" className="logo-icon" onClick={goHome} />
            <div class="description">Personal Healthcare Assistant</div>
          </div>

          <div className="spacer"></div>

          <button className="user-dashboard" onClick={handleNotifications}>
            <div className="user-section">
              <img src={img3} alt="notifications" className="user-icon" />
            </div>
          </button>

          
          <button className="user-dashboard" onClick={myProfile}>
            <div className="user-section">
              <img src={img2} alt="user" className="user-icon" />
            </div>
          </button>
          
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
