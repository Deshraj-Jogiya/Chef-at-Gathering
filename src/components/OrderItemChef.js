import React, { useEffect, useState } from "react";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoMdStopwatch } from "react-icons/io";
import { RiRestaurantLine } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import chatIcon from "../images/icons/chat.png"
import { useNavigate } from "react-router-dom";
import profile from '../images/Vector.jpg'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  ChakraProvider
} from '@chakra-ui/react'

function OrderItemChef(props) {
  const [showpopup, setPopUp] = useState(false)
  function titleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }
  const navigate = useNavigate();
  const showTips = () => {
    if (showpopup) {
      setPopUp(false)
    } else {
      setPopUp(true)
    }
  }
  const hideTips = () => {
    setPopUp(false)
  }
  const navigateToChat = () => {
    hideTips();
    if (props.content.booking_status === "Requested" || props.content.booking_status === "Declined") {
      return false
    } else {
      navigate("/chef/message-view", { state: { data: { booked_chef_profile_image: props.content.booking_by_user_profile_image, booked_chef: props.content.booking_by_username, booking_status: props.content.booking_status, booking_id: props.content.booking_id, booking_by_customer_id: props.content.booking_by_user_id, booking_order_id: props.content.booking_order_id} } })
    }    
  }
  return (
    <div className="col-md-4 col-sm-12">
      <div

        className="border row border-1 m-1 py-4"
        style={{
          borderRadius: "20px",
          boxShadow: "0,0,0,grba(0,0,0,0.2)",
        }}
      >
        <div className="col-2 d-flex flex-column">
          <div className="d-flex justify-content-center align-items-center my-2" style={{ width: "60px", height: "60px", borderRadius: "50%" }}>
            <img src={props.content.booking_by_user_profile_image ? props.content.booking_by_user_profile_image : profile} style={{ width: "60px", height: "60px", borderRadius: "50%" }} alt="" />
          </div>
          <div className="d-flex justify-content-center align-items-center my-2" style={{ width: "60px", height: "60px", borderRadius: "50%", border: "1px solid #FF5E41", cursor: "pointer" }} onClick={navigateToChat}>
            <img src={chatIcon} alt="" />
          </div>
        </div>
        <div className="col-10 ">
          <div className="card-body">
            <div className="d-flex justify-content-between m-2">
              <div className="col-10" style={{ padding: "5px" }}>
                <h6 className="fw-bold">{titleCase(props.content.booking_by_username)}</h6>
              </div>
              <ChakraProvider>
                <Popover placement="left-start" p={0} isLazy boxShadow={"xs"}>
                  <PopoverTrigger>
                    <div className="col-1"><BiDotsVerticalRounded /></div>
                  </PopoverTrigger>
                  <PopoverContent p={0} m={0} w="100%" boxShadow="xs">
                    <PopoverBody>
                      <>
                        {(props.content.booking_status === "Requested" && localStorage.getItem("role") === "2") || props.content.booking_status === "Meal Prep Complete" || props.content.booking_status === "" || props.content.booking_status === "Declined" || props.content.booking_status === "Canceled" ? null : <><a className="py-1" onClick={() => {
                          localStorage.setItem("from_msg", 1)
                          navigate(
                            "/chef/order/cancel",
                            {
                              state: {
                                bookingId: props.content.booking_id,
                                chef_name: props.content.booking_by_username,
                                chef_profile_image: props.content.booking_by_user_profile_image,
                                booking_status: props.content.booking_status
                              },
                            }
                          )
                        }} style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontSize: "13px" }}>Cancel Booking</a> <br /> </>}
                        <a className="py-1" target={"_blank"} href={"mailto:support@chefrepublic.us?&subject=Report%20for%20Booking%20ID%20-%20" + (props.content.booking_order_id)} style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontSize: "13px" }}>Report Chat</a>
                      </>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </ChakraProvider>
            </div>
            <div className="row m-2">

              <div className="">
                <span
                  className="badge text-wrap"
                  style={{
                    borderRadius: "20px",
                    marginleft: "10px",
                    color: "white",
                    backgroundColor: localStorage.getItem(props.content.booking_status),
                  }}
                >
                  {props.content.booking_status}
                </span>
              </div>
            </div>
            <div className="m-2" style={{ color: "#000" }}>
              <div className="row my-2">
                <div className="col-12"><p className="p-0 m-0">ORDER ID: {(props.content.booking_order_id)}</p></div>
              </div>
              <div className="row my-2">
                <div className="col-1"><p className="p-0 m-1"><SlLocationPin /></p></div>
                <div className="col-10 text-break"><p className="p-0 m-0"> {(props.content.booking_address).replaceAll(",", ", ")}</p></div>
              </div>
              <div className="row my-2">
                <div className="col-1"><p className="p-0 m-1"><AiOutlineCalendar /></p></div>
                <div className="col-10"><p className="p-0 m-0"> {props.content.booking_date}</p></div>
              </div>
              <div className="row my-2">
                <div className="col-1"><p className="p-0 m-1"><IoMdStopwatch /></p></div>
                <div className="col-10"><p className="p-0 m-0"> {props.content.booking_time}</p></div>
              </div>
              <div className="row my-2">
                <div className="col-1"><p className="p-0 m-1"><RiRestaurantLine /></p></div>
                <div className="col-10"><p className="p-0 m-0"> {props.content.booking_category}</p></div>
              </div>
            </div>

          </div>
        </div>
        <div className="text-center pt-3 pb-0">
          <a onClick={() => {
            navigate(
              "/chef/order-detail",
              {
                state: { bookingId: props.content.booking_id },
              }
            );
          }} style={{ color: "#FF5E41", fontWeight: "600", textDecoration: "none", cursor: "pointer" }}>
            View Details
          </a>
        </div>
      </div>
    </div >
  );
}

export default OrderItemChef;
