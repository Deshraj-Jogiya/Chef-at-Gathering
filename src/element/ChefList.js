import React, { useState, useEffect } from "react";
import Spinner from "./BePatient";
import LoggedNav from "../components/LoggedNav";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ChefCard from "../components/ChefCard";
import { RiRestaurantLine, RiCalendarLine } from "react-icons/ri";
import { isMobile } from "react-device-detect";
import ContactUsPop from "../components/ContactUsPop";
import Calendar from 'react-calendar';
import $ from 'jquery';
import 'react-calendar/dist/Calendar.css';

function PaymentDetail(props) {
  const [chefs, setChefs] = useState([]);
  const [diets, setDiets] = useState([])
  const [showFilter, setshowFilter] = useState(false)
  const messagesEndRef = React.useRef(null);
  const scrollToTop = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useLayoutEffect(() => {
    scrollToTop()
  });
  let date_arr = localStorage.getItem("booking_date")?.split("/")
  let date_obj = date_arr ? new Date(date_arr[2] + "-" + date_arr[0] + "-" + date_arr[1]) : new Date()
  const [value, onChange] = useState(date_obj);
  const [date, setDate] = useState(localStorage.getItem("booking_date"));
  const [cuisine, setCuisine] = useState(localStorage.getItem("food_categories"));
  const [loading, setLoading] = useState(true);
  const getStatusList = async () => {
    let data = await fetch(
      `${process.env.REACT_APP_BASE_URL}status/all_status`
    );
    let parsedData = await data.json();
    for (let index = 0; index < parsedData.data.length; index++) {
      const element = parsedData.data[index];
      localStorage.setItem(element.name, element.color)
    }
  };
  const updateChefs = async (categoryId, date) => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var date_format_for_api = ""
    if (date) {
      var date_array = date.split("/")
      date_format_for_api = date_array[1] + "-" + date_array[0] + "-" + date_array[2]
    }
    var raw = JSON.stringify({
      "category_id": categoryId,
      "date": date_format_for_api
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let response = await fetch(`${process.env.REACT_APP_BASE_URL}general/get_chef_list_by_category`, requestOptions)
    let parsedData = await response.json();
    var chef_list_restricted = ["9", "48"]
    var chef_restricted = []
    if (parsedData.data.length > 0) {
      parsedData.data.forEach(element => {
        if (!chef_list_restricted.includes(element.chef_id)) {
          chef_restricted.push(element)
        }
      })
    }
    setChefs(chef_restricted);
    if (localStorage.getItem("food_categories") || localStorage.getItem("booking_date")) {
      setshowFilter(true)
    }
    setLoading(false);
  };
  const updateDiets = async () => {
    let data = await fetch(`${process.env.REACT_APP_BASE_URL}general/categories`);
    let parsedData = await data.json()
    setDiets(parsedData.data)
  }
  const setLocalDate = async (value) => {
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
    localStorage.setItem("booking_date", us_date_string);
    $("#modalDate").click();
    setDate(us_date_string)
  }
  useEffect(() => {
    var title = "Browse Chef | CHEF REPUBLIC"
    var desc = "Browse and select Private Chefs based on the date of service and preferred cuisine/diet selected"
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
    let booking_date = localStorage.getItem("booking_date")
    let food_categories = localStorage.getItem("food_categories")
    updateChefs(food_categories ? food_categories.split("-")[0] : "", booking_date ? booking_date : "");
    updateDiets();
    getStatusList()
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div ref={messagesEndRef} />
          {localStorage.getItem("token") ? <LoggedNav customer={props.customer} main={true} /> : <Nav customer={props.customer} />}
          <div className="modal fade" id="dateSelectModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <button id="modalDate" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body d-flex justify-content-center align-items-center m-0">
                  <Calendar onChange={onChange} value={value} minDate={new Date()} />
                </div>
                <div className="modal-footer d-flex justify-content-center align-items-center m-0">
                  <button onClick={() => (setLocalDate(value))} className="btn-orange">Apply</button>
                </div>
              </div>
            </div>
          </div >
          <div className="modal fade" id="CuisineSelectModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <button id="modalCuisine" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body d-flex justify-content-center align-items-center m-0" id="profile-chef-complete">
                  <div className="py-5 row row-cols-md-5 row-cols-sm-2 d-flex justify-content-center">
                    {diets && diets.length > 0 ? diets.map((element, index) => {
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
                <div className="modal-footer d-flex justify-content-center align-items-center m-0">
                  <button onClick={() => { localStorage.setItem("food_categories", $("input[name='food_categories']:checked").val()); $("#modalCuisine").click(); setCuisine($("input[name='food_categories']:checked").val()) }} className="btn-orange">Apply</button>
                </div>
              </div>
            </div>
          </div >
          <div
            className="d-flex align-items-center justify-content-center flex-column py-5"
            style={{
              backgroundColor: "rgba(237, 237, 237, 1)",
              height: "auto",
            }}
          >
            <h1 className="text-center mt-4 fw-bold">
              On Demand Private Chef
            </h1>
            <h4
              style={{
                fontStyle: "normal",
                width: isMobile ? "90%" : "",
                fontWeight: "400",
                fontSize: "1.1rem",
                textAlign: "center",
              }}
            >
              Hire Private Chef for Weekly Meal Prep for a flat rate of
            </h4>
            <h4 className={"text-center fw-bold " + (isMobile ? "fs-3" : "fs-2")}>
              $109
            </h4>
            <h5
              style={{
                fontStyle: "normal",
                width: isMobile ? "90%" : "",
                fontWeight: "400",
                fontSize: "0.5rem",
                textAlign: "center",
              }}
            >
              <span style={{ fontWeight: "800" }}>Serving Location:</span>{" "}
              Philadelphia and Suburbs (within radius of 40 miles)
            </h5>
            <div className="row d-flex justify-content-center" style={{ width: isMobile ? "95%" : "35%" }}>
              <div className="col-sm-6">
                {date ? <button
                  className="bg-white m-1"
                  style={{
                    width: "100%",
                    borderRadius: "30px",
                    padding: "10px",
                    background: "#fff",
                    border: "none",
                    fontSize: "0.9rem",
                    fontWeight: 400
                  }}
                  data-bs-toggle="modal" data-bs-target="#dateSelectModal"
                >
                  {date}
                </button> :
                  <button
                    className="bg-white m-1"
                    style={{
                      width: "100%",
                      borderRadius: "30px",
                      padding: "10px",
                      background: "#fff",
                      border: "none",
                      fontSize: "0.9rem",
                      fontWeight: 400
                    }}
                    data-bs-toggle="modal" data-bs-target="#dateSelectModal"
                  >
                    <RiCalendarLine /> &nbsp;&nbsp; Add a Date
                  </button>}
              </div>
              <div className="col-sm-6">
                {cuisine ? <button
                  className="bg-white m-1"
                  style={{
                    width: "100%",
                    borderRadius: "30px",
                    padding: "10px",
                    background: "#fff",
                    border: "none",
                    fontSize: "0.9rem",
                    fontWeight: 400
                  }}
                  data-bs-toggle="modal" data-bs-target="#CuisineSelectModal"
                >
                  {cuisine.split("-")[1]}
                </button> :
                  <button
                    className="bg-white m-1"
                    style={{
                      width: "100%",
                      borderRadius: "30px",
                      padding: "10px",
                      background: "#fff",
                      border: "none",
                      fontSize: "0.9rem",
                      fontWeight: 400
                    }}
                    data-bs-toggle="modal" data-bs-target="#CuisineSelectModal"
                  >
                    <RiRestaurantLine />
                    &nbsp;&nbsp; Cuisine/Diet Type
                  </button>}
              </div>
              <div className={isMobile ? "col-sm-6" : "col-sm-12 d-flex justify-content-center"}>
                <button
                  className="m-1"
                  onClick={() => { updateChefs(localStorage.getItem("food_categories") ? localStorage.getItem("food_categories").split("-")[0] : "", localStorage.getItem("booking_date")) }}
                  style={{
                    width: isMobile ? "100%" : "80%",
                    borderRadius: "30px",
                    padding: "10px",
                    background: "rgba(255, 94, 65, 1)",
                    color: "#fff",
                    border: "none",
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    cursor: "pointer"
                  }}
                >
                  Show Available Private Chefs
                </button>
              </div>
              <div className={isMobile ? "col-sm-6 text-center mt-2" : "col-sm-12 d-flex text-center justify-content-center"}>
                {showFilter ? <a className="pt-2" style={{ cursor: "pointer" }} onClick={() => { localStorage.removeItem("food_categories"); setCuisine(""); setshowFilter(false); setDate(""); localStorage.removeItem("booking_date"); updateChefs("", "") }}>Clear Filters</a> : null}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row my-5 py-5">
              {chefs && chefs.length > 0 ? chefs.map((item, index) => {
                return <ChefCard key={item.chef_id} data={item} guest={false} />
              }) : <h5 className="text-center">No chef is available for the selected Cuisine and/or Date</h5>}
            </div>
          </div>
          <ContactUsPop underReview={false} />
          <Footer top={1} />
        </>
      )}
    </>
  );
}

export default PaymentDetail;
