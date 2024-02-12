import React from "react";
import Nav from "../components/Nav";
import PaymentDetailComponent from "../components/PaymentDetail";

function PaymentDetail(props) {
  return (
    <>
      <Nav customer={props.customer} />
      <PaymentDetailComponent image={props.image} customer={props.customer} />
    </>
  );
}

export default PaymentDetail;
