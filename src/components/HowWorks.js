import React from "react";
import location from "../images/icons/location.png";
import spoon from "../images/icons/spoon.png";
import cart from "../images/icons/cart.png";
function HowWorks() {
  return (
    <div className="py-5" id="HowWork">
      <h3 className="text-center py-2 fw-bold">How it works?</h3>
      <div className="container my-3 text-center">
        <div className="row">
          <div
            className="col-md-4 d-flex flex-column justify-content-between align-items-center my-3"
            style={{
              height: "140px",
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            <img src={cart} alt="" style={{ maxWidth: "70px" }} />
            <h6>Select your preferences and Request a Private Chef</h6>
          </div>
          <div
            className="col-md-4 d-flex flex-column justify-content-between align-items-center my-3"
            style={{
              height: "140px",
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            <img src={location} alt="" style={{ maxWidth: "70px" }} />
            <h6>Private Chef Arrives at your Location</h6>
          </div>
          <div
            className="col-md-4 d-flex flex-column justify-content-between align-items-center my-3"
            style={{
              height: "140px",
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            <img src={spoon} alt="" style={{ maxWidth: "70px" }} />
            <h6 style={{ position: "relative", bottom: "0px" }}>
              Chef Preps Meal and Cleans Up
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowWorks;
