import { react, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./general.css";
import "./header.css";
import img1 from "./logo.svg";
import img2 from "./user.svg";

const Header1 = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const goHome = () => {
    window.location = "/home";
  };
  const myProfile = () => {
    navigate("./login");
  };

  return (
    <Fragment>
      <header>
        <div class="header-icons">
          <div class="logo-section">
            <img src={img1} alt="logo" className="logo-icon" onClick={goHome} />
            <div class="description">Personal Healthcare Assistant</div>
          </div>

          <div className="spacer"></div>
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

export default Header1;
