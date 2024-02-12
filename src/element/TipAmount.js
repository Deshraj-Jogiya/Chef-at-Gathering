import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoggedNav from "../components/LoggedNav";
import { isMobile } from "react-device-detect";
import { RiArrowLeftSLine } from 'react-icons/ri';
import profile from "../images/Vector.jpg";
import { BiDotsVerticalRounded } from "react-icons/bi";
import $ from "jquery"

function MessageView(props) {
    const [chefName, setChefName] = useState("");
    const [chefProfileImage, setChefProfileImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitting1, setIsSubmitting1] = useState(false);
    const [bookingId, setBookingId] = useState(false);
    const [bookingStatus, setBookingStatus] = useState(false);

    const navigate = useNavigate();
    const sendTip = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        if (!$("#amount").val()) {
            setIsSubmitting(false);
            $("#amount").addClass("invalid")
            $(".validation").html("Please enter Tips Amount")
        } else {
            let data = await fetch(
                `${process.env.REACT_APP_BASE_URL}book/add_chef_booking_tip`,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        booking_id: bookingId.toString(),
                        tip_amount: $("#amount").val(),
                        skip: "no",
                    }),
                }
            );
            let parsedData = await data.json();
            if (parsedData.status === true) {
                setIsSubmitting(false);
                if (localStorage.getItem("from_msg")) {
                    navigate("/message-list")
                  } else{
                    navigate("/tip-amount/confirm")
                  }
            }
            else {
                navigate(-1)
            }
        }
    }
    const skipTip = async (e) => {
        e.preventDefault();
        setIsSubmitting1(true)
        let data = await fetch(
            `${process.env.REACT_APP_BASE_URL}book/add_chef_booking_tip`,
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    booking_id: bookingId.toString(),
                    skip: "yes",
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
        const { chef_name, chef_profile_image, booking_id, booking_status } = state;
        if (!chef_name || chef_name === null || !chef_profile_image || chef_profile_image === null || booking_id === null || !booking_id || booking_status === null || !booking_status) {
            navigate(-1);
        }
        setChefName(chef_name)
        setChefProfileImage(chef_profile_image)
        setBookingId(booking_id)
        setBookingStatus(booking_status)
        var title = `Tip Amount to ${chef_name} | CHEF REPUBLIC`;
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
                        width: isMobile ? "100%" : "400px", height: isMobile ? "100%" : "563px", borderRadius: "20px",
                        boxShadow: isMobile ? "" : "0,0,0,grba(0,0,0,0.2)",
                    }}>
                        <div className="card-header border-0 bg-transparent">
                            {isMobile ? <div className="py-3 row d-flex align-items-center" key={"1"} style={{ width: "100%", height: "auto" }}>
                                <div className="col-4">
                                    <img src={chefProfileImage ? chefProfileImage : profile} alt="" style={{ borderRadius: "50%", height: "65px", width: "65px" }} />
                                </div>
                                <div className="col-7" style={{ paddingLeft: "0" }}>
                                    <h6 className="fw-bold">{chefName}</h6>
                                    <span
                                        className="badge text-wrap"
                                        style={{
                                            borderRadius: "20px",
                                            marginleft: "10px",
                                            color: "white",
                                            backgroundColor: localStorage.getItem(bookingStatus),
                                        }}
                                    >
                                        {bookingStatus}
                                    </span>
                                </div>
                                <div className="col-1" style={{ paddingLeft: "0" }}>
                                    <BiDotsVerticalRounded size={22} />
                                </div>
                            </div> : <div className="py-3 d-flex flex-column" key={"1"} style={{ width: isMobile ? "100%" : "99%", height: "auto", borderRadius: "10px", boxShadow: "0,0,0,grba(0,0,0,0.2)", }}>
                                <div className="d-flex justify-content-center">
                                    <img src={chefProfileImage ? chefProfileImage : profile} alt="" style={{ borderRadius: "50%", height: "80px", width: "80px" }} />
                                </div>
                                <div className="text-center mt-3" style={{ paddingLeft: "0" }}>
                                    <h6 className="fw-bold">{chefName}</h6>
                                </div>
                            </div>}
                        </div>
                        <div className="card-body" style={{ height: isMobile ? "60vh" : "380px", overflowY: "scroll" }}>
                            <div className="text-center py-4" style={{ paddingLeft: "0" }}>
                                <h5 className="fw-bold">Add a Tip</h5>
                            </div>
                            <div className="d-flex justify-content-center">
                                <input
                                    className="p-2 text-center form-control shadow-none"
                                    type="text"
                                    id="amount"
                                    placeholder="Enter $ Amount"
                                    style={{
                                        backgroundColor: "rgba(128, 128, 128,0.4)",
                                        outline: "none",
                                        width: "auto",
                                    }}
                                />
                            </div>
                            <div className="d-flex justify-content-center mt-2">
                                <div onClick={() => {
                                    $("#amount").val("20.00")
                                }} style={{
                                    width: "76px",
                                    margin: "10px 5px",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "42px",
                                    background: "#FFFFFF",
                                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                                    borderRadius: "20px"
                                }}>😀 $20</div>
                                <div onClick={() => {
                                    $("#amount").val("25.00")
                                }} style={{
                                    width: "76px",
                                    margin: "10px 5px",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "42px",
                                    background: "#FFFFFF",
                                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                                    borderRadius: "20px"
                                }}>😄 $25</div>
                                <div onClick={() => {
                                    $("#amount").val("30.00")
                                }} style={{
                                    width: "76px",
                                    margin: "10px 5px",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "42px",
                                    background: "#FFFFFF",
                                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                                    borderRadius: "20px"
                                }}>😍 $30</div>
                                <div onClick={() => {
                                    $("#amount").val("35.00")
                                }} style={{
                                    width: "76px",
                                    margin: "10px 5px",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "42px",
                                    background: "#FFFFFF",
                                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                                    borderRadius: "20px"
                                }}>🤩 $35</div>
                            </div >
                        </div >
                        <p style={{ color: "red", fontSize: "0.8rem" }} className="validation text-center">{""}</p>
                        <div className="card-footer border-0 bg-white d-flex justify-content-center">
                            <button
                                className="btn btn-orange rounded-pill mb-1"
                                style={{ width: "90%" }}
                                onClick={sendTip} disabled={isSubmitting}>{isSubmitting ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                ) : (
                                    ""
                                )}{" "}
                                Send Tip
                            </button>
                        </div >
                        <div className="card-footer border-0 bg-white d-flex justify-content-center">
                            <button
                                className="rounded-pill bg-transparent border-0 mb-3 "
                                style={{ width: "90%", color: "grey" }}
                                onClick={skipTip} disabled={isSubmitting1}>{isSubmitting1 ? (
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

export default MessageView;
