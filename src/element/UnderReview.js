import React from "react";
import Nav from "../components/Nav";
import underReview from "../images/underReview.png"
import { isMobile } from 'react-device-detect';


function UnderReview(props) {
  React.useEffect(() => {
    var title = "Under Review | CHEF REPUBLIC";
    var desc = "";
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
  }, []);

  return (
    <>
      <Nav customer={props.customer} />
      <div className="container d-flex justify-content-center align-items-center flex-column" style={{ height: "90vh" }}>
        <h3 className="text-center pb-3">Profile Under Review</h3>
        <h6 className="text-center pb-3" style={{ width: isMobile ? "300px" : "600px" }}>Your Profile is currently being reviewed and we need some time to verify your info. We’ll get back to you in 2-3 business days</h6>
        <img src={underReview} alt="" style={{ borderRadius: "50%", backgroundColor: "#EDEDED", width: "180px", height: "180px", padding: "15px" }} />
        <a href="mailto:support@chefrepublic.us" className="text-center pt-3" style={{ textDecoration: "none", color: "#FF5E41", width: isMobile ? "300px" : "600px" }}>Contact Us</a>
      </div>
    </>
  );
}

export default UnderReview;
