import React from "react";
import LoggedNav from "../components/LoggedNav";
import { useNavigate } from "react-router-dom";
import { FaCheck } from 'react-icons/fa';

function TipAmountSent(props) {
  let navigate = useNavigate();
  React.useEffect(() => {
    var title = `Tip Amount Confirmation | CHEF REPUBLIC`;
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
      if (localStorage.getItem("from_msg")) {
        navigate("/message-list")
      } else{
        navigate("/order-detail")
      }
    },
      5000
    )
  })
  return (
    <>
      <LoggedNav customer={props.customer} />
      <div className="container d-flex justify-content-center align-items-center" style={{ height: "90vh" }} >
        <div className="d-flex justify-content-center align-items-center flex-column center-body-container" style={{ height: "250px" }} >
          <FaCheck size="12rem" className="check_symbol" />
          <h5 className="text-center mt-3" style={{ fontWeight: 700, width: "90%" }} >Done</h5>
          <p className="text-center mt-2" style={{ width: "90%" }}>Your Tip Amount has been sent to the Private Chef. Thank You!!</p>
        </div>
      </div>
    </>
  );
}

export default TipAmountSent;
