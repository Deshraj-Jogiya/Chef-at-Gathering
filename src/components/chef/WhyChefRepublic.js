import React from "react";
import clock from "../../images/icons/clock.png";
import money from "../../images/icons/money.png";
import mancharge from "../../images/icons/mancharge.png";
import direction from "../../images/icons/direction.png";

function HowWorks() {
  return (
    <div className="py-5" style={{ background: "rgba(255, 94, 65, .2)" }} id="whyRepublic">
      <h3 className="text-center py-2">Why Chef Republic?</h3>
      <div className="container my-3 text-center">
        <div className="row">
          <div
            className="col-md-3 d-flex flex-column justify-content-start align-items-center my-3"
            style={{
              height: "190px",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            <img
              src={clock}
              alt=""
              style={{ width: "60px", height: "60px" }}
            />
            <div className="my-3">
              <h6><b>Flexible Working Hours</b></h6>
              <p style={{ fontSize: "0.9rem" }}>You can choose your hours to work</p>
            </div>
          </div>
          <div
            className="col-md-3 d-flex flex-column justify-content-start align-items-center my-3"
            style={{
              height: "190px",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            <img
              src={direction}
              alt=""
              style={{ width: "60px", height: "60px" }}
            />
            <div className="my-3">
              <h6><b>Be your Own Boss</b></h6>
              <p style={{ fontSize: "0.9rem" }}>
                You can design your menu, choose your hours and work when you
                want.
              </p>
            </div>
          </div>
          <div
            className="col-md-3 d-flex flex-column justify-content-start align-items-center my-3"
            style={{
              height: "190px",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            <img
              src={money}
              alt=""
              style={{ width: "60px", height: "60px" }}
            />
            <div className="my-3">
              <h6><b>More Money</b></h6>
              <p style={{ fontSize: "0.9rem" }}>
                You get paid anywhere from $25 per hour to $30 per hour for an
                order.
              </p>
            </div>
          </div>
          <div
            className="col-md-3 d-flex flex-column justify-content-start align-items-center my-3"
            style={{
              height: "190px",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            <img
              src={mancharge}
              alt=""
              style={{ width: "60px", height: "60px" }}
            />
            <div className="my-3">
              <h6><b>Less Stress</b></h6>
              <p style={{ fontSize: "0.9rem" }}>
                No Pressures of Restaurant kitchen. Meal Prep at your leisure in
                comforts of your client’s home kitchen
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowWorks;
