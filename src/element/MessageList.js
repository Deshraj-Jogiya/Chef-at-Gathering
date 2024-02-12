import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedNav from "../components/LoggedNav";
import MessageItem from "../components/MessageItem";
import { isMobile } from "react-device-detect";
import Spinner from "./BePatient";
import { RiArrowLeftSLine } from 'react-icons/ri';


function MessageList(props) {
  const [data, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const updateCustomer = async () => {
    setLoading(true);
    let response = await fetch(
      localStorage.getItem("role") === "1" ? `${process.env.REACT_APP_BASE_URL}chat/users_chef_booking_list_for_chat` : `${process.env.REACT_APP_BASE_URL}chat/chef_booking_list_for_chat`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    let parsedData = await response.json();
    setCustomer(parsedData.data);
    setLoading(false);
  };
  const getStatusList = async () => {
    let data = await fetch(
      `${process.env.REACT_APP_BASE_URL}status/all_status`
    );
    let parsedData = await data.json();
    for (let index = 0; index < parsedData.data.length; index++) {
      const element = parsedData.data[index];
      localStorage.setItem(element.name, element.color)
    }
  };
  useEffect(() => {
    var title = props.customer? "Messages | CHEF REPUBLIC" : "Messages | CHEF | CHEF REPUBLIC"
    var desc =  props.customer? "This chat shows all the chef who booked and approved by the chef and the chef has exchanged messages with customer. This helps keep track of what was discussed between the chef and customer." : "This chat shows all the customers whose orders were approved and the chef has exchanged messages with them. This helps keep track of what was discussed between the chef and customer."
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
    updateCustomer()
    getStatusList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    loading ? <Spinner /> : <>
      <LoggedNav customer={props.customer} />
      <div className="container my-4">
        {isMobile ? null : <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active d-flex justify-content-center" style={{ cursor: "pointer" }} aria-current="page" onClick={() => { navigate(-1) }}>
              <span className="pe-2 h4">
                <RiArrowLeftSLine />
              </span>
              Go Back
            </li>
          </ol>
        </nav>}
        <div className="container d-flex justify-content-center align-items-center">
          <div className={isMobile ? "" : "card pb-3"} style={{
            width: isMobile?"100%" :"400px", minHeight: isMobile? "" :"563px", borderRadius: isMobile?"": "20px",
            boxShadow: isMobile ? "" : "0,0,0,grba(0,0,0,0.2)",
          }}>
            <div className="card-header border-0 bg-transparent">
              <h4 className="mx-auto my-4 fs-2 fw-bold" style={{ textAlign: "center" }}>Messages</h4>
            </div>
            <div className="card-body">
              {data ? data.map((content, index) => {
                return <MessageItem key={index} content={content} />
              }) : <h6 className="text-center py-3 fs-6">You have No Orders yet. Stay Tuned</h6>}
            </div >
          </div >
        </div >
      </div>
    </>
  );
}

export default MessageList;
