import React from "react";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function ChefCard(props) {
  let navigate = useNavigate();
  function navigateToDetail(chef_id) {
    localStorage.setItem("chef_id", chef_id)
    navigate("/browse-chef");
  }
  return (
    <>
      <div className="col-md-4 my-3 d-flex justify-content-center">
        <div
          className="card prof"
          style={{
            maxWidth: "350px",
            borderRadius: "20px",
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
            border: "none",
          }}
        >
          <OwlCarousel items={1} center={true} mouseDrag={true} touchDrag={true} autoplay={true} autoplayHoverPause={true} dotsEach={true} className="owl-theme" loop>
            <div className="d-flex justify-content-center align-items-center">
              <img
                key={100}
                src={props.data.chef_profile_image}
                className="card-img-top"
                alt="..."
                style={{ maxHeight: "300px", cursor: "pointer", width: "auto", maxWidth: "100%" }}
                onClick={() => navigateToDetail(props.data.chef_id)}
              />
            </div>
            {props.data.chef_images ? props.data.chef_images.map((element, index) => {
              return <div className="d-flex justify-content-center align-items-center">
                <img
                  key={index}
                  src={element}
                  className="card-img-top"
                  alt="..."
                  style={{ maxHeight: "300px", width: "auto", maxWidth: "100%" }}
                />
              </div>
            }) : null}
          </OwlCarousel>
          <div className="card-body py-4 pb-0" onClick={() => navigateToDetail(props.data.chef_id)} style={{ cursor: "pointer" }}>
            <div className="container d-flex justify-content-between">
              <div className="name">
                <h6 className="fw-bolder" style={{ fontSize: "1rem" }}>
                  {props.data.chef_name}
                </h6>
              </div>
              <div className="Rating">
                <Rating
                  allowFraction={true}
                  initialValue={props.data.chef_rating}
                  size={22}
                  allowHover={false}
                  readonly={true}
                  style={{ display: "flex" }}
                />
              </div>
            </div>
            <div className="container d-flex justify-content-start mt-3">
              <h6 style={{ fontSize: "0.9rem" }} className="location">
                {props.data.chef_address}
              </h6>
            </div>
            <div className="container d-flex justify-content-start">
              <p
                style={{ fontSize: "0.9rem", marginTop: "6px" }}
                className="description"
              >
                {props.data.chef_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChefCard;
