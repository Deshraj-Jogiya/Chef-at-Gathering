import React, { useEffect } from "react";
import LoggedNav from "../components/LoggedNav";
import { useNavigate, useLocation } from "react-router-dom";
import $ from "jquery";

function AtLocationConfirm(props) {
  const navigate = useNavigate();
  const [bookingId, setbookingId] = React.useState("");
  let role = localStorage.getItem("role");
  const { state } = useLocation();
  useEffect(() => {
    var title = "Chef Arrived Confirmation | CHEF | CHEF REPUBLIC"
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
    $(".modal-backdrop").removeAttr("class")
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
        style={{ width: "95%", margin: "auto" }}
      >
        <div className="header text-center mt-5 pt-5 mb-3">
          <h2 className="fw-bold">
            We have notified the customer that you have arrived!!
          </h2>
        </div>
        <div className="message text-center my-2 mx-2 fw-bold">
          <p>
            Prepare the best set of meals your clients have ever had.
          </p>
        </div>
        <div className="submit text-center my-2 mx-3">
          <button className="px-5 py-2  btn-orange" onClick={() => { navigate(
              "/chef/order-detail",
              {
                state: { bookingId: bookingId },
              }
            ); }}>Got It</button>
        </div>
      </div>
    </>
  );
}

export default AtLocationConfirm;
