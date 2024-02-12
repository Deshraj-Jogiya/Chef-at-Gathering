import React from "react";
import Nav from "../components/Nav";
import OTPVerifyComponent from "../components/OTPVerify";

function OTPVerify(props) {
  return (
    <>
      <Nav />
      <OTPVerifyComponent image={props.image} customer={props.customer} />
    </>
  );
}

export default OTPVerify;
