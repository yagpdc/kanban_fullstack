import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import screenHeroImage from "../assets/screen-hero.jpg";
import facebookIcon from "../assets/png/facebookicon.png";
import instagramIcon from "../assets/png/instagramicon.png";
import linkedinIcon from "../assets/png/linkedinicon.png";

export const Login = () => {
  const usernameRef = useRef(null);
  const navigate = useNavigate();

  function HandleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("usernameId", usernameRef.current.value);
    usernameRef.current.value = "";
    navigate("/task");
  }

  return (
    <div className="screen">
      <div className="login_hero">
        <div className="login_container">
          <h2 className="title">Kanban Project</h2>
          <form className="login_form" onSubmit={HandleSubmit}>
            <label htmlFor="username">Choose a nickname</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username..."
              required
              ref={usernameRef}
            />
            <button>Login</button>
          </form>
          <div className="login_link">
            <ul>
              <li>
                <a href="">
                  <img src={facebookIcon} alt="" />
                </a>
              </li>
              <li>
                <a href="">
                  <img src={linkedinIcon} alt="" />
                </a>
              </li>
              <li>
                <a href="">
                  <img src={instagramIcon} alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="screen_hero">
          <img src={screenHeroImage} alt="" />
        </div>
      </div>
    </div>
  );
};
