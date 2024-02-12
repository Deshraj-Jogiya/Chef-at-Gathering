import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoggedNav from "../components/LoggedNav";
import $ from 'jquery';
import reminder from "../images/icons/reminder.png"

function Reminder(props) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [bookerName, setBookerName] = useState("");
  const { state } = useLocation();
  const updateMealPrep = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    if ($("input:checkbox[name=inp1]:checked").val() === undefined) {
      setIsSubmitting(false)
      $(".validation").html("Please turn off Burners/Oven")
    } else if ($("input:checkbox[name=inp2]:checked").val() === undefined) {
      setIsSubmitting(false)
      $(".validation").html("Please load the Dish Washer")
    } else if ($("input:checkbox[name=inp3]:checked").val() === undefined) {
      setIsSubmitting(false)
      $(".validation").html("Please clean the Kitchen")
    } else {
      $(".validation").html("");
      let data = await fetch(
        `${process.env.REACT_APP_BASE_URL}status/chef_meal_preparation_complete`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking_id: bookingId.toString(),
            status: "6"
          }),
        }
      );
      let parsedData = await data.json();
      if (parsedData.status === true) {
        setIsSubmitting(false);
        navigate("/chef/great-job", {
          state: { bookingId: bookingId, bookerName: bookerName },
        })
      }
      else {
        navigate(-1)
      }
    }
  }
  useEffect(() => {
    var title = "Reminder on Meal Prep Completion | CHEF | CHEF REPUBLIC"
    var desc = "This provides reminder to the Private Chef that once the order is complete, they must confirm that the burners are off, dish washer is loaded and kitchen is clean"
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

    const { bookingId, bookerName } = state;
    if (bookingId) {
      setBookingId(bookingId)
    } else {
      navigate(-1)
    }
    if (bookerName) {
      setBookerName(bookerName)
    } else {
      navigate(-1)
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <LoggedNav customer={props.customer} />

      <div
        className="container d-flex flex-column
            justify-content-center align-items-center "
        style={{ width: "95%", margin: "auto", height: "80vh" }}
      >
        <div
          className="logo text-center fw-bold my-5 p-3"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ff5e41",
            color: "white",
            borderRadius: "50%",
            fontSize: "2.5rem",
            height: "100px",
            width: "100px",
          }}
        >
          <img src={reminder} alt="" style={{ width: "95%" }} />
        </div>
        <div className="header text-center fw-bold my-3">
          <h1 className="fw-bold">Reminder </h1>
        </div>
        <div className="d-flex flex-column">
          <div className="form-check m-3">
            <input className="form-check-input shadow-none" type="checkbox" value={1} name="inp1" />
            <label style={{ color: "#00000087", fontSize: "0.9rem", marginLeft: "5px" }} className="form-check-label">
              Please confirm that the Burners and oven if used are turned off
            </label>
          </div>
          <div className="form-check m-3">
            <input className="form-check-input shadow-none" type="checkbox" value={1} name="inp2" />
            <label style={{ color: "#00000087", fontSize: "0.9rem", marginLeft: "5px" }} className="form-check-label">
              Please confirm that the dish washer is loaded
            </label>
          </div>
          <div className="form-check m-3">
            <input className="form-check-input shadow-none" type="checkbox" value={1} name="inp3" />
            <label style={{ color: "#00000087", fontSize: "0.9rem", marginLeft: "5px" }} className="form-check-label">
              Please confirm the kitchen is clean.
            </label>
          </div>
        </div>
        <p style={{ color: "red", fontSize: "0.8rem" }} className="validation text-center">{""}</p>
        <div className="submit text-center my-3 mx-3">
          <button onClick={updateMealPrep} className="btn-orange" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              ""
            )}{" "}Confirm</button>
        </div>
      </div>
    </>
  );
}

export default Reminder;
