import LoggedNav from "../components/LoggedNav";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import $ from "jquery";
function AtLocation(props) {
  const navigate = useNavigate();
  const [bookingId, setbookingId] = useState("");
  const [bookerName, setbookerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  let role = localStorage.getItem("role");
  const { state } = useLocation();
  useEffect(() => {
    var title = "Chef Arrived | CHEF | CHEF REPUBLIC"
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
    const { bookingId, bookerName } = state;
    if (!bookingId || bookingId === null || bookingId === undefined || !bookerName || bookerName === null || bookerName === undefined) {
      navigate(-1);
      window.location.reload();
    }
    setbookingId(bookingId)
    setbookerName(bookerName)
    // eslint-disable-next-line
  }, []);
  const updateArrived = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    let data = await fetch(
      `${process.env.REACT_APP_BASE_URL}status/update_status_by_chef`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_id: bookingId.toString(),
          status: "4"
        }),
      }
    );
    let parsedData = await data.json();
    if (parsedData.status === true) {
      setIsSubmitting(false);
      navigate("/chef/at-location/confirm", {
        state : {bookingId : bookingId}
      })
    }
    else {
      navigate(-1)
    }
  }
  return (
    <>
      <LoggedNav customer={props.customer} />

      <div className="container" style={{ width: "96%", margin: "auto" }}>
        <div
          className="d-flex flex-column justify-content-center
           align-items-center mt-5"
        >
          <div className="header text-center fw-bold my-3">
            <h1 className="fw-bold">
              Looks like you've arrived at the service location
            </h1>
          </div>
          <div className="message text-center my-3 mx-3 fw-bold">
            <p>Should we inform {bookerName}?</p>
          </div>
          <div className="mt-1 ">
            <button type="button" onClick={() => { navigate(-1) }} className="btn-white  me-3 ">
              No
            </button>
            <button type="button" onClick={updateArrived} className="btn-orange" disabled={isSubmitting}>{isSubmitting ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              ""
            )}{" "}
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AtLocation;
