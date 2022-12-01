import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Vector from "../images/Vector.jpg";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  ChakraProvider
} from '@chakra-ui/react'

function MessageList(props) {
  const [showpopup, setPopUp] = useState(false)
  const navigate = useNavigate();
  const redirectToProfile = () => {
    localStorage.setItem("chef_id", props.content.booked_chef_id)
    navigate("/browse-chef")
  }
  const redirectToReview = () => {
    localStorage.setItem("from_msg", 1)
    navigate("/rate-chef", { state: { chef_name: props.content.booked_chef, chef_profile_image: props.content.booked_chef_profile_image, chef_id: props.content.booked_chef_id, booking_status: props.content.booking_status, booking_id: props.content.booking_id, } })
  }
  const redirectToTips = () => {
    localStorage.setItem("from_msg", 1)
    navigate("/tip-amount", { state: { chef_name: props.content.booked_chef, chef_profile_image: props.content.booked_chef_profile_image, booking_id: props.content.booking_id, booking_status: props.content.booking_status } })
  }
  useEffect(() => {
    document.title = `Message - Chef Republic`;
    localStorage.removeItem("from_msg")
  }, []);

  const navigateToChat = () => {
    navigate(localStorage.getItem("role") === "1" ? "/message-view" : "/chef/message-view", { state: { data: props.content }, })
  }

  return (

    <div  className="d-flex justify-content-evenly py-3" style={{ width: "100%", height: "auto", borderRadius: "10px", boxShadow: "0,0,0,grba(0,0,0,0.2)", }}>
      <div className="col-3" onClick={navigateToChat}>
        <img src={props.content.booked_chef_profile_image ? props.content.booked_chef_profile_image : (props.content.booking_by_user_profile_image ? props.content.booking_by_user_profile_image: Vector)} alt="" style={{ height: "60px", width: "60px", borderRadius: "50%" }} /> 
      </div>
      <div className="col-8 d-flex flex-column justify-content-center" style={{ paddingLeft: "0" }} onClick={navigateToChat}>
        <div className="flex-column">
          <h6 className="fw-bold p-0 m-0">{props.content.booked_chef || props.content.booking_by_username}</h6>
          <span style={{ fontSize: "0.7rem", background: localStorage.getItem(props.content.booking_status), color: "white", borderRadius: "20px", padding: "3px 15px", fontWeight: 700 }}>{props.content.booking_status}</span>
        </div>
        {/* <p className="p-0 m-0 pt-1 text-wrap" style={{ fontSize: "0.8rem" }}>{props.content.booking_message_for_chat}</p> */}
        <p className="p-0 m-0 pt-1 text-wrap" style={{ fontSize: "0.8rem" }}>{props.content.booking_time}</p>
      </div>
      <ChakraProvider>
        <Popover placement="left-end" p={0} m={"auto"} isLazy boxShadow={"xs"}>
          <PopoverTrigger>
            <div className="col-1"><BiDotsVerticalRounded /></div>
          </PopoverTrigger>
          <PopoverContent p={0} m={0} w="100%" boxShadow="xs">
            <PopoverBody >
              <>
                {(props.content.booking_status === "Requested" && localStorage.getItem("role") === "2") ||props.content.booking_status === "Meal Prep Complete" || props.content.booking_status === "" || props.content.booking_status === "Declined" || props.content.booking_status === "Canceled" ? null : <><a className="py-1" onClick={() => {
                  localStorage.setItem("from_msg", 1)
                  localStorage.getItem("role") === "1" ?
                    navigate("/booking-detail/cancel", { state: { chef_name: props.content.booked_chef, chef_profile_image: props.content.booked_chef_profile_image, chef_id: props.content.booked_chef_id, bookingId: props.content.booking_id, booking_status: props.content.booking_status } }) :
                    navigate(
                      "/chef/order/cancel",
                      {
                        state: {
                          bookingId: props.content.booking_id,
                          chef_name:  props.content.booking_by_username,
                          chef_profile_image: props.content.booking_by_user_profile_image,
                          booking_status: props.content.booking_status
                        },
                      }
                    )
                }} style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontSize: "13px" }}>Cancel Booking</a> <br /> </>}
                {
                  localStorage.getItem("role") === "1" ?
                    <>
                      <a onClick={redirectToProfile} className="py-1" style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontSize: "13px" }}>View Profile</a><br />
                      {props.content.booking_status == "Meal Prep Complete" && props.content.review_given == "0" ? <><a onClick={redirectToReview} className="py-1" style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontSize: "13px" }}>Write a Review</a><br /></> : null}
                      {props.content.booking_status == "Meal Prep Complete" && props.content.tips_given == "0" ? <><a onClick={redirectToTips} className="py-1" style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontSize: "13px" }}>Add Tip</a><br /></> : null}
                    </> : null}
                <a className="py-1" target={"_blank"} href={"mailto:support@chefrepublic.us?&subject=Report%20for%20Booking%20ID%20-%20" + (props.content.booking_order_id).toString()} style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontSize: "13px" }}>Report Chat</a>
              </>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </ChakraProvider>
    </div>

  );
}

export default MessageList;