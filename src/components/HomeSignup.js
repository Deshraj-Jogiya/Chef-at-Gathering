import React from "react";

function HomeSignup() {
  return (
    <>
      <div className="row m-0 p-0" id="HomeSignup">
        <div className="col-sm-6" id="signup-chef">
          <h5>Sign Up to hire a chef</h5>
          <a href="/sign-up" className="btn btn-primary my-3">
            Sign Up
          </a>
        </div>
        <div className="col-sm-6" id="apply-chef">
          <h5>Apply as a chef</h5>
          <a href="/chef/sign-up" className="btn btn-primary my-3">
            Apply
          </a>
        </div>
      </div>
    </>
  );
}

export default HomeSignup;
