import LoggedNav from "../components/LoggedNav";
import { FaCheck } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function GroceryBillConfirm(props) {
  const navigate = useNavigate();
  const [bookingId, setbookingId] = useState("");
  let role = localStorage.getItem("role");
  const { state } = useLocation();
  useEffect(() => {
    var title = "Grocery Bill & Amount Upload Confirmation | CHEF | CHEF REPUBLIC"
    var desc = ""
    const titleTag = document.querySelector('title');
    titleTag.innerText = title;
    const metaTitle = document.querySelector("meta[name='title']");
    metaTitle.setAttribute('content',title)
    const metaDescription = document.querySelector("meta[name='description']");
    metaDescription.setAttribute('content',desc)
    const metaTitleOG = document.querySelector("meta[property='og:title']");
    metaTitleOG.setAttribute('content',title)
    const metaDescriptionOG = document.querySelector("meta[property='og:description']");
    metaDescriptionOG.setAttribute('content',desc)
    const metaTitleTwitter = document.querySelector("meta[property='twitter:title']");
    metaTitleTwitter.setAttribute('content',title)
    const metaDescriptionTwitter = document.querySelector("meta[property='twitter:description']");
    metaDescriptionTwitter.setAttribute('content',desc)

    if (role === null || role !== "2") {
      navigate("/chef/sign-in");
      window.location.reload();
    }
    if (state === null || state === undefined) {
      navigate(-1);
      window.location.reload();
    }
    const { bookingId } = state;

    if (bookingId) {
      setbookingId(bookingId)
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <LoggedNav customer={props.customer} />
      <div
        className="container d-flex flex-column
            justify-content-center align-items-center"
        style={{ width: "96%", margin: "auto" }}
      >
        <div
          className="logo text-center fw-bold mt-5 mb-3 p-3"
          style={{
            backgroundColor: "#ff5e41",
            color: "white",
            borderRadius: "50%",
            fontSize: "1.5rem",
            height: "70px",
            width: "70px",
          }}
        >
          <FaCheck />
        </div>
        <div className="header text-center fw-bold my-4">
          <h1 className="fw-bold">Thanks, this amount will be reimbursed </h1>
        </div>
        <div className="message text-center my-3 mx-4 fw-bold">
          <p>We've also added this amount in the final bill</p>
        </div>
        <div className="submit text-center my-3 mx-3">
          <button className="px-5 py-2 btn-orange" onClick={() => {
            navigate(
              "/chef/order-detail",
              {
                state: { bookingId: bookingId },
              }
            );
          }}>Continue</button>
        </div>
      </div>
    </>
  );
}

export default GroceryBillConfirm;
