import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedNav from "../components/LoggedNav";
import Footer from "../components/Footer";
import Spinner from "../element/BePatient";
import $ from "jquery";
import { RiArrowLeftSLine } from 'react-icons/ri';
import { Rating } from 'react-simple-star-rating';
import PopUp from "../components/Popup";
import { isMobile } from "react-device-detect";
import { callErrorApi } from '../errorHandle/callErrorApi';
function BookingDetail(props) {
  const [details, setDetails] = useState([])
  const [loading, setLoading] = useState(true)
  let navigate = useNavigate();
  function navigateToDetail() {
    navigate(-1)
  }
  function navigateToSummary() {
    if (!$('input[name="chef_grocery_pickup"]:checked').val()) {
      $(".validation").html("Please select grocery pickup by chef")
      return false
    }
    localStorage.setItem("allergies", $("#allergies").val())
    localStorage.setItem("item_number_1", $('input[name="menu-1"]').val())
    localStorage.setItem("item_number_2", $('input[name="menu-2"]').val())
    localStorage.setItem("item_number_3", $('input[name="menu-3"]').val())
    localStorage.setItem("item_number_4", $('input[name="menu-4"]').val())
    localStorage.setItem("portion_1", $('#portion-1').val())
    localStorage.setItem("portion_2", $('#portion-2').val())
    localStorage.setItem("portion_3", $('#portion-3').val())
    localStorage.setItem("portion_4", $('#portion-4').val())
    localStorage.setItem("instructions_for_chef", $('#instructions_for_chef').val())
    localStorage.setItem("chef_grocery_pickup", $('input[name="chef_grocery_pickup"]:checked').val())
    navigate("/booking-summary")
  }
  const updateChefs = async (chef_id) => {
    setLoading(true)
    try {
      let data = await fetch(`${process.env.REACT_APP_BASE_URL}user/get_chef_detail`,
        {
          method: 'POST',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "chef_id": (chef_id).toString()
          })
        });
      let parsedData = await data.json()
      setDetails(parsedData.data)
      setLoading(false)
    } catch (error) {
      callErrorApi(`catch_error: ${process.env.REACT_APP_BASE_URL}user/get_chef_detail`, localStorage.getItem("owner"), error);
      setLoading(false)
    }
  }
  useEffect(() => {
    updateChefs(localStorage.getItem("chef_id"));
    // eslint-disable-next-line
  }, [])
  return (
    loading ? <Spinner /> : <>
      <LoggedNav customer={props.customer} />
      <div className="container my-5 border border-0 ">
        {isMobile ? null :
          <nav aria-label="breadcrumb">
            <a onClick={navigateToDetail} style={{ textDecoration: "none", color: "black", fontWeight: 500, cursor: "pointer" }}>
              <RiArrowLeftSLine size={"2.3rem"} /> <span style={{ textDecoration: "none", color: "orange", fontWeight: 700 }}>{details[0].chef_name} </span>
            </a>
            / Enter Booking Details
          </nav>}

        <div className="main_container row">
          {isMobile ? null : <div className="col-5">
            <div className="box_title">
              <h1 className="">{details[0].chef_name}</h1>
              <h5 style={{ marginTop: "15px" }}>{details[0].chef_city}</h5>
            </div>

            <div className="d-flex justify-content-start pt-3 mt-3">
              <Rating
                allowFraction={true}
                initialValue={details[0].chef_rating}
                size={18}
                allowHover={false}
                readonly={true}
                style={{ display: "flex", alignItems: "center" }}
              />
              <div className="d-flex justify-content-center ms-3">
                <p style={{ fontSize: "0.9rem", color: "#7C7C7C" }}>{details[0].chef_total_number_of_reviews} reviews</p>
              </div>
            </div>

            <img
              alt=""
              className="image_box"
              src={details[0].chef_profile_image}
              style={{
                width: "auto", maxWidth: "90%",
                maxHeight: "300px",
                borderRadius: "20px",
                marginTop: "20px",
              }}
            />
          </div>
          }

          <div className={isMobile ? "col-12 p-4 d-flex flex-column justify-content-center align-items-center" : "col-7 p-5 d-flex flex-column justify-content-center align-items-center"} style={{ boxShadow: isMobile ? "" : "0px 0px 8px rgba(0, 0, 0, 0.1)", border: "none", borderRadius: isMobile ? "" : "20px" }}>
            <form id="profile-chef-complete">
              <div className="box_title" style={{ width: isMobile ? "70%" : "50%", height: "auto", margin: "auto" }}>
                <h4 className={isMobile ? "" : "mt-5"} style={{ textAlign: "center", fontWeight: "700" }}>What would you like the
                  private chef to cook?</h4>
                <div className="edit_btn mt-4 text-center">
                  <button type="button"
                    className="btn-orange"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop">View my menu</button>
                </div>
              </div>
              <PopUp pdf={details[0].chef_menu} />
              <div className="form_box" style={{ width: isMobile ? "95%" : "90%", margin: "auto" }}>
                <p className="mt-2 text-center" style={{ fontSize: "0.7rem" }}>Note: Enter preferred item number listed in Chef's menu and its respective quantity in terms of portion size</p>
                <div className="row my-4">
                  <div className="col-7"><h6 className="fw-bold text-nowrap">Enter menu item number</h6></div>
                  <div className="col-1"></div>
                  <div className="col-4 text-center"><h6 className="fw-bold text-nowrap">Portion Size</h6></div>
                  <div className="row my-1">
                    <div className="col-7">
                      <input
                        name="menu-1"
                        defaultValue={localStorage.getItem("item_number_1")}
                        type="number"
                        className="form-control shadow-none"
                        placeholder="Menu Item number"
                      />
                    </div>
                    <div className="col-1"></div>
                    <div className={isMobile ? "col-4 d-flex justify-content-end" : "col-4 d-flex justify-content-center"}>
                      <select id="portion-1" defaultValue={localStorage.getItem("portion_1") ? localStorage.getItem("portion_1") : "0"}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                  </div>
                  <div className="row my-1">
                    <div className="col-7">
                      <input
                        name="menu-2"
                        defaultValue={localStorage.getItem("item_number_2")}
                        type="number"
                        className="form-control shadow-none"
                        placeholder="Menu Item number"
                      />
                    </div>
                    <div className="col-1"></div>
                    <div className={isMobile ? "col-4 d-flex justify-content-end" : "col-4 d-flex justify-content-center"}>
                      <select id="portion-2" defaultValue={localStorage.getItem("portion_2") ? localStorage.getItem("portion_2") : "0"}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                  </div>
                  <div className="row my-1">
                    <div className="col-7">
                      <input
                        name="menu-3"
                        defaultValue={localStorage.getItem("item_number_3")}
                        type="number"
                        className="form-control shadow-none"
                        placeholder="Menu Item number"
                      />
                    </div>
                    <div className="col-1"></div>
                    <div className={isMobile ? "col-4 d-flex justify-content-end" : "col-4 d-flex justify-content-center"}>
                      <select id="portion-3" defaultValue={localStorage.getItem("portion_3") ? localStorage.getItem("portion_3") : "0"}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                  </div>
                  <div className="row my-1">
                    <div className="col-7">
                      <input
                        name="menu-4"
                        defaultValue={localStorage.getItem("item_number_4")}
                        type="number"
                        className="form-control shadow-none"
                        placeholder="Menu Item number"
                      />
                    </div>
                    <div className="col-1"></div>
                    <div className={isMobile ? "col-4 d-flex justify-content-end" : "col-4 d-flex justify-content-center"}>
                      <select id="portion-4" defaultValue={localStorage.getItem("portion_4") ? localStorage.getItem("portion_4") : "0"}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-3 mt-5 pt-3"  >
                  <label htmlFor="Input" className="form-label fw-bold">Please state your allergies, if any
                  </label>
                  <input type="text" className="form-control shadow-none" id="allergies" style={{ borderRadius: "15px", backgroundColor: "rgba(128, 128, 128,0.4)" }} placeholder="Enter Allergies" defaultValue={localStorage.getItem("allergies")} />
                </div>

                <div className="mb-3 pt-3"  >
                  <label htmlFor="Input" className="form-label fw-bold">Do you want the chef to pick up groceries? </label>
                  <label>Grocery delivery fees is $14.99 </label>
                  <div className="mt-3 row ">
                    <div key="1" className="col p-0 mx-1">
                      <input type="radio" id="want-grocerties-yes" name="chef_grocery_pickup" className="Send_data input-hidden" value="Yes" defaultChecked={localStorage.getItem("chef_grocery_pickup") === "Yes"} />
                      <label className="time-availablibilty" htmlFor="want-grocerties-yes" style={{ fontSize: "14px" }}>
                        Yes
                      </label>
                    </div>
                    <div key="2" className="col p-0 mx-1">
                      <input type="radio" id="want-grocerties-no" name="chef_grocery_pickup" className="Send_data input-hidden" value="No" defaultChecked={localStorage.getItem("chef_grocery_pickup") === "No"} />
                      <label className="time-availablibilty" htmlFor="want-grocerties-no" style={{ fontSize: "14px" }}>
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-3"  >
                  <label htmlFor="Input" className="form-label fw-bold">Add instructions for the Chef </label>
                  <input type="text" className="form-control shadow-none" id="instructions_for_chef" style={{
                    borderRadius: "15px", backgroundColor: "rgba(128, 128, 128,0.4)"
                  }} placeholder="Enter Instructions" defaultValue={localStorage.getItem("instructions_for_chef")} />
                </div>
                <h6 className="text-center error-msg validation">{""}</h6>

                <div className="edit_btn mt-5 text-center">
                  <button type="button" className="btn btn-orange rounded-pill mb-3" onClick={navigateToSummary} style={{
                    width: "60%",
                    margin: "auto"
                  }}> Next </button>
                </div>

              </div>
            </form>
          </div>


        </div>
      </div>
      <Footer top={1} />
    </>
  );
}

export default BookingDetail;
