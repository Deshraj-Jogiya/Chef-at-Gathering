import React from "react";
import coverBgChef from "../../images/coverBgChef.png";
import { Link } from "react-router-dom";

function ChefCover() {
  return (
    <>
      <div id="cover">
        <div
          id="chefcoverBack"
          style={{
            background: `url(${coverBgChef}) bottom center`,

          }}
          className="d-flex flex-column align-items-center"
        ></div>
        <div
          id="chefcoverShadow"
        >
          <div className="d-flex flex-column align-items-center" id="chefcover">
            <h1 className="text-center mt-4 fw-bold">
              Apply to join the network of <br /> independent Private Chefs
            </h1>
            <h5 className="text-center mt-3">
              Chef Republic provides a platform where users can directly hire services of a Private Chef
            </h5>
            <div className="text-center mt-2">
              <Link to={localStorage.getItem("token") ? localStorage.getItem("role") === "2" ? "/chef/order-list" : "/chef-list" : "/chef/sign-up"} className="btn-orange mx-2">
                Sign Up
              </Link>
              <Link to={localStorage.getItem("token") ? localStorage.getItem("role") === "2" ? "/chef/order-list" : "/chef-list" : "/chef/sign-in"} className="btn-white mx-2">
                Sign In
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default ChefCover;
