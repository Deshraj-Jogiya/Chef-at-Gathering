import React from "react";
import coverBgCustomer from "../images/coverBgCustomer.png";
import { Link } from "react-router-dom";

function CustomerCover() {
  return (
    <>
      <div id="cover">
        <div
          id="customercoverBack"
          style={{
            background: `url(${coverBgCustomer}) bottom center`,

          }}
          className="d-flex flex-column align-items-center"
        ></div>
        <div
          id="customercoverShadow"
        >
          <div className="d-flex flex-column align-items-center" id="customercover">
            <h1 className="text-center mt-4 fw-bold">
              On Demand Private <br /> Chef
            </h1>
            <h5 className="text-center mt-3">
              Hire Private Chef to prep upto 16 fresh homemade healthy meals, all for
            </h5>
            <h4 className="text-center fs-3 fw-bold">
              $109
            </h4>
            <div className="text-center mt-2">
              <Link to={localStorage.getItem("token") ? localStorage.getItem("role") === "2" ? "/chef/order-list" : "/chef-list" : "/sign-up"} className="btn-orange mx-2">
                Sign Up
              </Link>
              <Link to={localStorage.getItem("token") ? localStorage.getItem("role") === "2" ? "/chef/order-list" : "/chef-list" : "/sign-in"} className="btn-white mx-2">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerCover;
