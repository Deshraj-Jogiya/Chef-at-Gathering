import React from "react";
import money from "../../images/icons/money.png";
import spoon from "../../images/icons/spoon.png";
import cart from "../../images/icons/cart.png";
import note from "../../images/icons/note.png";
import phone from "../../images/icons/phone.png";
function HowWorks() {
  return (
    <div className="py-5" id="HowWorksChef">
      <h3 className="text-center py-2">How it works?</h3>
      <div className="container my-3 text-center">
        <div className="row d-flex  justify-content-center">
          <div
            className="col-md-4 d-flex flex-column justify-content-between align-items-center my-3"
            style={{
              height: "140px",
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            <img src={note} alt="" style={{ maxWidth: "70px" }} />
            <h6>Sign Up with Chef Republic</h6>
          </div>
          <div
            className="col-md-4 d-flex flex-column justify-content-between align-items-center my-3"
            style={{
              height: "140px",
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            <img src={phone} alt="" style={{ maxWidth: "70px" }} />
            <h6>Accept Bookings</h6>
          </div>
          <div
            className="col-md-4 d-flex flex-column justify-content-between align-items-center my-3"
            style={{
              height: "140px",
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            <img src={cart} alt="" style={{ maxWidth: "70px" }} />
            <h6 style={{ position: "relative", bottom: "0px" }}>
              Pick Groceries (If ordered)
            </h6>
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
              Arrive and Prep Meal
            </h6>
          </div>
          <div
            className="col-md-4 d-flex flex-column justify-content-between align-items-center my-3"
            style={{
              height: "140px",
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            <img src={money} alt="" style={{ maxWidth: "70px" }} />
            <h6 style={{ position: "relative", bottom: "0px" }}>
              Get Paid
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowWorks;
