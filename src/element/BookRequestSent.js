import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedNav from "../components/LoggedNav";
import { FaCheck } from 'react-icons/fa';
import { isMobile } from "react-device-detect";

function BookRequestSent(props) {
  let navigate = useNavigate();
  useEffect(() => {
    var title = "Booking Request Confirm | CHEF REPUBLIC"
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

    setTimeout(() => {
      navigate("/chef-list")
    },
      5000
    )
  })
  return (
    <>
      <LoggedNav customer={props.customer} />
      <div className="container d-flex justify-content-center align-items-center" style={{ height: "90vh" }} >
        <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: "350px", width: isMobile ? "90%" : "390px", boxShadow: isMobile ? "" : "0px 0px 8px rgba(0, 0, 0, 0.1)", borderRadius: isMobile ? "" : "20px", padding: "28px" }} >
          <FaCheck size="12rem" className="check_symbol" />
          <h5 className="text-center mt-3" style={{ fontWeight: 700, width: isMobile ? "100%" : "90%" }} >Booking request has been sent to Private Chef</h5>
          <p className="text-center mt-2" style={{ width: isMobile ? "100%" : "90%" }}>The Private Chef will reach out to you soon.</p>
        </div>
      </div>
    </>
  );
}

export default BookRequestSent;
