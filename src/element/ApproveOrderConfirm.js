import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedNav from "../components/LoggedNav";
import image from "../images/icons/licon1.png";

function NotInterestedConfirm(props) {
  const navigate = useNavigate();
  const [booking_by_user_profile_image, setBooking_by_user_profile_image] = useState()
  const [booking_by_username, setBooking_by_username] = useState()
  const [booking_by_customer_id, setBookingUserId] = useState()
  const [booking_id, setBooking_id] = useState()
  const [booking_order_id, setBooking_order_id] = useState()
  let role = localStorage.getItem("role");
  const { state } = useLocation()
  useEffect(() => {
    var title = `Order Approval Confirmation | CHEF | CHEF REPUBLIC`;
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
    const { booking_by_user_profile_image, booking_by_username, booking_status, booking_id, booking_by_customer_id, booking_order_id } = state;
    setBooking_by_user_profile_image(booking_by_user_profile_image);
    setBooking_by_username(booking_by_username);
    setBookingUserId(booking_by_customer_id);
    setBooking_id(booking_id);
    setBooking_order_id(booking_order_id);
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
          <h1 className="fw-bold">Great! We’ve notified the customer</h1>
        </div>
        <div className="message text-center my-3 fw-bold">
          <p>
            You can now chat with <br /> the customer to get more details
          </p>
        </div>
        <div className="logo text-center fw-bold ">
          <img
            src={image}
            alt=""
            className="my-5"
            style={{
              borderRadius: "50%",
              backgroundColor: "#EDEDED",
              width: "90px",
              height: "90px",
              padding: "25px",
            }}
          />
        </div>
        <div className="submit text-center my-3 mx-3">
          <button className="px-5 py-2 rounded-pill btn btn-orange" onClick={() => { navigate("/chef/message-view", { state: { data: { booked_chef_profile_image: booking_by_user_profile_image, booked_chef: booking_by_username, booking_status: "Hired", booking_id: booking_id, first_msg: "Hi", booking_by_customer_id: booking_by_customer_id, booking_order_id: booking_order_id } } }) }}>
            Say Hi
          </button>
        </div>
      </div>
    </>
  );
}

export default NotInterestedConfirm;
