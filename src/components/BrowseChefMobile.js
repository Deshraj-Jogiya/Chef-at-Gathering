import React, { useState, useEffect } from "react";
import LoggedNav from "../components/LoggedNav";
import Spinner from "../element/BePatient";
import Footer from "../components/Footer";
import PopUp from "../components/Popup";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import profile from "../images/Vector.jpg";

function BrowseChefMobile(props) {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();
  let chefid = localStorage.getItem("chef_id")

  const updateChefs = async () => {
    setLoading(true);
    let data = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/get_chef_detail`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chef_id: chefid.toString(),
        }),
      }
    );
    let parsedData = await data.json();
    setDetails(parsedData.data);
    var title = `${parsedData.data ? parsedData.data[0].chef_name : ""} - Chef Details | CHEF REPUBLIC`
    const titleTag = document.querySelector('title');
    titleTag.innerText = title;
    const metaTitle = document.querySelector("meta[name='title']");
    metaTitle.setAttribute('content', title)
    setLoading(false);
  };
  useEffect(() => {
    updateChefs();
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
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <LoggedNav customer={props.customer} />
          <div className="fixBox">
            <button className="btn-orange my-1" onClick={() => { localStorage.setItem("chef_id", details[0].chef_id); navigate("/booking-detail") }}>Select Private Chef</button>
          </div>

          <div className="image-box">
            <OwlCarousel items={1} center={true} mouseDrag={true} touchDrag={true} autoplay={true} autoplayHoverPause={true} dotsEach={true} className="owl-theme my-4" loop>
              <div className="d-flex justify-content-center align-items-center"><img
                src={details[0].chef_profile_image}
                alt=""
                style={{ height: "280px", width: "auto", maxWidth: "100%" }}
              /></div>
              {details[0].chef_images ? details[0].chef_images.map((element, index) => {
                return <div className="d-flex justify-content-center align-items-center"><img
                  src={element}
                  alt=""
                  style={{ height: "280px", width: "auto", maxWidth: "100%" }}
                /></div>
              }) : null}
            </OwlCarousel>
          </div>
          <div className="container-fluid">
            <div className="row mt-3">
              <div className="col-8">
                <h3 className="fw-bolder">{details[0].chef_name}, {details[0].chef_sex}</h3>
                <p>{details[0].chef_city}</p>
              </div>
              <div className="col-4 text-end">
                <Rating
                  allowFraction={true}
                  initialValue={details[0].chef_rating}
                  size={18}
                  allowHover={false}
                  readonly={true}
                />{" "}
                <p className="review-count">
                  {details[0].chef_total_number_of_reviews} reviews
                </p>
              </div>
            </div>

            <hr />
            <div className="message_box py-1 text-center">
              <h5 className="text-center" style={{ fontWeight: 700 }}>I can cook</h5>
              <p className="mt-1 text-break">{details[0].chef_catgeories.replaceAll(",", ", ")}</p>
              <button
                type="button"
                className="btn-orange"
                data-bs-toggle={details[0].chef_menu ? "modal" : ""}
                data-bs-target={details[0].chef_menu ? "#staticBackdrop" : ""}
              >
                View my menu
              </button>
              {details[0].chef_menu ? <PopUp pdf={details[0].chef_menu} /> : null}
            </div>
            <hr />
            <div className=" my-2 py-2 ">
              <h5 className="my-2 pb-2 text-center" style={{ fontWeight: 700 }}>My Availability</h5>
              <div className="row p-3">
                {details[0].chef_availability && details[0].chef_availability.monday.length > 0 ? <>
                  <div className="col-3 text-start p-0 my-2">
                    <p className="p-0 m-0" style={{ fontWeight: 700 }}>Mon:</p>
                  </div>
                  <div className="col-9 text-start p-0 my-2">
                    <p className="p-0 m-0" style={{ fontSize: "1rem", letterSpacing: -0.1 }}>{details[0].chef_availability.monday.join("; ")}</p>
                  </div>
                </> : null}
                {details[0].chef_availability && details[0].chef_availability.tuesday.length > 0 ? <>
                  <div className="col-3 text-start p-0 my-2">
                    <p className="p-0 m-0" style={{ fontWeight: 700 }}>Tue:</p>
                  </div>
                  <div className="col-9 text-start p-0 my-2">
                    <p className="p-0 m-0" style={{ fontSize: "1rem", letterSpacing: -0.1 }}>{details[0].chef_availability.tuesday.join("; ")}</p>
                  </div>
                </> : null}
                {details[0].chef_availability && details[0].chef_availability.wednesday.length > 0 ? <>
                  <div className="col-3 text-start p-0 my-2">
                    <p className="p-0 m-0" style={{ fontWeight: 700 }}>Wed:</p>
                  </div>
                  <div className="col-9 text-start p-0 my-2">
                    <p className="p-0 m-0" style={{ fontSize: "1rem", letterSpacing: -0.1 }}>{details[0].chef_availability.wednesday.join("; ")}</p>
                  </div>
                </> : null}
                {details[0].chef_availability && details[0].chef_availability.thursday.length > 0 ? <>
                  <div className="col-3 text-start p-0 my-2">
                    <p className="p-0 m-0" style={{ fontWeight: 700 }}>Thu:</p>
                  </div>
                  <div className="col-9 text-start p-0 my-2">
                    <p className="p-0 m-0" style={{ fontSize: "1rem", letterSpacing: -0.1 }}>{details[0].chef_availability.thursday.join("; ")}</p>
                  </div>
                </> : null}
                {details[0].chef_availability && details[0].chef_availability.friday.length > 0 ? <>
                  <div className="col-3 text-start p-0 my-2">
                    <p className="p-0 m-0" style={{ fontWeight: 700 }}>Fri:</p>
                  </div>
                  <div className="col-9 text-start p-0 my-2">
                    <p className="p-0 m-0" style={{ fontSize: "1rem", letterSpacing: -0.1 }}>{details[0].chef_availability.friday.join("; ")}</p>
                  </div>
                </> : null}
                {details[0].chef_availability && details[0].chef_availability.saturday.length > 0 ? <>
                  <div className="col-3 text-start p-0 my-2">
                    <p className="p-0 m-0" style={{ fontWeight: 700 }}>Sat:</p>
                  </div>
                  <div className="col-9 text-start p-0 my-2">
                    <p className="p-0 m-0" style={{ fontSize: "1rem", letterSpacing: -0.1 }}>{details[0].chef_availability.saturday.join("; ")}</p>
                  </div>
                </> : null}
                {details[0].chef_availability && details[0].chef_availability.sunday.length > 0 ? <>
                  <div className="col-3 text-start p-0 my-2">
                    <p className="p-0 m-0" style={{ fontWeight: 700 }}>Sun:</p>
                  </div>
                  <div className="col-9 text-start p-0 my-2">
                    <p className="p-0 m-0" style={{ fontSize: "1rem", letterSpacing: -0.1 }}>{details[0].chef_availability.sunday.join("; ")}</p>
                  </div>
                </> : null}
              </div>
            </div>
            <hr />
            <div className="message_box my-4 text-center ">
              <h5 className="my-2 py-2" style={{ fontWeight: 700 }}>
                About me
              </h5>
              <p className="my-2 text-justify">{details[0].chef_description}</p>
            </div>
            <hr />
            <div className="row mt-3 text-center">
              <div className="col">
                <h5 className="text-center" style={{ fontWeight: 700 }}>
                  Client Reviews
                </h5>
              </div>

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
                })

                }
              </OwlCarousel> : <p className="my-2 text-justify">No Review Yet</p>}
            </div>
          </div>

          <Footer top={1} />
        </>
      )}
    </>
  );
}

export default BrowseChefMobile;
