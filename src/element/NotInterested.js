import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoggedNav from "../components/LoggedNav";
import $ from "jquery";

function NotInterested(props) {
  const navigate = useNavigate();
  let role = localStorage.getItem("role");
  const { state } = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setbookingId] = useState("");
  useEffect(() => {
    var title = `Order Rejection | CHEF | CHEF REPUBLIC`;
    var desc = "Provide a reason for rejection of the order. If you want user to reschedule please add the time and date so that the user can reschedule."
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
    if (!bookingId || bookingId === null || bookingId === undefined) {
      navigate(-1);
      window.location.reload();
    }
    setbookingId(bookingId)
    // eslint-disable-next-line
  }, []);
  const cancelOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    if (!$("#Cancelation_reason").val()) {
      $(".validation").html("Please add Reason for Decline");
      setIsSubmitting(false)
    } else {
      let data = await fetch(
        `${process.env.REACT_APP_BASE_URL}status/approve_decline_booking`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking_id: bookingId.toString(),
            cancellation_reason: $("#Cancelation_reason").val(),
            status: "8"
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
        style={{ width: "96%", margin: "auto" }}
      >
        <div className="header text-center mt-5 pt-5 mb-3">
          <h2 className="fw-bold">Please let the customer know why </h2>
        </div>
        <div className="textarea w-100">
          <textarea
            className="border border-1 "
            id="Cancelation_reason"
            style={{
              borderRadius: "10px",
              backgroundColor: "rgba(128, 128, 128,0.3)",
              width: "100%",
            }}
            cols="30"
            rows="10"
            placeholder="Please let the customer know if you want him to
                    reschedule or add a reason for rejection"
          ></textarea>
        </div>
        <h6 className="text-center error-msg validation">{""}</h6>
        <div className="submit d-flex flex-column text-center my-3 mx-3">
          <button className="px-5 py-2 my-2 btn-orange" onClick={cancelOrder} disabled={isSubmitting}>{isSubmitting ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            ""
          )}{" "}Submit</button>
          <button onClick={() => navigate(-1)} className="px-5 py-2 my-1 btn-white">Cancel</button>
        </div>
      </div>
    </>
  );
}

export default NotInterested;
