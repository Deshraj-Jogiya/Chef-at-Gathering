import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoggedNav from "../components/LoggedNav";
import { Camera } from "react-camera-pro";

import $ from "jquery";
function MessageList(props) {
  const navigate = useNavigate();
  let role = localStorage.getItem("role");
  const { state } = useLocation();
  useEffect(() => {
    var title = "Grocery Bill Upload | CHEF | CHEF REPUBLIC"
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
    const { bookingId, booking_order_id } = state;
    if (!bookingId || bookingId === null || bookingId === undefined || !booking_order_id || booking_order_id === null || booking_order_id === undefined) {
      navigate(-1);
      window.location.reload();
    }
    setbookingId(bookingId)
    setorderId(booking_order_id)
    $(".modal-backdrop").removeAttr("class")
    // eslint-disable-next-line
  }, []);
  const [bookingId, setbookingId] = useState("");
  const [orderId, setorderId] = useState("");
  const camera = React.useRef(null);
  const [image, setImage] = useState(null);
  return (
    <>
      <LoggedNav customer={props.customer} />
      {image ? <>
        <img src={image} alt="" style={{ width: "100%" }} />
        <div className="d-flex justify-content-evenly my-4">
          <button onClick={() => { setImage(null) }} className="btn-orange text-center">Reset</button>
          <button onClick={() => {
            fetch(image)
              .then(res => res.blob())
              .then(blob => {
                navigate(
                  "/chef/grocery-bill",
                  {
                    state: { bookingId: bookingId, image_file: blob, booking_order_id:orderId },
                  }
                );
              })
          }} className="btn-orange text-center">Upload</button>
        </div>
      </> :
        <>
          <Camera ref={camera} aspectRatio={9 / 16} facingMode="environment" />
          <div className="text-center my-4">
            <button className="btn-orange text-center" onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>
            <p className="text-center my-2">Of Grocery Bill Amount</p>
          </div>
        </>
      }
    </>
  );
}

export default MessageList;
