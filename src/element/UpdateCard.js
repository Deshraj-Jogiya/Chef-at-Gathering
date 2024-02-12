import React, { useState, useEffect } from "react";
import LoggedNav from "../components/LoggedNav";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftSLine } from 'react-icons/ri';
import Spinner from "./BePatient";
import UpdateCardItems from "./UpdateCardItems";

function UpdateCard(props) {
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const updateCards = async () => {
    setLoading(true);
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/get_user_card_list`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const res_json = await response.text();
    const data = JSON.parse(res_json);
    if (data.status === true) {
      setCustomer(data)
    }
    else {
      setLoading(false);
    }
    setLoading(false);
  };
  let role = localStorage.getItem("role");
  useEffect(() => {
    var title = `Card List | CHEF REPUBLIC`;
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

    if (role === null || role !== "1") {
      navigate("/chef/sign-in");
      window.location.reload();
    }
    updateCards();
    // eslint-disable-next-line
  }, []);
  return (
    loading ? <Spinner /> : <>
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
        <div className={"container d-flex justify-content-center align-items-center" + (isMobile ? " border-0 p-0 m-0" : "")} style={{ width: isMobile ? "100%" : "388px", }}>
          <div className={"card pb-3" + (isMobile ? " border-0 p-0 m-0" : "")} style={{
            width: isMobile ? "100%" : "388px", minHeight: "563px", borderRadius: "20px",
            boxShadow: "0,0,0,grba(0,0,0,0.2)",
          }}>
            <div className="card-header border-0 bg-transparent">
              <h4 className="mx-auto my-4" style={{ textAlign: "center" }}>Update Credit Card</h4>
            </div>
            <div className="card-body">
              {customer.status && customer.data ? customer.data.map((item, index) => {
                return <UpdateCardItems item={item} key={index} />
              }) : <p className='text-center'>No Card Added</p>}
            </div >
            <div className="card-footer border-0 bg-transparent d-flex justify-content-center">
              <button className="btn btn-orange w-100" type="button" onClick={() => { navigate("/add-new-card") }}>Add New Card</button>
            </div >
          </div >
        </div >
      </div>
    </>
  );
}

export default UpdateCard;
