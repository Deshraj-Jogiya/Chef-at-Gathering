import React, { useState, useEffect } from "react";
import LoggedNav from "../components/LoggedNav";
import Spinner from "./BePatient";
import Footer from "../components/Footer";
import PopUp from "../components/Popup";
import { RiArrowLeftSLine } from "react-icons/ri";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function BrowseChef(props) {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  function extractValue(arr, prop) {

    // extract value from property
    let extractedValue = arr.map(item => item[prop]);

    return extractedValue;

  }
  let navigate = useNavigate();

  const updateChefs = async () => {
    setLoading(true);
    let data = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/loggedin_chef_detail`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    let parsedData = await data.json();
    setDetails(parsedData.data);
    setLoading(false);
  };
  let role = localStorage.getItem("role");
  let token = localStorage.getItem("token");
  useEffect(() => {
    var title = "Profile | CHEF | CHEF REPUBLIC"
    var desc = "View Chef Profile in Detail including the menu, available timings, learn about the Chef, get to know the chef by viewing their pics"
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
    if (token === null || !token) {
      navigate("/chef/sign-in");
      window.location.reload();
    }
    updateChefs();
    // eslint-disable-next-line
  }, []);
  function navigateEdit() {
    navigate("/chef/profile/edit");
  }
  function logout() {
    localStorage.clear()
    navigate("/chef");
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <LoggedNav customer={props.customer} />
          <div className="container mt-5 ">
            {isMobile ? null : <nav aria-label="breadcrumb">
              <a
                href="/chef/order-list"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: 500,
                }}
              >
                <RiArrowLeftSLine size={"2rem"} />{" "}
                <span
                  style={{
                    textDecoration: "none",
                    color: "#1e1e1e",
                    fontWeight: 400
                  }}
                >
                  Order List{" "}
                </span>
              </a>
            </nav>}

            <div
              className="main_container row"
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                // width: "100%",
                height: "auto",
              }}
            >
              <div
                className="col-4 prof"
              >
                {/* <div
                  className="image_box"
                  style={{
                    backgroundImage: `url(${details[0].chef_profile_image})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "90%",
                    height: "300px",
                    borderRadius: "20px",
                    marginTop: "20px",
                  }}
                ></div> */}
                <OwlCarousel items={1} center={true} mouseDrag={true} touchDrag={true} autoplay={true} autoplayHoverPause={true} dotsEach={true} className="owl-theme my-4" loop>
                  <div className="d-flex justify-content-center align-items-center"><img
                    alt=""
                    className="image_box"
                    src={details[0].chef_profile_image}
                    style={{
                      maxHeight: "300px", width: "auto", maxWidth: "90%",
                      borderRadius: "20px",
                      marginTop: "20px",
                    }}
                  /></div>
                  {details[0].chef_images.map((element, index) => {
                    return <div className="d-flex justify-content-center align-items-center"><img
                      alt=""
                      className="image_box"
                      src={element}
                      style={{
                        maxHeight: "300px", width: "auto", maxWidth: "90%",
                        borderRadius: "20px",
                        marginTop: "20px",
                      }}
                    /></div>
                  })}
                </OwlCarousel>

                <div className="">
                  <button
                    onClick={navigateEdit}
                    type="button"
                    className="btn btn-orange rounded-pill mb-3 "
                    style={{ width: "90%" }}
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => { navigate("/chef/order-list") }}
                    type="button"
                    className="btn btn-orange rounded-pill mb-3 "
                    style={{ width: "90%" }}
                  >
                    Order List
                  </button>
                  <button
                    onClick={logout}
                    type="button"
                    className="btn btn-orange rounded-pill mb-3 "
                    style={{ width: "90%" }}
                  >
                    Logout
                  </button>
                </div>
              </div>

              <div
                className="col-8"
              >
                <div className="box_title">
                  <h1 className="">{details[0].chef_name + (details[0].chef_sex ? ", " + details[0].chef_sex : "")}</h1>
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
                    <p style={{ fontSize: "0.9rem", color: "#7C7C7C" }}>
                      {details[0].chef_total_number_of_reviews} reviews
                    </p>
                  </div>
                </div>

                <hr />

                <div className="message_box my-2 py-2">
                  <h5 style={{ fontWeight: 700 }}>I can cook</h5>
                  <p className="mt-2">{details[0].chef_catgeories ? extractValue(details[0].chef_catgeories, "category_name").join(", ") : ""}</p>
                </div>
                <button
                  type="button"
                  className="btn-orange"
                  data-bs-toggle={details[0].chef_menu ? "modal" : ""}
                  data-bs-target={details[0].chef_menu ? "#staticBackdrop" : ""}
                >
                  View my menu
                </button>
                {details[0].chef_menu ? <PopUp pdf={details[0].chef_menu} /> : null}
                <hr />

                <div className="message_box my-2 py-2 ">
                  <h5 className="my-2 pb-2" style={{ fontWeight: 700 }}>My Availability</h5>
                  <div className="row d-flex justify-content-between">
                    {details[0].chef_availability && details[0].chef_availability.monday.length > 0 ? <div className="col-6 row my-1">
                      <p style={{ fontSize: "0.9rem", fontWeight: 700 }} className="col-3">Mon:</p>
                      <p style={{ fontSize: "0.9rem" }} className="col-9 p-0">{details[0].chef_availability.monday.join("; ")}</p>
                    </div> : null}
                    {details[0].chef_availability && details[0].chef_availability.tuesday.length > 0 ? <div className="col-6 row my-1">
                      <p style={{ fontSize: "0.9rem", fontWeight: 700 }} className="col-3">Tue:</p>
                      <p style={{ fontSize: "0.9rem" }} className="col-9 p-0">{details[0].chef_availability.tuesday.join("; ")}</p>
                    </div> : null}
                    {details[0].chef_availability && details[0].chef_availability.wednesday.length > 0 ? <div className="col-6 row my-1">
                      <p style={{ fontSize: "0.9rem", fontWeight: 700 }} className="col-3">Wed:</p>
                      <p style={{ fontSize: "0.9rem" }} className="col-9 p-0">{details[0].chef_availability.wednesday.join("; ")}</p>
                    </div> : null}
                    {details[0].chef_availability && details[0].chef_availability.thursday.length > 0 ? <div className="col-6 row my-1">
                      <p style={{ fontSize: "0.9rem", fontWeight: 700 }} className="col-3">Thu:</p>
                      <p style={{ fontSize: "0.9rem" }} className="col-9 p-0">{details[0].chef_availability.thursday.join("; ")}</p>
                    </div> : null}
                    {details[0].chef_availability && details[0].chef_availability.friday.length > 0 ? <div className="col-6 row my-1">
                      <p style={{ fontSize: "0.9rem", fontWeight: 700 }} className="col-3">Fri:</p>
                      <p style={{ fontSize: "0.9rem" }} className="col-9 p-0">{details[0].chef_availability.friday.join("; ")}</p>
                    </div> : null}
                    {details[0].chef_availability && details[0].chef_availability.saturday.length > 0 ? <div className="col-6 row my-1">
                      <p style={{ fontSize: "0.9rem", fontWeight: 700 }} className="col-3">Sat:</p>
                      <p style={{ fontSize: "0.9rem" }} className="col-9 p-0">{details[0].chef_availability.saturday.join("; ")}</p>
                    </div> : null}
                    {details[0].chef_availability && details[0].chef_availability.sunday.length > 0 ? <div className="col-6 row my-1">
                      <p style={{ fontSize: "0.9rem", fontWeight: 700 }} className="col-3">Sun:</p>
                      <p style={{ fontSize: "0.9rem" }} className="col-9 p-0">{details[0].chef_availability.sunday.join("; ")}</p>
                    </div> : null}
                  </div>
                </div>

                <hr />

                <div className="message_box my-4 ">
                  <h5 className="my-2 py-2" style={{ fontWeight: 700 }}>
                    About me
                  </h5>
                  <p className="my-2">{details[0].chef_description}</p>
                </div>

                <hr />

                <div className="message_box my-4">
                  <h5 className="my-2" style={{ fontWeight: 700 }}>
                    Client Reviews
                  </h5>

                  {details[0].chef_reviews && details[0].chef_reviews.length > 0 ? <OwlCarousel items={1} mouseDrag={true} touchDrag={true} autoplay={true} autoplayHoverPause={true} dotsEach={true} className="owl-theme my-4" loop>
                    {details[0].chef_reviews.map((element, index) => {
                      return <div className="item" key={index}>
                        <Rating
                          allowFraction={true}
                          initialValue={element.rating}
                          size={24}
                          allowHover={false}
                          readonly={true}
                          style={{ display: "flex", margin: "10px 0", alignItems: "center" }}
                        />
                        <p className="mt-2 text-wrap text-break" style={{ fontSize: "0.9rem" }}>{element.review_content}</p>
                        <div className="d-flex justify-content-start align-items-center">
                          <div className="ratings text-warning h4 my-3">
                            <img src={element.user_image} className="rounded-pill" style={{ width: "35px", height: "35px" }} alt="" />
                          </div>
                          <p className="review-count" style={{ marginLeft: "15px", marginBottom: "1px", fontSize: "0.9rem" }}>{element.reviewed_by}</p>
                        </div>
                      </div>
                    })

                    }
                  </OwlCarousel> : <p className="my-2 text-justify">No Review Yet</p>}
                </div>
              </div>
            </div>
          </div>
          <Footer top={1} />
        </>
      )}
    </>
  );
}

export default BrowseChef;
