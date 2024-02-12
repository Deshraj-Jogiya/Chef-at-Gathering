import React from "react";
import image from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { RiArrowLeftSLine } from 'react-icons/ri';

function Nav(props) {
  let navigate = useNavigate();
  const goToNav1 = () => {
    const element = document.getElementById(props.customer ? 'customercover' : "chefcover");
    if (element && props.home) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = props.customer ? '/' : "/chef"
    }
  }
  const goToNav2 = () => {
    const element = document.getElementById(props.customer ? 'diet-offer' : "whyRepublic");
    if (element && props.home) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }else {
      window.location.href = props.customer ? '/' : "/chef"
    }
  }
  const goToNav3 = () => {
    const element = document.getElementById(props.customer ? 'HowWork' : "HowWorksChef");
    if (element && props.home) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }else {
      window.location.href = props.customer ? '/' : "/chef"
    }
  }
  const goToNav4 = () => {
    const element = document.getElementById('Benefits');
    if (element && props.home) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }else {
      window.location.href = props.customer ? '/' : "/chef"
    }
  }
  const goToNav5 = () => {
    const element = document.getElementById(props.customer ? 'feedback' : "feedback");
    if (element && props.home) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }else {
      window.location.href = props.customer ? '/' : "/chef"
    }
  }
  return (
    <>
      <nav className="navbar-expand-lg py-3">
        {isMobile ? <div className="d-flex justify-content-evenly align-items-center">
          <div className="col d-flex justify-content-center">
            {props.home ? <Link className="navbar-brand" to={props.customer ? "/" : "/chef"}>
              <img src={image} alt="brand-logo" />
            </Link> : <a className="navbar-brand" onClick={() => { navigate(-1) }}>
              <RiArrowLeftSLine size={"2.3rem"} />
            </a>}
          </div>
          {props.home ? <div className="col d-flex justify-content-evenly">
            <Link
              to={props.customer ? "/chef" : "/"}
              className="btn-orange mx-2"
            >
              {props.customer ? "Chef" : "Home"}
            </Link>
          </div> : <> <div className="col d-flex justify-content-evenly">
            <Link className="navbar-brand" to={props.customer ? "/" : "/chef"}>
              <img src={image} alt="brand-logo" />
            </Link>
          </div>
            <div className="col">
            </div></>}
        </div> : <div className="d-flex justify-content-evenly align-items-center">
          <Link className="navbar-brand" to={props.customer ? "/" : "/chef"}>
            <img src={image} alt="brand-logo" />
          </Link>
          <div
            className="d-flex justify-content-center "
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <Link className="nav-link mx-3 active" aria-current="page" onClick={goToNav1}>
                Home
              </Link>
              <Link className="nav-link mx-3" onClick={goToNav2}>
                {props.customer ? "What we Offer" : "Why Chef Republic"}
              </Link>
              <Link className="nav-link mx-3" onClick={goToNav3}>
                How it works
              </Link>
              {props.customer ? <Link className="nav-link mx-3" onClick={goToNav4}>
                Benefits
              </Link> : null}
              <Link className="nav-link mx-3" onClick={goToNav5}>
                Reviews
              </Link>
            </div>
          </div>
          <Link
            to={props.customer ? "/chef" : "/"}
            className="btn-orange mx-2"
          >
            {props.customer ? "Chef" : "Home"}
          </Link>
        </div>}
      </nav>
    </>
  );
}

export default Nav;
