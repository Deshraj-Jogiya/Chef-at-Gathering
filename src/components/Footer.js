import React from "react";
import image from "../images/logo.png";
import fb from "../images/icons/fb.png";
import insta from "../images/icons/in.png";
import twitter from "../images/icons/tw.png";
import { isMobile } from "react-device-detect";

function Footer(props) {
  return (
    <>
      <footer className="py-4" style={props.top ? { top: 0 } : {}}>
        <div className="d-flex justify-content-between flex-row">
          <div className={isMobile ? "container d-flex justify-content-start align-items-center" : "container d-flex justify-content-center align-items-center"}>
            <a className="navbar-brand" href="/">
              <img src={image} alt="chef-republic-logo" />
            </a>
          </div>
          <div className="container d-flex justify-content-center" id="footerAltMarkup">
            <div className="navbar-nav d-flex flex-row justify-content-center align-items-center">
              <a className="nav-link mx-1" aria-current="page" href="https://www.facebook.com/profile.php?id=100088092789495">
                <img src={fb} alt="brand-logo" />
              </a>
              <a className="nav-link mx-1" href="https://twitter.com/chefrepublic_us">
                <img src={twitter} alt="brand-logo" />
              </a>
              <a className="nav-link mx-1" href="https://www.instagram.com/chef_republic_us/">
                <img src={insta} alt="brand-logo" />
              </a>
            </div>
          </div>
          <div className={isMobile ? "container d-flex justify-content-center align-items-center text-end" : "container d-flex justify-content-center align-items-center"}>
            Copyrights reserved ©
          </div>
        </div>
        <div className="container d-flex justify-content-center my-3 mobile-footer">
          <div className="navbar-nav d-flex flex-row justify-content-center align-items-center">
            <a className="nav-link mx-1" aria-current="page" href="https://www.facebook.com/profile.php?id=100088092789495">
              <img src={fb} alt="brand-logo" />
            </a>
            <a className="nav-link mx-1" href="https://twitter.com/chefrepublic_us">
              <img src={twitter} alt="brand-logo" />
            </a>
            <a className="nav-link mx-1" href="https://instagram.com/chef.republic.us?igshid=NGExMmI2YTkyZg==">
              <img src={insta} alt="brand-logo" />
            </a>
          </div>
        </div>
        <div className="container d-flex justify-content-center my-3">
          <div className="navbar-nav d-flex flex-row justify-content-center align-items-center" style={{
            color: "#8E8E8E"
          }}>
            <a className="nav-link mx-1 text-center" href={props.customer ? "/terms-and-conditions" : "/chef/terms-and-conditions"}>
              Term & Conditions
            </a>
            <a className="nav-link mx-1 text-center" href="mailto:support@chefrepublic.us">
              Support
            </a>
            <a className="nav-link mx-1 text-center" href={props.customer ? "/privacy-policy" : "/chef/privacy-policy"}>
              Privacy Policy
            </a>
          </div>
        </div>
      </footer >
    </>
  );
}

export default Footer;
