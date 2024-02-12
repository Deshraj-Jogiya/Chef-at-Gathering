import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoggedNav from "../components/LoggedNav";
import $ from "jquery";

function GreatJob(props) {
  const navigate = useNavigate();
  let role = localStorage.getItem("role");
  const [bookingId, setbookingId] = useState("");
  const [bookerName, setbookerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useLocation();
  useEffect(() => {
    var title = "Meal Prep Completion Confirmation | CHEF | CHEF REPUBLIC"
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

  const updateComplete = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    if (!$("#feedback-input").val()) {
      setIsSubmitting(false)
      $(".validation").html("Please write something to improve our service")
    } else {
      $(".validation").html("");
      let data = await fetch(
        `${process.env.REACT_APP_BASE_URL}feedback/add_feedback`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking_id: bookingId.toString(),
            feedback: $("#feedback-input").val()
          }),
        }
      );
      let parsedData = await data.json();
      if (parsedData.status === true) {
        setIsSubmitting(false);
        navigate("/chef/order-list")
      }
      else {
        navigate(-1)
      }
    }
  }
  return (
    <>
      <LoggedNav customer={props.customer} />

      <div
        className="container d-flex flex-column
            justify-content-center align-items-center"
        style={{ width: "95%", margin: "" }}
      >
        <div className="header text-center mt-5 pt-5 mb-3">
          <h1 className="fw-bold">Great Job! </h1>
        </div>
        <div className="message text-center my-3 mx-2 fw-bold">
          <p>
            {bookerName} must be licking his fingers after having that delicious meal
          </p>
        </div>
        <div className="message text-center my-3 ">
          <h5 className="fw-bold" style={{ color: "black", fontWeight: "900" }}>
            Please provide us feedback so we can improve our services
          </h5>
        </div>
        <div className="textarea w-100">
          <textarea
            className="form-control shadow-none"
            id="feedback-input"
            style={{
              borderRadius: "10px",
              backgroundColor: "rgba(128, 128, 128,0.3)",
              width: "100%",
            }}
            rows="10"
            placeholder="Enter Feedback here"
          ></textarea>
        </div>
        <p style={{ color: "red", fontSize: "0.8rem" }} className="validation text-center">{""}</p>
        <div className="submit d-flex flex-column text-center my-3 mx-3">
          <button onClick={updateComplete} className="px-5 py-2 my-2 btn-orange" disabled={isSubmitting}>{isSubmitting ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            ""
          )}{" "}Submit</button>
          <button onClick={()=> {navigate("/chef/order-list")}} className="px-5 py-2 my-1 btn-white">Later</button>
        </div>
      </div>
    </>
  );
}

export default GreatJob;
