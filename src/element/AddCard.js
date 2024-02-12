import React from "react";
import Nav from "../components/Nav";
import LoggedNav from "../components/LoggedNav";
import AddCardComponent from "../components/AddCard";

function AddCard(props) {
  return (
    <>
      {localStorage.getItem("token") ? <LoggedNav customer={props.customer} /> : <Nav customer={props.customer} />}
      <AddCardComponent image={props.image} customer={props.customer} />
    </>
  );
}

export default AddCard;
