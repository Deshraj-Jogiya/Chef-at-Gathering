import React, { useEffect, useState } from "react";
import Spinner from "./BePatient";
import { useNavigate, useLocation } from "react-router-dom";
import LoggedNav from "../components/LoggedNav";
import Footer from "../components/Footer";
import { isMobile } from "react-device-detect";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoMdStopwatch } from "react-icons/io";
import { RiRestaurantLine } from "react-icons/ri";
import chatIcon from "../images/icons/chat.png";
import { RiArrowLeftSLine } from 'react-icons/ri';
import profile from '../images/Vector.jpg'

function ChefOrderDetail(props) {
  let navigate = useNavigate();
  const [detail, setDetail] = useState({});
  let total_amount = 0
  const { state } = useLocation();
  let role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayPopUp, setDisplayPopUp] = useState(false);

  const cancelOrder = async (e) => {
    navigate(
      "/chef/order/cancel",
      {
        state: {
          bookingId: detail.booking_id,
          chef_name: detail.booking_by_username,
          chef_profile_image: detail.booking_by_user_profile_image,
          booking_status: detail.booking_status
        },
      }
    )
  }

  useEffect(() => {
    var title = `Order Details | CHEF | CHEF REPUBLIC`;
    var desc = "Booking Summary Page: Review details of your order which includes menu items selected by your customers, their allergies, diet and cuisine preference. It also shows whether the customer wants the chef to pick up groceries for the meal prep. This is where the chef can approve or reject the order"
    const titleTag = document.querySelector('title');
    titleTag.innerText = title;
    const metaTitle = document.querySelector("meta[name='title']");
    metaTitle.setAttribute('content', title)
    const metaDescription = document.querySelector("meta[name='description']");
    metaDescription.setAttribute('content', desc)
    const metaTitleOG = document.querySelector("meta[property='og:title']");
    metaTitleOG.setAttribute('content', title)
    const metaDescriptionOG = document.querySelector("meta[property='og:description']");
    metaDescriptionOG.setAttribute('content', desc)
    const metaTitleTwitter = document.querySelector("meta[property='twitter:title']");
    metaTitleTwitter.setAttribute('content', title)
    const metaDescriptionTwitter = document.querySelector("meta[property='twitter:description']");
    metaDescriptionTwitter.setAttribute('content', desc)

    if (role === null || role !== "2") {
      navigate("/chef/sign-in");
      window.location.reload();
    }
    if (state === null || state === undefined) {
      navigate("/chef/sign-in");
      window.location.reload();
    }
    const { bookingId } = state;
    if (!bookingId || bookingId === null || bookingId === undefined) {
      navigate(-1);
      window.location.reload();
    }
    updateDetail(bookingId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateDetail = async (bookingId) => {
    let data = await fetch(
      `${process.env.REACT_APP_BASE_URL}book/chef_booking_details`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_id: bookingId.toString(),
        }),
      }
    );
    let parsedData = await data.json();
    if (parsedData.status === true) {
      setDetail(parsedData.data[0]);
      setLoading(false);
    }
  };
  const approveBooking = async (bookingId) => {
    setIsSubmitting(true);
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
          status: "2"
        }),
      }
    );
    let parsedData = await data.json();
    if (parsedData.status === true) {
      setIsSubmitting(false);
      navigate("/chef/order-detail/confirm", {
        state: {
          booking_by_user_profile_image: detail.booking_by_user_profile_image,
          booking_by_username: detail.booking_by_username,
          booking_status: detail.booking_status,
          booking_id: detail.booking_id,
          booking_by_customer_id: detail.booking_by_userid,
          booking_order_id: detail.booking_order_id
        }
      })
    }
  };
  const rejectBooking = async (bookingId) => {
    navigate(
      "/chef/not-interested",
      {
        state: { bookingId: bookingId },
      }
    );
  };
  const navigateToChat = async () => {
    if (detail.booking_status === "Requested" || detail.booking_status === "Declined") {
      return null
    } else {
      navigate("/chef/message-view", { state: { data: { booked_chef_profile_image: detail.booking_by_user_profile_image, booked_chef: detail.booking_by_username, booking_status: detail.booking_status, booking_id: detail.booking_id, booking_by_customer_id: detail.booking_by_userid, booking_order_id: detail.booking_order_id } } })
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) :
        <>
          <div className={"row " + (displayPopUp ? "m-0 d-flex justify-content-center align-items-center " : "d-none")} style={{ background: "#00000070", width: "100%", height: "100%", position: "fixed", zIndex: 700, scrollbarWidth: "0", overflow: "hidden" }}>
            <div style={{ fontSize: "2.5rem", color: "white", textAlign: "right", position: "relative", top: "1%" }} onClick={() => setDisplayPopUp(false)}>x</div>
            <div className="d-flex justify-content-center align-items-center flex-column" style={{ zIndex: 999, height: "100%" }}>
              {/* Grocery Picked */}
              {detail.is_grocery_pickup === "yes" ? <button onClick={() => {
                navigate("/chef/grocery-camera", { state: { bookingId: detail.booking_id, booking_order_id: detail.booking_order_id } });
              }} style={{ backgroundColor: (detail.is_grocery_pickup === "yes" ? detail.booking_status !== "Hired" : false) ? "#808080" : "#41d1ff", color: "white", width: "100%", padding: "10px 30px", fontSize: "0.9rem", borderRadius: "40px", border: "none", margin: "5px 0px" }} disabled={(detail.is_grocery_pickup === "yes" ? detail.booking_status !== "Hired" : false)}>Grocery Picked</button> : null}

              {/* Chef Arrived */}
              <button onClick={() => {
                navigate("/chef/at-location", { state: { bookingId: detail.booking_id, bookerName: detail.booking_by_username } });
              }} style={{ backgroundColor: (detail.is_grocery_pickup === "yes" ? detail.booking_status === "Grocery Picked" : detail.booking_status === "Hired") ? "#FE7E7E" : "#808080", color: "white", width: "100%", padding: "10px 30px", fontSize: "0.9rem", borderRadius: "40px", border: "none", margin: "5px 0px" }} disabled={(detail.is_grocery_pickup === "yes" ? detail.booking_status !== "Grocery Picked" : detail.booking_status !== "Hired")}>Chef Arrived</button>

              {/* Meal Prep Complete */}
              <button onClick={() => {
                navigate("/chef/reminder", { state: { bookingId: detail.booking_id, bookerName: detail.booking_by_username } });
              }} style={{ backgroundColor: detail.booking_status === "Chef Arrived" ? "#F8C130" : "#808080", color: "white", padding: "10px 30px", width: "100%", fontSize: "0.9rem", borderRadius: "40px", border: "none", margin: "5px 0px" }} disabled={detail.booking_status !== "Chef Arrived" || isSubmitting}>{isSubmitting ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                ""
              )}{" "}Meal Prep Complete</button>

              {/* Cancel */}

              <button onClick={cancelOrder} style={{ backgroundColor: "#FF2700", color: "white", width: "100%", padding: "10px 30px", fontSize: "0.9rem", borderRadius: "40px", border: "none", margin: "5px 0px" }}>Cancel Order</button>
            </div>
          </div>
          <LoggedNav customer={props.customer} main={false} redirect_to={"/chef/order-list"} />
          <div className="container my-5  border border-0 ">
            {isMobile ? null : <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item active" style={{ cursor: "pointer" }} aria-current="page" onClick={() => { navigate("/chef/order-list") }}>
                  <span className="pe-2 h4">
                    <RiArrowLeftSLine />
                  </span>
                  Go Back
                </li>
              </ol>
            </nav>}
            <div
              className="d-flex justify-content-center flex-column align-items-center"
              style={{
                width: isMobile ? "100%" : "60%",
                margin: "auto",
                height: "auto",
                background: "#FFFFFF",
                boxShadow: isMobile ? "0px" : "0px 0px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: isMobile ? "0px" : "20px",
              }}
            >
              <h5
                className={
                  isMobile ? "text-center my-2 fw-bold" : "text-center mt-3 fw-bold"
                }
              >
                Order Detail
              </h5>

              <div className="pt-4 row" style={{ width: isMobile ? "100%" : "90%" }}>
                {isMobile ? (
                  <div className="col-3 d-flex flex-column">
                    <div className="my-2">
                      <img
                        src={detail.booking_by_user_profile_image ? detail.booking_by_user_profile_image : profile}
                        style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div
                      className="d-flex justify-content-center align-items-center my-2"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        border: "1px solid #FF5E41",
                      }}
                      onClick={navigateToChat}
                    >
                      <img src={chatIcon} alt="" className="img-fluid" />
                    </div>
                  </div>
                ) : (
                  <div className="col-2" style={{ borderRadius: "50%" }}>
                    <img
                      src={detail.booking_by_user_profile_image ? detail.booking_by_user_profile_image : profile}
                      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                )}
                <div className={isMobile ? "col-9" : "col-8"}>
                  <h5 className="fw-bold">
                    {detail.booking_by_username}
                    {isMobile ? null : <span
                      className="my-2"
                      style={{
                        fontSize: "0.7rem",
                        background: localStorage.getItem(detail.booking_status),
                        borderRadius: "20px",
                        padding: "3px 15px",
                        fontWeight: 700,
                        color: "white",
                        marginLeft: "4%",
                      }}
                    >
                      {detail.booking_status}
                    </span>}
                  </h5>
                  {isMobile ? <span
                    className="my-2"
                    style={{
                      fontSize: "0.7rem",
                      background: localStorage.getItem(detail.booking_status),
                      borderRadius: "20px",
                      padding: "3px 15px",
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {detail.booking_status}
                  </span> : null}
                  <p className="my-2" style={{ fontSize: "0.9rem" }}>
                    ORDER ID <span> {detail.booking_order_id}</span>
                  </p>
                  <p className="my-2" style={{ fontSize: "0.9rem" }}>
                    <SlLocationPin /> <span> {detail.booking_address}</span>
                  </p>
                  <p className="my-2" style={{ fontSize: "0.9rem" }}>
                    <AiOutlineCalendar /> {detail.booking_date}
                  </p>
                  <p className="my-2" style={{ fontSize: "0.9rem" }}>
                    <IoMdStopwatch /> {detail.booking_time}
                  </p>
                  <p className="my-2" style={{ fontSize: "0.9rem" }}>
                    <RiRestaurantLine /> {detail.booking_category}
                  </p>
                </div>
                {isMobile ? (
                  ""
                ) : (
                  <div className="col-2">
                    <div
                      className="d-flex justify-content-center align-items-center my-2"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        border: "1px solid #FF5E41",
                      }}
                      onClick={navigateToChat}
                    >
                      <img src={chatIcon} alt="" className="img-fluid" />
                    </div>
                  </div>
                )}
              </div>
              <div
                className="form_box"
                style={{ width: isMobile ? "98%" : "60%" }}
              >
                <div className="row my-4">
                  <div className="col-7"><h6 className="fw-bold text-nowrap">Enter menu item number</h6></div>
                  <div className="col-1"></div>
                  <div className="col-4 "><h6 className="fw-bold text-nowrap">Portion Size</h6></div>
                  {detail.menu_items ? detail.menu_items.map((element, index) => {
                    return <div className="row my-1" key={index} >
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control shadow-none"
                          placeholder={element.item_number}
                          disabled
                        />
                      </div>
                      <div className="col-1"></div>
                      <div className="col-4 ">
                        <select disabled>
                          <option value={element.portion}>{element.portion}</option>
                        </select>
                      </div>
                    </div>
                  }) : null}
                </div>
              </div>

              <div className="my-3" style={{ width: isMobile ? "98%" : "60%" }}>
                <label htmlFor="Input" className="form-label fw-bold">
                  Please state your allergies, if any
                </label>
                <textarea
                  className="form-control"
                  id="Input"
                  style={{
                    borderRadius: "15px",
                    backgroundColor: "rgba(128, 128, 128,0.4)",
                  }}
                  rows={5}
                  disabled
                  value={detail.allergies}
                ></textarea>
              </div>

              <div className="my-3" style={{ width: isMobile ? "98%" : "60%" }}>
                <h6 className="fw-bold">
                  Do you want the chef to pick up groceries?
                </h6>
                <h6>Grocery delivery fees is $14.99 </h6>
                <div className="d-flex mt-1 justify-content-evenly">
                  <button key="1" type="button" className={detail.is_grocery_pickup === "yes" ? "btn-orange-disabled mx-1 w-100" : "btn-white-disabled mx-1 w-100"} disabled="disabled">
                    Yes
                  </button>
                  <button type="button" className={detail.is_grocery_pickup === "yes" ? "btn-white-disabled mx-1 w-100" : "btn-orange-disabled mx-1 w-100"} disabled="disabled">
                    No
                  </button>
                </div>
              </div>

              <div className="my-3" style={{ width: isMobile ? "98%" : "60%" }}>
                <label htmlFor="Input" className="form-label fw-bold">
                  Add instructions for the Chef
                </label>
                <textarea
                  className="form-control"
                  style={{
                    borderRadius: "15px",
                    backgroundColor: "rgba(128, 128, 128,0.4)",
                  }}
                  rows={5}
                  disabled
                  value={detail.instructions_for_chef}
                ></textarea>
              </div>
              {detail.invoice_details && (detail.booking_status === "Canceled" || detail.booking_status == "Meal Prep Complete") ? <div
                className="box_title  my-5 d-flex flex-column justify-content-center py-3 mb-3"
                style={{
                  background: "#FFFFFF",
                  boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "15px",
                  width: isMobile ? "98%" : "60%"
                }}
              >
                <h6 className="fw-bold text-center">{detail.booking_status === "Canceled" ? "Payment For Order Canceled" : (detail.booking_status == "Meal Prep Complete" ? "Payment For Meal Prep" : null)}</h6>

                <table style={{ width: "80%", margin: "auto" }}>
                  <tbody>
                    {detail.booking_status === "Meal Prep Complete" ? <tr className="">
                      <td align="left" style={{ fontSize: "0.9rem" }}>Payment</td>
                      <td align="right" style={{ fontSize: "0.9rem" }}>${(parseFloat(detail.invoice_details.base_charge) * 0.8).toFixed(2)}</td>
                    </tr> : null}
                    <tr className="">
                      <td align="left" style={{ fontSize: "0.9rem" }}>Grocery Delivery Fee</td>
                      <td align="right" style={{ fontSize: "0.9rem" }}>${(parseFloat(detail.invoice_details.grocery_fees) * 0.8).toFixed(2)}</td>
                    </tr>
                    <tr className="">
                      <td align="left" style={{ fontSize: "0.9rem" }}>Grocery Bill Reimbursement</td>
                      <td align="right" style={{ fontSize: "0.9rem" }}>${detail.invoice_details.grocery_amount}</td>
                    </tr>
                    {detail.invoice_details.tip_amount && parseFloat(detail.invoice_details.tip_amount) > 0 && detail.booking_status === "Meal Prep Complete" ? <tr className="">
                      <td align="left" style={{ fontSize: "0.9rem" }}>Tip Amount</td>
                      <td align="right" style={{ fontSize: "0.9rem" }}>${detail.invoice_details.tip_amount}</td>
                    </tr> : null}
                    {detail.booking_status === "Canceled" ? <tr className="">
                      <td align="left" style={{ fontSize: "0.9rem" }}>Cancel Fee</td>
                      <td align="right" style={{ fontSize: "0.9rem" }}>${(parseFloat(detail.invoice_details.cancellation_fees) * 0.8).toFixed(2)}</td>
                    </tr> : null}
                    <tr className="">
                      <td align="left" style={{ fontSize: "0.9rem" }} className="fw-bold pt-2">
                        Total Paid
                      </td>
                      <td align="right" style={{ fontSize: "0.9rem" }} className="fw-bold pt-2">
                        ${detail.invoice_details.total_amount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> : null}
              <div
                className="d-flex row my-4 justify-content-center"
                style={{ width: isMobile ? "98%" : "60%" }}
              >
                {detail.booking_status === "Requested" ?
                  <>
                    <div className="col-sm-12 col-md-6 py-2">
                      <button type="button" onClick={() => { rejectBooking(detail.booking_id) }} className="btn-white w-100 mx-1">
                        Not Interested
                      </button>
                    </div>
                    <div className="col-sm-12 col-md-6 py-2">
                      <button type="button" onClick={() => { approveBooking(detail.booking_id) }} className="btn-orange w-100 mx-1">
                        {isSubmitting ? <span className="spinner-border spinner-border-sm"></span> : ""} Approve Job
                      </button>
                    </div>
                  </>
                  : isMobile ? (detail.booking_status === "Declined" || detail.booking_status === "Canceled" || detail.booking_status === "Meal Prep Complete") ? null : <button type="button" className="btn-orange w-100" onClick={() => { setDisplayPopUp(true) }}>
                    Update Status
                  </button> : null}
              </div>
            </div>

          </div>
          {isMobile ? null : <Footer top={1} />}
        </>
      }
    </>
  );
}

export default ChefOrderDetail;
