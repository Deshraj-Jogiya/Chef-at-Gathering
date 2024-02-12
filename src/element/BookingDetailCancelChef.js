import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoggedNav from "../components/LoggedNav";
import { isMobile } from "react-device-detect";
import { RiArrowLeftSLine } from 'react-icons/ri';
import profile from '../images/Vector.jpg'

function ReviewToChef(props) {
    const [chefName, setChefName] = useState("");
    const [chefProfileImage, setChefProfileImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingId, setBookingId] = useState(false);
    const [bookingStatus, setBookingStatus] = useState("");

    const navigate = useNavigate();

    const cancelBooking = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        let data = await fetch(
            `${process.env.REACT_APP_BASE_URL}status/update_status_by_chef`,
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    booking_id: bookingId.toString(),
                    status: "3"
                }),
            }
        );
        let parsedData = await data.json();
        if (parsedData.status === true) {
            setIsSubmitting(false);
            if (localStorage.getItem("from_msg")) {
                navigate("/chef/message-list")
            } else{
                navigate("/chef/order-list")
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
        const { chef_name, chef_profile_image, bookingId,  booking_status } = state;
        if (!chef_name || chef_name === null ||  chef_profile_image === null || bookingId === null || !bookingId  || booking_status === null || !booking_status) {
            navigate(-1);
        }
        setChefName(chef_name)
        setChefProfileImage(chef_profile_image)
        setBookingId(bookingId)
        setBookingStatus(booking_status)
        var title = "Cancel Booking | CHEF | CHEF REPUBLIC"
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
                            <div className="py-3 d-flex flex-column" key={"1"} style={{ width: isMobile ? "100%" : "99%", height: "auto", borderRadius: "10px", boxShadow: "0,0,0,grba(0,0,0,0.2)", }}>
                                <div className="d-flex justify-content-center">
                                    <img src={chefProfileImage? chefProfileImage: profile} alt="" style={{ borderRadius: "50%", height: "80px", width: "80px" }} />
                                </div>
                                <div className="text-center mt-3" style={{ paddingLeft: "0" }}>
                                    <h6 className="fw-bold">{chefName}</h6>
                                </div>
                                <div className="text-center mt-1" style={{ paddingLeft: "0" }}>
                                    <span
                                        className="badge"
                                        style={{
                                            borderRadius: "20px",
                                            marginleft: "10px",
                                            backgroundColor: localStorage.getItem(bookingStatus),
                                            color: "white",
                                        }}
                                    >
                                        {bookingStatus}
                                    </span>
                                </div>
                                <div className="text-center mt-2" style={{ paddingLeft: "0" }}>
                                    <h5 className="fw-bold">Are you sure you want to cancel booking?</h5>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer border-0 bg-white d-flex flex-column align-items-center justify-content-center">
                            <button
                                className="btn-white mb-3 "
                                style={{ width: "90%" }}
                                onClick={cancelBooking} disabled={isSubmitting}>{isSubmitting ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                ) : (
                                    ""
                                )}{" "}
                                Yes, Cancel
                            </button>
                            <button
                                className="btn-orange mb-3 "
                                style={{ width: "90%" }}
                                onClick={() => { navigate(-1) }}>
                                No, Don’t Cancel
                            </button>
                        </div >
                    </div >
                </div >
            </div>
        </>
    );
}

export default ReviewToChef;
