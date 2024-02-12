import React from "react";
import logo from "../images/logo.png";
import profile from "../images/Vector.jpg";
import { Link, useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { RiArrowLeftSLine } from 'react-icons/ri';
function LoggedNav(props) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role")
  const token = localStorage.getItem("token")
  return (
    <>
      <nav className="container align-items-center d-flex justify-content-between flex-row py-2">
        {props.main ? <div className="container"></div> : isMobile ? <div className="container">
          <a className="navbar-brand" onClick={() => navigate(props.redirect_to ? props.redirect_to : -1)}>
            <RiArrowLeftSLine size={"2.3rem"} />
          </a>
        </div> : <div className="container"></div>}
        <div className="container d-flex justify-content-center flex-row ">
          <Link className="navbar-brand" to={role === "1" ? "/chef-list" : "/chef/order-list"}>
            <img src={logo} alt="chef-republic-logo" />
          </Link>
        </div>
        <div className="container d-flex justify-content-center align-items-center">
          {token ? <Link to={role === "1" ? "/profile" : "/chef/profile"}>
            <div className="d-flex justify-content-center align-items-center" style={{ boxShadow: "0px 0px 10px rgba(0, 0, 1, 0.15)", borderRadius: "50%" }}>
              <img src={localStorage.getItem("user_image") ? localStorage.getItem("user_image") : profile} alt="profile-icon" style={{ borderRadius: "50%", height: "50px", width: "50px" }} />
            </div>
          </Link> : null}
        </div>
      </nav>
    </>
  );
}

export default LoggedNav;
