import React, { useState, useEffect } from "react";
import LoggedNav from "../components/LoggedNav";
import { isMobile } from "react-device-detect";
import Spinner from "./BePatient";
import { RiArrowLeftSLine } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import PopUp from "../components/Popup";

function OrderDetail(props) {
  const [details, setDetails] = useState([])
  const [loading, setLoading] = useState(true)
  let total_amount = 0
  total_amount = parseFloat(total_amount) + (details.grocery_bill_details && details.grocery_bill_details.grocery_amount ? parseFloat(details.grocery_bill_details.grocery_amount) : 0)
  total_amount = parseFloat(total_amount) + (details.tips_amount ? parseFloat(details.tips_amount) : 0)
  let navigate = useNavigate();
  const updateDetails = async () => {
    setLoading(true);
    let data = await fetch(
      `${process.env.REACT_APP_BASE_URL}book/customer_booking_details`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_id: localStorage.getItem("booking_id").toString(),
        }),
      }
    );
    let parsedData = await data.json();
    if (!parsedData.status) {
      navigate("/order-list")
    }
    setDetails(parsedData.data[0]);
    setLoading(false);
  }
  useEffect(() => {
    var title = "Order Detail | CHEF REPUBLIC"
    var desc = "Customer can view the order details on the private Chefs profile that he has select including status of the order."
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

    updateDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    loading ? <Spinner /> : <>
      <LoggedNav customer={props.customer} redirect_to={"/order-list"} />
      {isMobile ? null : <div className="container mt-5">
        <a onClick={() => { navigate("/order-list") }} style={{ textDecoration: "none", color: "black", fontWeight: 500, cursor: "pointer" }}>
          <RiArrowLeftSLine size={"2rem"} />Go Back
        </a>

      </div>}
      <div className="container mt-1 border border-0 ">
        <div
          className="d-flex justify-content-center flex-column align-items-center mb-5"
          style={{
            width: isMobile ? "100%" : "60%",
            margin: "auto",
            height: "auto",
            background: "#FFFFFF",
            boxShadow: isMobile ? "" : "0px 0px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
          }}
        >
          <div className="py-5 row" style={{ width: isMobile ? "95%" : "60%", }}>

            <div className="col-2">
              <img src={details.booked_chef_profile_image} style={{ width: "50px", height: "50px", borderRadius: "50%" }} alt="" />
            </div>
            <div className="col-10">
              <h6 style={{ fontWeight: 800 }}>
                {details.booked_chef}
              </h6>
              <span
                className=""
                style={{
                  fontSize: "0.7rem",
                  color: "white",
                  background: localStorage.getItem(details.booking_status),
                  borderRadius: "20px",
                  padding: "3px 15px",
                  fontWeight: 700,
                }}
              >
                {details.booking_status}
              </span>
              <p className="my-2" style={{ fontSize: "0.9rem" }}>ORDER ID: {details.booking_order_id}</p>
              <p className="" style={{ fontSize: "0.7rem" }}>{details.booked_on}</p>
            </div>
          </div>

          <div className="form_box" style={{ width: isMobile ? "95%" : "86%", margin: "auto" }}>
            <div
              className="box_title py-2 my-2"
              style={{
                background: "#FFFFFF",
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                width: "100%",
                margin: "auto",
              }}
            >
              <div className="mx-3 fw-bold">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Address for service
                </label>
              </div>
              <div className="mx-3">
                <p>{details.booking_address}</p>
              </div>
            </div>

            <div
              className="box_title py-2 my-2"
              style={{
                background: "#FFFFFF",
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                width: "100%",
                margin: "auto",
              }}
            >
              <div className="mx-3 fw-bold">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Date Selected
                </label>
              </div>
              <div className="mx-3">
                <p>{details.booking_date}</p>
              </div>
            </div>

            <div
              className="box_title py-2 my-2"
              style={{
                background: "#FFFFFF",
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                width: "100%",
                margin: "auto",
              }}
            >
              <div className="fw-bold mx-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Timeslot Selected
                </label>
              </div>
              <div className="mx-3">
                <p>{details.booking_time}</p>
              </div>
            </div>

            <div
              className="box_title py-2 my-2"
              style={{
                background: "#FFFFFF",
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                width: "100%",
                margin: "auto",
              }}
            >
              <div className=" fw-bold mx-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Cuisine/Diet Selected
                </label>
              </div>
              <div className="mx-3">
                <p>{details.booking_category}</p>
              </div>
            </div>

            {details.menu_items && details.menu_items.length > 0 ? <div className="row my-4">
              <div className="col-7"><h6 className="fw-bold text-nowrap">Enter menu item number</h6></div>
              <div className="col-1"></div>
              <div className="col-4 text-center"><h6 className="fw-bold text-nowrap">Portion Size</h6></div>
              {details.menu_items.map((element, index) => {
                return <div className="row my-1" key={index} >
                  <div className="col-7">
                    <input
                      type="number"
                      className="form-control shadow-none"
                      placeholder={element.item_number}
                      defaultValue={element.item_number}
                      disabled={true}
                    />
                  </div>
                  <div className="col-1"></div>
                  <div className={isMobile ? "col-4 d-flex justify-content-end" : "col-4 d-flex justify-content-center"}>
                    <select defaultValue={element.portion} disabled={true}>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
              })}
            </div> : null}


            <div className="mb-3">
              <label htmlFor="Input" className="form-label fw-bold">
                Please state your allergies, if any
              </label>
              <input
                type="text"
                className="form-control"
                id="Input"
                style={{
                  borderRadius: "15px",
                  backgroundColor: "rgba(128, 128, 128,0.4)",
                }}
                placeholder={details.allergies}
                disabled={true}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Input" className="form-label fw-bold">
                Do you want the chef to pick up groceries?
              </label> <br />
              <label>Grocery delivery fees is $14.99</label>
              <div className="d-flex mt-1 justify-content-evenly">
                <button key="1" type="button" className={details.is_grocery_pickup === "yes" ? "btn-orange-disabled mx-1 w-100" : "btn-white-disabled mx-1 w-100"} disabled="disabled">
                  Yes
                </button>
                <button type="button" className={details.is_grocery_pickup === "yes" ? "btn-white-disabled mx-1 w-100" : "btn-orange-disabled mx-1 w-100"} disabled="disabled">
                  No
                </button>
              </div>
              {/* <div className="mt-1 row " id="profile-chef-complete">
                <div key="1" className="col p-0 mx-1">
                  <input type="radio" id="want-grocerties-yes" name="chef_grocery_pickup" className="Send_data input-hidden" disabled={true} defaultChecked={details.is_grocery_pickup === "yes"} />
                  <label className="btn-white-disabled time-availablibilty" htmlFor="want-grocerties-yes" style={{ backgroundColor: details.is_grocery_pickup === "yes" ? "#ff5e41" : "#fff", border: "1px solid", color: details.is_grocery_pickup === "yes" ? "#fff" : "#ff5e41" }}>
                    Yes
                  </label>
                </div>
                <div key="2" className="col p-0 mx-1">
                  <input type="radio" id="want-grocerties-no" name="chef_grocery_pickup" className="Send_data input-hidden" disabled={true} defaultChecked={details.is_grocery_pickup === "no"} />
                  <label className="btn-white-disabled time-availablibilty" htmlFor="want-grocerties-no" style={{ backgroundColor: details.is_grocery_pickup === "no" ? "#ff5e41" : "#fff", border: "1px solid", color: details.is_grocery_pickup === "no" ? "#fff" : "#ff5e41" }}>
                    No
                  </label>
                </div>
              </div> */}
            </div>

            <div className="mb-3">
              <label htmlFor="Input" className="form-label fw-bold">
                Add instructions for the Chef{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="Input"
                style={{
                  borderRadius: "15px",
                  backgroundColor: "rgba(128, 128, 128,0.4)",
                }}
                disabled={true}
                placeholder={details.instructions_for_chef}
              />
            </div>
            {details.grocery_bill_details && details.grocery_bill_details.grocery_bill ? <><div className="my-5 text-center">
              <button
                type="button"
                className="btn-orange text-center"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                View Grocery Bill
              </button>
            </div>
              <PopUp img={details.grocery_bill_details.grocery_bill} /></> : null}
            {details.payment_details && details.booking_status === "Meal Prep Complete" ? <div
              className="box_title  my-5 d-flex flex-column justify-content-center py-3 mb-3"
              style={{
                background: "#FFFFFF",
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
              }}
            >
              <h6 className="fw-bold text-center">Total Bill</h6>

              <table style={{ width: "80%", margin: "auto" }}>
                <tbody>
                  {details.payment_details ? details.payment_details.map((element) => {
                    total_amount = parseFloat(total_amount) + (element.base_charge ? parseFloat(element.base_charge) : 0)
                    return element.base_charge ? <tr className="">
                      <td align="left" style={{ fontSize: "0.9rem" }}>Base Charge</td>
                      <td align="right" style={{ fontSize: "0.9rem" }}>${parseFloat(element.base_charge).toFixed(2)}</td>
                    </tr> : null
                  }) : null}
                  {details.payment_details ? details.payment_details.map((element) => {
                    total_amount = parseFloat(total_amount) + (element.service_fee ? parseFloat(element.service_fee) : 0)
                    return element.service_fee ? <tr className="">
                      <td align="left" style={{ fontSize: "0.9rem" }}>Service Fee</td>
                      <td align="right" style={{ fontSize: "0.9rem" }}>${parseFloat(element.service_fee).toFixed(2)}</td>
                    </tr> : null
                  }) : null}
                  {details.payment_details ? details.payment_details.map((element) => {
                    total_amount = parseFloat(total_amount) + (element.grocery_fees ? parseFloat(element.grocery_fees) : 0)
                    return element.grocery_fees && details.is_grocery_pickup === "yes" ? <tr className="">
                      <td align="left" style={{ fontSize: "0.9rem" }}>Grocery Delivery Fee</td>
                      <td align="right" style={{ fontSize: "0.9rem" }}>${parseFloat(element.grocery_fees).toFixed(2)}</td>
                    </tr> : null
                  }) : null}
                  {details.grocery_bill_details ? details.grocery_bill_details.grocery_amount ? <tr className="">
                    <td align="left" style={{ fontSize: "0.9rem" }}>Grocery Bill Reimbursement</td>
                    <td align="right" style={{ fontSize: "0.9rem" }}>${parseFloat(details.grocery_bill_details.grocery_amount).toFixed(2)}</td>
                  </tr> : null : null}
                  {details.tips_amount ? <tr className="">
                    <td align="left" style={{ fontSize: "0.9rem" }}>Tip For Chef</td>
                    <td align="right" style={{ fontSize: "0.9rem" }}>${parseFloat(details.tips_amount).toFixed(2)}</td>
                  </tr> : null
                  }
                  <tr className="">
                    <td align="left" style={{ fontSize: "0.9rem" }} className="fw-bold pt-2">
                      Total Payment After Meal
                    </td>
                    <td align="right" style={{ fontSize: "0.9rem" }} className="fw-bold pt-2">
                      ${parseFloat(total_amount).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> : null}
            {details.invoice_details && details.booking_status === "Canceled" ? <div
              className="box_title  my-5 d-flex flex-column justify-content-center py-3 mb-3"
              style={{
                background: "#FFFFFF",
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
              }}
            >
              <h6 className="fw-bold text-center">Total Bill</h6>

              <table style={{ width: "80%", margin: "auto" }}>
                <tbody>
                  <tr className="">
                    <td align="left" style={{ fontSize: "0.9rem" }}>Base Charge</td>
                    <td align="right" style={{ fontSize: "0.9rem" }}>${details.invoice_details.base_charge}</td>
                  </tr>
                  <tr className="">
                    <td align="left" style={{ fontSize: "0.9rem" }}>Grocery Delivery Fee</td>
                    <td align="right" style={{ fontSize: "0.9rem" }}>${details.invoice_details.grocery_fees}</td>
                  </tr>
                  <tr className="">
                    <td align="left" style={{ fontSize: "0.9rem" }}>Service Fee</td>
                    <td align="right" style={{ fontSize: "0.9rem" }}>${details.invoice_details.service_fees}</td>
                  </tr>
                  <tr className="">
                    <td align="left" style={{ fontSize: "0.9rem" }}>Grocery Bill Reimbursement</td>
                    <td align="right" style={{ fontSize: "0.9rem" }}>${details.invoice_details.grocery_amount}</td>
                  </tr>
                  <tr className="">
                    <td align="left" style={{ fontSize: "0.9rem" }}>Cancel Fee</td>
                    <td align="right" style={{ fontSize: "0.9rem" }}>${details.invoice_details.cancellation_fees}</td>
                  </tr>
                  <tr className="">
                    <td align="left" style={{ fontSize: "0.9rem" }} className="fw-bold pt-2">
                      Total Paid
                    </td>
                    <td align="right" style={{ fontSize: "0.9rem" }} className="fw-bold pt-2">
                      ${details.invoice_details.total_amount}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> : null}
            <p className="text-center py-4" style={{ fontSize: "0.8rem" }}>
              <a
                href="mailto:support@chefrepublic.us"
                className="text-danger"
                style={{ textDecoration: "none", color: "orange" }}
              >
                Contact us
              </a>
            </p>
            <div className="edit_btn my-4 text-center">
              {props.customer ? (
                <>
                  {(details.booking_status === "Meal Prep Complete" && ((details.tips_given === "1" && details.review_given === "1") || (details.tips_given === "1" && details.review_given === "2")) || (details.tips_given === "2" && details.review_given === "1") || (details.tips_given === "2" && details.review_given === "2")) || details.booking_status === "" || details.booking_status === "Declined" || details.booking_status === "Canceled" ? null :
                    details.booking_status === "Meal Prep Complete" ?
                      <>
                        {
                          details.tips_given === "0" && details.review_given === "0" ? <>
                            <button
                              onClick={() => { navigate("/tip-amount", { state: { chef_name: details.booked_chef, chef_profile_image: details.booked_chef_profile_image, booking_id: details.booking_id, booking_status: details.booking_status } }) }}
                              className="btn btn-orange rounded-pill mb-3 "
                              style={{ width: "90%" }}
                            >
                              Add Tip
                            </button>
                            <button
                              onClick={() => { navigate("/rate-chef", { state: { chef_name: details.booked_chef, chef_profile_image: details.booked_chef_profile_image, chef_id: details.chef_id, booking_status: details.booking_status, booking_id: details.booking_id, } }) }}
                              className="btn btn-orange rounded-pill mb-3 "
                              style={{ width: "90%" }}
                            >
                              Rate Chef
                            </button>
                          </> : details.tips_given === "0" && details.review_given !== "0" ? <button
                            onClick={() => { navigate("/tip-amount", { state: { chef_name: details.booked_chef, chef_profile_image: details.booked_chef_profile_image, booking_id: details.booking_id, booking_status: details.booking_status } }) }}
                            className="btn btn-orange rounded-pill mb-3 "
                            style={{ width: "90%" }}
                          >
                            Add Tip
                          </button> : details.tips_given !== "0" && details.review_given === "0" ? <button
                            onClick={() => { navigate("/rate-chef", { state: { chef_name: details.booked_chef, chef_profile_image: details.booked_chef_profile_image, chef_id: details.chef_id, booking_status: details.booking_status, booking_id: details.booking_id, } }) }}
                            className="btn btn-orange rounded-pill mb-3 "
                            style={{ width: "90%" }}
                          >
                            Rate Chef
                          </button> : null
                        }
                      </>
                      :
                      <button
                        onClick={() => { navigate("/booking-detail/cancel", { state: { chef_name: details.booked_chef, chef_profile_image: details.booked_chef_profile_image, chef_id: details.chef_id, bookingId: details.booking_id, booking_status: details.booking_status } }) }}
                        className="btn btn-white rounded-pill mb-3 "
                        style={{ width: "90%" }}
                      >
                        Cancel Booking
                      </button>
                  }
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-orange rounded-pill mb-3 "
                  style={{ width: "90%" }}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default OrderDetail;

