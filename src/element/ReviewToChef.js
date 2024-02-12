import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoggedNav from "../components/LoggedNav";
import { isMobile } from "react-device-detect";
import { RiArrowLeftSLine } from 'react-icons/ri';
import $ from "jquery"
import { Rating } from 'react-simple-star-rating'

function ReviewToChef(props) {
    const [chefName, setChefName] = useState("");
    const [chefProfileImage, setChefProfileImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitting1, setIsSubmitting1] = useState(false);
    const [chefId, setchefId] = useState(false);
    const [bookingId, setbookingId] = useState(false);
    const [rating, setRating] = useState(0)

    const navigate = useNavigate();
    const handleRating = (rate) => {
        setRating(rate)
    }
    const sendRating = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        // Catch Rating value
        if (rating === 0) {
            setIsSubmitting(false)
            $(".validation").html("Please rate 1-5 to chef")
        }else if (!$("#feedback_text").val()) {
            setIsSubmitting(false)
            $("#feedback_text").addClass("invalid")
            $(".validation").html("Please enter Something about the chef")
        } else {
            $(".validation").html("");
            let data = await fetch(
                `${process.env.REACT_APP_BASE_URL}review/give_reviews_to_chef`,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chef_id: chefId.toString(),
                        rating: rating.toString(),
                        booking_id: bookingId.toString(),
                        feedback: $("#feedback_text").val(),
                        skip : "no"
                    }),
                }
            );
            let parsedData = await data.json();
            if (parsedData.status === true) {
                setIsSubmitting(false);
                if (localStorage.getItem("from_msg")) {
                    navigate("/message-list")
                } else{
                    navigate("/order-detail")
                }
            }
            else {
                navigate(-1)
            }
        }
    }
    const skipRating = async (e) => {
        e.preventDefault();
        setIsSubmitting1(true)
        // Catch Rating value
            $(".validation").html("");
            let data = await fetch(
                `${process.env.REACT_APP_BASE_URL}review/give_reviews_to_chef`,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        booking_id: bookingId.toString(),
                        skip : "yes"
                    }),
                }
            );
            let parsedData = await data.json();
            if (parsedData.status === true) {
                setIsSubmitting1(false);
                if (localStorage.getItem("from_msg")) {
                    navigate("/message-list")
                } else{
                    navigate("/order-detail")
                }
            }
            else {
                navigate(-1)
            }
    }
    const { state } = useLocation();

    useEffect(() => {
        if (!state || state === null) {
            navigate(-1);
        }
        const { chef_name, chef_profile_image, chef_id, booking_id } = state;
        if (!chef_name || chef_name === null || !chef_profile_image || chef_profile_image === null || chef_id === null || !chef_id || booking_id ===null || !booking_id) {
            navigate(-1);
        }
        setChefName(chef_name)
        setChefProfileImage(chef_profile_image)
        setchefId(chef_id)
        setbookingId(booking_id)
        var title = `Review to ${chef_name} | CHEF REPUBLIC`;
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
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <LoggedNav customer={props.customer} />
            <div className="container my-4">
                {isMobile ? null : <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active" style={{ cursor: "pointer" }} aria-current="page" onClick={() => { navigate(-1) }}>
                            <span className="pe-2 h4">
                                <RiArrowLeftSLine />
                            </span>
                            Go Back
                        </li>
                    </ol>
                </nav>}
                <div className="container d-flex justify-content-center align-items-center">
                    <div className={isMobile ? "pb-3" : "card pb-3"} style={{
                        width: isMobile ? "100%" : "400px", height: isMobile ? "100%" : "620px", borderRadius: "20px",
                        boxShadow: isMobile ? "" : "0,0,0,grba(0,0,0,0.2)", overflow:"hidden", scrollbarWidth:"none"
                    }}>
                        <div className="card-header border-0 bg-transparent">
                            <div className="py-3 d-flex flex-column" key={"1"} style={{ width: isMobile ? "100%" : "99%", height: "auto", borderRadius: "10px", boxShadow: "0,0,0,grba(0,0,0,0.2)", }}>
                                <div className="d-flex justify-content-center">
                                    <img src={chefProfileImage} alt="" style={{ borderRadius: "50%", height: "80px", width: "80px" }} />
                                </div>
                                <div className="text-center mt-3" style={{ paddingLeft: "0" }}>
                                    <h6 className="fw-bold">{chefName}</h6>
                                </div>
                                <div className="text-center mt-2" style={{ paddingLeft: "0" }}>
                                    <h5 className="fw-bold">Write a Review</h5>
                                </div>
                            </div>
                        </div>
                        <div className="card-body" style={{ height: isMobile ? "50vh" : "380px", overflowY: "scroll" }}>
                            <div className="d-flex justify-content-center pt-0">
                                <Rating
                                    onClick={handleRating}
                                    allowFraction={true}
                                    initialValue={0}
                                    size={32}
                                    allowHover={true}
                                />
                            </div>
                            <h6 className="fw-bold text-center my-4">Enter your review</h6>
                            <div className="d-flex justify-content-center mt-3">
                                <textarea
                                    className="p-2 form-control shadow-none"
                                    type="text"
                                    id="feedback_text"
                                    rows={4}
                                    placeholder="Write your feedback here"
                                    style={{
                                        backgroundColor: "rgba(128, 128, 128,0.4)",
                                        outline: "none",
                                        border: "none",
                                        width: "90%",
                                        fontSize: "0.9rem"
                                    }}
                                />
                            </div>
                        </div >
                        <p style={{ color: "red", fontSize: "0.8rem" }} className="validation text-center">{""}</p>

                        <div className="card-footer border-0 bg-white d-flex justify-content-center">
                            <button
                                className="btn btn-orange rounded-pill mb-1 "
                                style={{ width: "90%" }}
                                onClick={sendRating} disabled={isSubmitting}>{isSubmitting ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                ) : (
                                    ""
                                )}{" "}
                                Submit
                            </button>
                        </div >
                        <div className="card-footer border-0 bg-white d-flex justify-content-center">
                            <button
                                className="rounded-pill bg-transparent border-0 mb-3 "
                                style={{ width: "90%", color:"grey" }}
                                onClick={skipRating} disabled={isSubmitting1}>{isSubmitting1 ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                ) : (
                                    ""
                                )}{" "}
                                Skip
                            </button>
                        </div >
                    </div >
                </div >
            </div>
        </>
    );
}

export default ReviewToChef;
