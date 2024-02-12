import React from "react";
import Nav from "../components/Nav";
import SignUpComponent from "../components/SignUp";

function SignUp(props) {
  return (
    <>
      <Nav customer={props.customer} />
      <SignUpComponent image={props.image} customer={props.customer} />
    </>
  );
}

export default SignUp;
