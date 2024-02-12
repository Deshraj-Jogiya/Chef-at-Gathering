import React, { useState, useEffect } from "react";
import Spinner from "../element/BePatient";
import Footer from "../components/Footer";
import PopUp from "../components/Popup";
import { RiArrowLeftSLine } from "react-icons/ri";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Nav from "../components/Nav";
import profile from "../images/Vector.jpg";

function BrowseChef(props) {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();
  let chefid = localStorage.getItem("chef_id");
  useEffect(() => {
    updateChefs(chefid);

    var title = `Chef Details | CHEF REPUBLIC`
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
    // eslint-disable-next-line
  }, []);
  const updateChefs = async (chef_id) => {
    setLoading(true);
    let data = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/guest_get_chef_detail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chef_id: chef_id.toString(),
        }),
      }
    );
    if (data.status === 500) {
      navigate("/sign-in")
    }
    let parsedData = await data.json();
    setDetails(parsedData.data);
    var title = `${parsedData.data ? parsedData.data[0].chef_name : ""} - Chef Details | CHEF REPUBLIC`
    const titleTag = document.querySelector('title');
    titleTag.innerText = title;
    const metaTitle = document.querySelector("meta[name='title']");
    metaTitle.setAttribute('content', title)
    setLoading(false);
  };
  function navigateToDetail(chef_id) {
    localStorage.setItem("chef_id", chef_id)
    navigate("/booking-detail");
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Nav customer={props.customer} />
          <div className="container mt-5 ">
            <nav aria-label="breadcrumb">
              <a
                href="/chef-list"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: 500,
                }}
              >
                <RiArrowLeftSLine size={"2.3rem"} />{" "}
                <span
                  style={{
                    textDecoration: "none",
                    color: "orange",
                    fontWeight: 700,
                  }}
                >
                  Browse Chef{" "}
                </span>
              </a>
              / {details[0].chef_name}
            </nav>

            <div
              className="main_container row"
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                flexWrap: "wrap",
                width: "100%",
                height: "auto",
              }}
            >
              <div
                className="col-4 prof"
              >
                <OwlCarousel items={1} center={true} mouseDrag={true} touchDrag={true} autoplay={true} autoplayHoverPause={true} dotsEach={true} className="owl-theme my-4" loop>
                  <div className="d-flex justify-content-center align-items-center"><img
                    key={-1}
                    alt=""
                    className="image_box"
                    src={details[0].chef_profile_image}
                    style={{
                      maxHeight: "300px", width: "auto", maxWidth: "100%",
                      borderRadius: "20px",
                      marginTop: "20px",
                    }}
                  />
                  </div>
                  {details[0].chef_images ? details[0].chef_images.map((element, index) => {
                    return <div className="d-flex justify-content-center align-items-center"><img
                      key={index}
                      alt=""
                      className="image_box"
                      src={element}
                      style={{
                        maxHeight: "300px", width: "auto", maxWidth: "100%",
                        borderRadius: "20px",
                        marginTop: "20px",
                      }}
                    /></div>
                  }) : null}
                </OwlCarousel>

                <div className="edit_btn mt-4">
                  <button
                    onClick={() => { navigateToDetail(details[0].chef_id) }}
                    className="btn btn-orange rounded-pill mb-3 "
                    style={{ width: "90%" }}
                  >
                    Reserve Chef
                  </button>
                </div>
              </div>

              <div
                className="col-8"
              >
                <div className="box_title">
                  <h1 className="">{details[0].chef_name}, {details[0].chef_sex}</h1>
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
                  <p className="mt-2">{details[0].chef_catgeories.replaceAll(",", ", ")}</p>
                </div>
                <button
                  type="button"
                  className="btn-orange"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  View my menu
                </button>
                <PopUp pdf={details[0].chef_menu} />
                <hr />

                <div className="message_box my-2 py-2 ">
                  <h5 className="my-2 pb-2" style={{ fontWeight: 700 }}>My Availability</h5>
                  <div className="row">
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
                            <img src={element.user_image ? element.user_image : profile} className="rounded-pill" style={{ width: "35px", height: "35px" }} alt="" />
                          </div>
                          <p className="review-count" style={{ marginLeft: "15px", marginBottom: "1px", fontSize: "0.9rem" }}>{element.reviewed_by}</p>
                        </div>
                      </div>
                    })}
                  </OwlCarousel> : <p className="my-2 text-justify">No Review Yet</p>}
                </div>
              </div>
            </div>
          </div>
          <Footer top={1} />
        </>
      )
      }
    </>
  );
}

export default BrowseChef;
