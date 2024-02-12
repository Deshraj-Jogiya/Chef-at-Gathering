import React from "react";
import Nav from "../components/Nav";
import SignInComponent from "../components/SignIn";

function SignIn(props) {
  return (
    <>
      <Nav customer={props.customer} />
      <SignInComponent image={props.image} customer={props.customer} />
    </>
  );
}

export default SignIn;
