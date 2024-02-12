import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedNav from "../components/LoggedNav";
import Spinner from "../element/BePatient";
import Footer from "../components/Footer";
import $ from "jquery";
import { RiArrowLeftSLine } from 'react-icons/ri';
import { Rating } from 'react-simple-star-rating';
import { isMobile } from "react-device-detect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { callErrorApi } from '../errorHandle/callErrorApi';
function BrowseChef(props) {
  const [details, setDetails] = useState([])
  const [cuisine, setCuisine] = useState([])
  const [timeSlot, setTimeSlot] = useState([])
  const [weekDays, setWeekDays] = useState("")
  let date_arr = localStorage.getItem("booking_date")?.split("/")
  let date = date_arr ? new Date(date_arr[2] + "-" + date_arr[0] + "-" + date_arr[1]) : new Date()
  const [startDate, setStartDate] = useState(date);

  let navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  let chef_id = localStorage.getItem("chef_id");
  function navigateToDetail() {
    navigate("/browse-chef")
  }
  function updateDate(date) {
    setWeekDays("")
    const d_ob = new Date(date);
    setStartDate(d_ob);
    localStorage.setItem("booking_date", setLocalDate(d_ob))
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    setWeekDays(weekday[d_ob.getDay()])
    getTimeSlot(chef_id, setApiDate(d_ob))

  }
  const setLocalDate = (value) => {
    let month = ""
    let date = ""
    if ((value.getMonth() + 1) < 10) {
      month = "0" + (value.getMonth() + 1).toString()
    } else {
      month = (value.getMonth() + 1).toString()
    }
    if (value.getDate() < 10) {
      date = "0" + (value.getDate()).toString()
    } else {
      date = (value.getDate()).toString()
    }
    let us_date_string = month + "/" + date + "/" + value.getFullYear().toString()
    return us_date_string
  }
  const setApiDate = (value) => {
    let month = ""
    let date = ""
    if ((value.getMonth() + 1) < 10) {
      month = "0" + (value.getMonth() + 1).toString()
    } else {
      month = (value.getMonth() + 1).toString()
    }
    if (value.getDate() < 10) {
      date = "0" + (value.getDate()).toString()
    } else {
      date = (value.getDate()).toString()
    }
    let api_date_string = date + "-" + month + "-" + value.getFullYear().toString()
    return api_date_string
  }
  async function navigateToBooking() {
    if (!$("#address").val()) {
      $("#address").addClass("invalid")
      $(".validation").html("Please add address")
      return false
    }
    if (!startDate) {
      $(".validation").html("Please select booking date")
      return false
    }
    if (!$("input[name='timeslots']:checked").val()) {
      $(".validation").html("Please select timeslot")
      $("input[name='timeslots']").addClass("invalid")
      return false
    }
    if (!$("input[name='food_categories']:checked").val()) {
      $(".validation").html("Please select food category")
      $("input[name='food_categories']").addClass("invalid")
      return false
    }
    if (!$("#address").val()
      || !startDate
      || !$("input[name='timeslots']:checked").val()
      || !$("input[name='food_categories']:checked").val()) {
      $(".validation").html("All fields are mandatory")
      return false
    }
    localStorage.setItem("chef_id", chef_id)
    localStorage.setItem("address", $("#address").val())
    localStorage.setItem("booking_date", setLocalDate(startDate))
    localStorage.setItem("timeslots", $("input[name='timeslots']:checked").val())
    localStorage.setItem("food_categories", $("input[name='food_categories']:checked").val())
    navigate("/booking-detail-1")
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
      await getChefCuisine(chef_id)
      await getProfileData()
      setLoading(false)
    } catch (error) {
      callErrorApi(`catch_error: ${process.env.REACT_APP_BASE_URL}user/get_chef_detail`, localStorage.getItem("owner"), error);
      setLoading(false);
    }
  }
  const getChefCuisine = async (chef_id) => {
    setLoading(true)
    try {
      let data = await fetch(`${process.env.REACT_APP_BASE_URL}user/get_chef_cuisines`,
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
      setCuisine(parsedData.data)
      setLoading(false)
    } catch (error) {
      callErrorApi(`catch_error: ${process.env.REACT_APP_BASE_URL}user/get_chef_cuisines`, localStorage.getItem("owner"), error);
      setLoading(false);
    }
  }
  const getTimeSlot = async (chef_id, date) => {
    try {
      setTimeSlot([])
      let data = await fetch(`${process.env.REACT_APP_BASE_URL}user/get_booked_chef_timeslots`,
        {
          method: 'POST',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "chef_id": (chef_id).toString(),
            "selected_date": date
          })
        });
      let parsedData = await data.json()
      setTimeSlot(parsedData.data)
    } catch (error) {
      callErrorApi(`catch_error: ${process.env.REACT_APP_BASE_URL}user/get_booked_chef_timeslots`, localStorage.getItem("owner"), error);
    }
  }
  const getProfileData = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BASE_URL}user/loggedin_customer_detail`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const res_json = await response.text();
      const data = JSON.parse(res_json);
      if (data.status === true) { setProfile(data.data[0]); } else {
        callErrorApi(`response_error: ${process.env.REACT_APP_BASE_URL}user/loggedin_customer_detail`, localStorage.getItem("owner"), data);
      }
    } catch (error) {
      callErrorApi(`catch_error: ${process.env.REACT_APP_BASE_URL}user/loggedin_customer_detail`, localStorage.getItem("owner"), error);
    }
  };

  useEffect(() => {
    updateChefs(chef_id);
    updateDate(localStorage.getItem("booking_date") ? localStorage.getItem("booking_date") : new Date())
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

        <div className="main_container row" id="profile-chef-complete" >
          {isMobile ?
            <div className="d-flex justify-content-center">
              <div className="col-12 row p-3" style={{ boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)", border: "none", borderRadius: "20px" }}>
                <div className="col-4 d-flex justify-content-center align-items-center" style={{ width: "80px", height: "80px" }}>
                  <img
                    alt=""
                    className="image_box"
                    src={details[0].chef_profile_image}
                    style={{
                      width: "auto", maxWidth: "80px",
                      height: "80px",
                      borderRadius: "20px",
                      marginTop: "20px",
                    }}
                  />
                </div>
                <div className="col-8 d-flex justify-content-center align-items-start flex-column">
                  <h4 className="fw-bold">{details[0].chef_name}</h4>
                  <p style={{ fontSize: "0.9rem" }} className="pb-0 mb-0">{details[0].chef_city}</p>
                  <div className="d-flex align-items-center">
                    <Rating
                      allowFraction={true}
                      initialValue={details[0].chef_rating}
                      size={18}
                      allowHover={false}
                      readonly={true}
                      style={{ display: "flex", alignItems: "center" }}
                    />
                    <p style={{ fontSize: "0.9rem", color: "#7C7C7C" }} className="p-0 m-0 ms-2">{details[0].chef_total_number_of_reviews} reviews</p>
                  </div>
                </div>
              </div>
            </div> :
            <div className="col-5">
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
            <div style={{ width: "300px" }}>
              <h5 className="text-center my-3 py-3 fw-bold">Enter Booking Details</h5>
            </div>
            <div className="my-2" style={{ width: "90%" }}>
              <h6 htmlFor="#address" className="pb-2 fw-bold">Enter full address for service</h6>
              <textarea id="address" className="form-control shadow-none" rows={3} name="address" defaultValue={localStorage.getItem("address") ? localStorage.getItem("address") : profile.customer_address}></textarea>
            </div>
            <div className="my-4" style={{ width: "90%" }}>
              <h6 htmlFor="#date" className="pb-2 fw-bold">Choose date</h6>
              <DatePicker
                showIcon
                value={localStorage.getItem("booking_date") ? localStorage.getItem("booking_date") : null}
                style={{ borderRadius: "30px", padding: "10px", background: "#EDEDED", border: "none", fontSize: "1rem" }}
                dateFormat="MM/dd/yyyy"
                selected={startDate}
                className="w-100 border-0 booking_date"
                minDate={new Date()}
                onChange={(date) => { updateDate(date) }}
              />
            </div>
            <hr style={{ width: "90%" }} />
            <div className="my-4" style={{ width: "90%" }}>
              <h6 htmlFor="#timeslot" className="pb-2 fw-bold">Select a Timeslot</h6>
              <div className="row">
                {weekDays === "Monday" && details[0].chef_availability ? <div className="col-sm-6 col-md-6 my-2">
                  <h6 style={{ fontSize: "0.9rem", fontWeight: "400" }}>Monday</h6>
                  <div className="d-flex justify-content-start">
                    {details[0].chef_availability.monday.length > 0 ? details[0].chef_availability.monday.map((element, index) => {
                      return <div key={index} className="col-md-4 p-0 mx-1">
                        <input disabled={timeSlot ? timeSlot.includes(element) : false} type="radio" onChange={() => { $(".validation").html("") }} id={`radiobtn-${element}-monday`} name="timeslots" className="Send_data input-hidden" value={element + " Monday"} defaultChecked={element + " Monday" ? element + " Monday" === localStorage.getItem("timeslots") : ""} />
                        <label className="time-availablibilty" htmlFor={`radiobtn-${element}-monday`}>
                          {element}
                        </label>
                      </div>;
                    }) : <h6 style={{ fontSize: "0.8rem", fontWeight: "600" }}>Chef is not available on {weekDays}</h6>}
                  </div>
                </div> : null}
                {weekDays === "Tuesday" && details[0].chef_availability ? <div className="col-sm-6 col-md-6 my-2">
                  <h6 style={{ fontSize: "0.9rem", fontWeight: "400" }}>Tuesday</h6>
                  <div className="d-flex justify-content-start">
                    {details[0].chef_availability.tuesday.length > 0 ? details[0].chef_availability.tuesday.map((element, index) => {
                      return <div key={index} className="col-md-4 p-0 mx-1">
                        <input disabled={timeSlot ? timeSlot.includes(element) : false} type="radio" onChange={() => { $(".validation").html("") }} id={`radiobtn-${element}-tuesday`} name="timeslots" className="Send_data input-hidden" value={element + " Tuesday"} defaultChecked={element + " Tuesday" ? element + " Tuesday" === localStorage.getItem("timeslots") : ""} />
                        <label className="time-availablibilty" htmlFor={`radiobtn-${element}-tuesday`}>
                          {element}
                        </label>
                      </div>;
                    }) : <h6 style={{ fontSize: "0.8rem", fontWeight: "600" }}>Chef is not available on {weekDays}</h6>}
                  </div>
                </div> : null}
                {weekDays === "Wednesday" && details[0].chef_availability ? <div className="col-sm-6 col-md-6 my-2">
                  <h6 style={{ fontSize: "0.9rem", fontWeight: "400" }}>Wednesday</h6>
                  <div className="d-flex justify-content-start">
                    {details[0].chef_availability.wednesday.length > 0 ? details[0].chef_availability.wednesday.map((element, index) => {
                      return <div key={index} className="col-md-4 p-0 mx-1">
                        <input disabled={timeSlot ? timeSlot.includes(element) : false} type="radio" onChange={() => { $(".validation").html("") }} id={`radiobtn-${element}-wednesday`} name="timeslots" className="Send_data input-hidden" value={element + " Wednesday"} defaultChecked={element + " Wednesday" ? element + " Wednesday" === localStorage.getItem("timeslots") : ""} />
                        <label className="time-availablibilty" htmlFor={`radiobtn-${element}-wednesday`}>
                          {element}
                        </label>
                      </div>;
                    }) : <h6 style={{ fontSize: "0.8rem", fontWeight: "600" }}>Chef is not available on {weekDays}</h6>}
                  </div>
                </div> : null}
                {weekDays === "Thursday" && details[0].chef_availability ? <div className="col-sm-6 col-md-6 my-2">
                  <h6 style={{ fontSize: "0.9rem", fontWeight: "400" }}>Thursday</h6>
                  <div className="d-flex justify-content-start">
                    {details[0].chef_availability.thursday.length > 0 ? details[0].chef_availability.thursday.map((element, index) => {
                      return <div key={index} className="col-md-4 p-0 mx-1">
                        <input disabled={timeSlot ? timeSlot.includes(element) : false} type="radio" onChange={() => { $(".validation").html("") }} id={`radiobtn-${element}-thursday`} name="timeslots" className="Send_data input-hidden" value={element + " Thursday"} defaultChecked={element + " Thursday" ? element + " Thursday" === localStorage.getItem("timeslots") : ""} />
                        <label className="time-availablibilty" htmlFor={`radiobtn-${element}-thursday`}>
                          {element}
                        </label>
                      </div>;
                    }) : <h6 style={{ fontSize: "0.8rem", fontWeight: "600" }}>Chef is not available on {weekDays}</h6>}
                  </div>
                </div> : null}
                {weekDays === "Friday" && details[0].chef_availability ? <div className="col-sm-6 col-md-6 my-2">
                  <h6 style={{ fontSize: "0.9rem", fontWeight: "400" }}>Friday</h6>
                  <div className="d-flex justify-content-start">
                    {details[0].chef_availability.friday.length > 0 ? details[0].chef_availability.friday.map((element, index) => {
                      return <div key={index} className="col-md-4 p-0 mx-1">
                        <input disabled={timeSlot ? timeSlot.includes(element) : false} type="radio" onChange={() => { $(".validation").html("") }} id={`radiobtn-${element}-friday`} name="timeslots" className="Send_data input-hidden" value={element + " Friday"} defaultChecked={element + " Friday" ? element + " Friday" === localStorage.getItem("timeslots") : ""} />
                        <label className="time-availablibilty" htmlFor={`radiobtn-${element}-friday`}>
                          {element}
                        </label>
                      </div>;
                    }) : <h6 style={{ fontSize: "0.8rem", fontWeight: "600" }}>Chef is not available on {weekDays}</h6>}
                  </div>
                </div> : null}
                {weekDays === "Saturday" && details[0].chef_availability ? <div className="col-sm-6 col-md-6 my-2">
                  <h6 style={{ fontSize: "0.9rem", fontWeight: "400" }}>Saturday</h6>
                  <div className="d-flex justify-content-start">
                    {details[0].chef_availability.saturday.length > 0 ? details[0].chef_availability.saturday.map((element, index) => {
                      return <div key={index} className="col-md-4 p-0 mx-1">
                        <input disabled={timeSlot ? timeSlot.includes(element) : false} type="radio" onChange={() => { $(".validation").html("") }} id={`radiobtn-${element}-saturday`} name="timeslots" className="Send_data input-hidden" value={element + " Saturday"} defaultChecked={element + " Saturday" ? element + " Saturday" === localStorage.getItem("timeslots") : ""} />
                        <label className="time-availablibilty" htmlFor={`radiobtn-${element}-saturday`}>
                          {element}
                        </label>
                      </div>;
                    }) : <h6 style={{ fontSize: "0.8rem", fontWeight: "600" }}>Chef is not available on {weekDays}</h6>}
                  </div>
                </div> : null}
                {weekDays === "Sunday" && details[0].chef_availability ? <div className="col-sm-6 col-md-6 my-2">
                  <h6 style={{ fontSize: "0.9rem", fontWeight: "400" }}>Sunday</h6>
                  <div className="d-flex justify-content-start">
                    {details[0].chef_availability.sunday.length > 0 ? details[0].chef_availability.sunday.map((element, index) => {
                      return <div key={index} className="col-md-4 p-0 mx-1">
                        <input disabled={timeSlot ? timeSlot.includes(element) : false} type="radio" onChange={() => { $(".validation").html("") }} id={`radiobtn-${element}-sunday`} name="timeslots" className="Send_data input-hidden" value={element + " Sunday"} defaultChecked={element + " Sunday" ? element + " Sunday" === localStorage.getItem("timeslots") : ""} />
                        <label className="time-availablibilty" htmlFor={`radiobtn-${element}-sunday`}>
                          {element}
                        </label>
                      </div>;
                    }) : <h6 style={{ fontSize: "0.8rem", fontWeight: "600" }}>Chef is not available on {weekDays}</h6>}
                  </div>
                </div> : null}
              </div>
            </div>
            <div className="my-4" style={{ width: "90%" }}>
              <h6 htmlFor="#cuisine" className="pb-2 fw-bold">Select a Cuisine</h6>
              <div className="row" style={{ width: "95%" }}>
                {cuisine && cuisine.length > 0 ? cuisine.map((element, index) => {
                  return <div className="col-6 col-md-4 my-2" key={index}>
                    <input
                      type="radio"
                      id={"card-" + element.id.toString()}
                      value={element.id + "-" + element.category_name}
                      onChange={() => { $(".validation").html("") }}
                      name="food_categories"
                      className="Send_data input-hidden"
                      defaultChecked={localStorage.getItem("food_categories") ? element.id === localStorage.getItem("food_categories").split("-")[0] : null}
                    />
                    <label
                      className="time-availablibilty-card"
                      htmlFor={"card-" + element.id.toString()}
                      style={{
                        backgroundImage: `url(${element.category_image})`,
                      }}
                    >
                      {element.category_name}
                    </label>
                  </div>
                }) : null}
              </div>
            </div>
            <h6 className="text-center error-msg validation">{""}</h6>
            <button onClick={navigateToBooking} className="btn-orange my-5">Add Preferences</button>
          </div>

        </div>
      </div>
      <Footer top={1} />
    </>
  );
}

export default BrowseChef;
