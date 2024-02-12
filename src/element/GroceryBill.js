import LoggedNav from "../components/LoggedNav";
import $ from "jquery";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { sendMessage } from '../services/firebase';

function GroceryBill(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setbookingId] = useState("");
  const [orderId, setorderId] = useState("");
  const [imageFile, setImageFile] = useState();
  const navigate = useNavigate();
  let role = localStorage.getItem("role");
  const { state } = useLocation();
  useEffect(() => {
    var title = "Grocery Amount Upload | CHEF | CHEF REPUBLIC"
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
    if (state === null || state === undefined) {
      navigate(-1);
      window.location.reload();
    }
    const { bookingId, image_file, booking_order_id } = state;

    if (bookingId) {
      setbookingId(bookingId)
    }
    if (booking_order_id) {
      setorderId(booking_order_id)
    }
    if (image_file) {
      setImageFile(image_file)
    }
    // eslint-disable-next-line
  }, []);
  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    var formdata = new FormData();
    formdata.append("booking_id", bookingId);
    formdata.append("status", "5");
    formdata.append("grocery_bill", imageFile);
    formdata.append("grocery_amount", $("#amount").val());
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}status/update_status_by_chef`,
      requestOptions
    );
    const res_json = await response.text();
    const data = JSON.parse(res_json);
    if (data.status === true) {
      navigate("/chef/grocery-bill/confirm", {
        state: { bookingId: bookingId, },
      });
      sendMessage(orderId, data.data.grocery_bill)
      sendMessage(orderId, "Amount: "+ (data.data.grocery_amount).toString())
    } else {
      setIsSubmitting(false);
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
        <div className="header text-center my-3">
          <h1 className="fw-bold">Enter Grocery Bill Amount</h1>
        </div>
        <div className="message text-center my-3 mx-3 fw-bold">
          <p>
            Please enter exact amount so we can inform the customer and
            reimburse the amount
          </p>
        </div>
        <div className="input text-center my-3 mx-3 ">
          <input
            className="p-2 text-center form-control shadow-none"
            type="text"
            id="amount"
            placeholder="Enter $ Amount"
            style={{
              backgroundColor: "rgba(128, 128, 128,0.4)",
              outline: "none",
            }}
          />
        </div>
        <div className="submit text-center my-5 py-4 mx-3">
          <button onClick={submitForm} className="px-5 py-2 btn-orange" disabled={isSubmitting}>{isSubmitting ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            ""
          )}{" "}Submit</button>
        </div>
      </div>
    </>
  );
}

export default GroceryBill;
