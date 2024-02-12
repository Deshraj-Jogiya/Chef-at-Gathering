import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import profile from "../images/Vector.jpg";

import MessageInput from "../components/MessageInput/index";
import LoggedNav from "../components/LoggedNav";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { isMobile } from "react-device-detect";
import { RiArrowLeftSLine } from 'react-icons/ri';
import { MessageList } from '../components/MessageList/index';

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    ChakraProvider
} from '@chakra-ui/react'

function MessageView(props) {
    const [content, setContent] = useState({});
    const navigate = useNavigate();
    const { state } = useLocation();
    const redirectToProfile = () => {
        localStorage.setItem("chef_id", content.booked_chef_id)
        navigate("/browse-chef")
    }
    const redirectToReview = () => {
        localStorage.setItem("from_msg", 1)
        navigate("/rate-chef", { state: { chef_name: content.booked_chef, chef_profile_image: content.booked_chef_profile_image, chef_id: content.booked_chef_id, booking_status: content.booking_status, booking_id: content.booking_id, } })
    }
    const redirectToTips = () => {
        localStorage.setItem("from_msg", 1)
        navigate("/tip-amount", { state: { chef_name: content.booked_chef, chef_profile_image: content.booked_chef_profile_image, booking_id: content.booking_id, booking_status: content.booking_status } })
    }

    useEffect(() => {
        var title = props.customer? "Message View | CHEF REPUBLIC" : "Message View | CHEF | CHEF REPUBLIC"
        var desc = "You can have one on one chat between customer and client which includes details of the order and any additional requests and instructions"
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

        if (!state || state === null) {
            navigate("/chef-list");
        }
        const { data } = state;
        if (!data || data === null) {
            navigate("/chef-list");
        }
        setContent(data)
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <LoggedNav customer={props.customer} />
            <div className="container my-4">
                {isMobile ? null : <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active d-flex justify-content-center" style={{ cursor: "pointer" }} aria-current="page" onClick={() => { navigate(props.customer ? "/message-list" : "/chef/message-list") }}>
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
                            <div className="d-flex justify-content-evenly mx-auto py-3" key={"1"} style={{ width: isMobile ? "100%" : "99%", height: "auto", borderRadius: "10px", boxShadow: "0,0,0,grba(0,0,0,0.2)", }}>
                                <div className="col-3">
                                    <img src={content.booked_chef_profile_image ? content.booked_chef_profile_image : (content.booking_by_user_profile_image ? content.booking_by_user_profile_image : profile)} alt="" style={{ height: "60px", width: "60px", borderRadius: "50%" }} />
                                </div>
                                <div className="col-8 d-flex flex-column justify-content-center" style={{ paddingLeft: "0" }}>
                                    <div className="flex-column">
                                        <h6 className="fw-bold p-0 m-0">{content.booked_chef || content.booking_by_username}</h6>
                                        <span style={{ fontSize: "0.7rem", color: "white", background: localStorage.getItem(content.booking_status), borderRadius: "20px", padding: "3px 15px", fontWeight: 700 }}>{content.booking_status}</span>
                                    </div>
                                </div>
                                <ChakraProvider>
                                    <Popover placement="left-start" p={0} isLazy boxShadow={"xs"}>
                                        <PopoverTrigger>
                                            <div className="col-1"><BiDotsVerticalRounded /></div>
                                        </PopoverTrigger>
                                        <PopoverContent p={0} m={0} w="100%" boxShadow="xs">
                                            <PopoverBody>
                                                <>
                                                    {(content.booking_status === "Requested" && localStorage.getItem("role") === "2") || content.booking_status === "Meal Prep Complete" || content.booking_status === "" || content.booking_status === "Declined" || content.booking_status === "Canceled" ? null : <><a className="py-1" onClick={() => {
                                                        localStorage.setItem("from_msg", 1)
                                                        localStorage.getItem("role") === "1" ?
                                                            navigate("/booking-detail/cancel", { state: { chef_name: content.booked_chef, chef_profile_image: content.booked_chef_profile_image, chef_id: content.booked_chef_id, bookingId: content.booking_id, booking_status: content.booking_status } }) :
                                                            navigate(
                                                                "/chef/not-interested",
                                                                {
                                                                    state: { bookingId: content.booking_id },
                                                                }
                                                            )
                                                    }} style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontSize: "13px" }}>Cancel Booking</a> <br /> </>}
                                                    {
                                                        localStorage.getItem("role") === "1" ?
                                                            <>
                                                                <a onClick={redirectToProfile} className="py-1" style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontSize: "13px" }}>View Profile</a><br />
                                                                {content.booking_status === "Meal Prep Complete" && content.review_given === "0" ? <><a onClick={redirectToReview} className="py-1" style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontSize: "13px" }}>Write a Review</a><br /></> : null}
                                                                {content.booking_status === "Meal Prep Complete" && content.tips_given === "0" ? <><a onClick={redirectToTips} className="py-1" style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontSize: "13px" }}>Add Tip</a><br /></> : null}
                                                            </> : null}
                                                    <a className="py-1" target={"_blank"} href={"mailto:support@chefrepublic.us?&subject=Report%20for%20Booking%20ID%20-%20" + (content.booking_order_id)} style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontSize: "13px" }}>Report Chat</a>
                                                </>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </ChakraProvider>
                            </div>
                        </div>
                        <div className="card-body" style={{ height: isMobile ? "55vh" : "400px", overflowY: "scroll" }} >
                            <MessageList roomId={content.booking_order_id} customer={props.customer} />
                        </div >
                        <div className="card-footer border-0 bg-white" >
                            {content.booking_status === "" || content.booking_status === "Requested" || content.booking_status === "Declined" || content.booking_status === "Meal Prep Complete" || content.booking_status === "Canceled" ? <p className="text-center">You Are Not Allowed to Message</p> : <MessageInput userId={props.customer ? content.booked_chef_id : content.booking_by_customer_id} roomId={content.booking_order_id} customer={props.customer} first_msg={content.first_msg ? content.first_msg : ""} />}
                        </div >
                    </div >
                </div >
            </div>
        </>
    );
}

export default MessageView;
