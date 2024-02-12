import React, { useState, useEffect } from "react";
import chatBubble from "../images/icons/chatBubble.png";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

function ContactUsPop(props) {
  const [data, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const checkStatus = (item) => {
    if (item.booking_status === "Hired" || item.booking_status === "Grocery Picked" || item.booking_status === "Chef Arrived") {
      return item;
    }
  }
  const updateCustomer = async () => {
    setLoading(true);
    let response = await fetch(
      localStorage.getItem("role") === "1" ? `${process.env.REACT_APP_BASE_URL}book/customer_booking_history` : `${process.env.REACT_APP_BASE_URL}book/chef_booking_history`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    let parsedData = await response.json();
    let final_data = parsedData.data && parsedData.data.length > 0 ? await parsedData.data.filter(checkStatus) : []
    setCustomer(final_data);
    setLoading(false);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      updateCustomer();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {props.underReview || !localStorage.getItem("token") ? <a href="mailto:support@chefrepublic.us" className="container d-flex justify-content-center align-items-center" style={{ position: "fixed", backgroundColor: "#FF5E41", bottom: "3.5%", right: "3%", height: "60px", width: "60px", borderRadius: "50%", boxShadow: "-1px 2px 1px 1px rgba(0, 0, 0, 0.2)", cursor: "pointer", zIndex: 999 }}>
        <img src={chatBubble} className="img-fluid" alt="" />
      </a> :
        <a className="container d-flex justify-content-center align-items-center" style={{ zIndex: 999, position: "fixed", backgroundColor: "#FF5E41", bottom: "3.5%", right: isMobile ? "10%" : "3%", height: "60px", width: "60px", borderRadius: "50%", boxShadow: "-1px 2px 1px 1px rgba(0, 0, 0, 0.2)", cursor: "pointer" }} onClick={() => { navigate(localStorage.getItem("role") === "1" ? "/message-list" : "/chef/message-list") }}>
          <img src={chatBubble} className="img-fluid" alt="" />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {loading ?
              <span className="spinner-border spinner-border-sm"></span>
              : data.length}
            <span className="visually-hidden">unread messages</span>
          </span>
        </a>}
    </>
  );
}

export default ContactUsPop;
