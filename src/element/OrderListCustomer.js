import React, { useState, useEffect } from "react";
import Spinner from "./BePatient";
import LoggedNav from "../components/LoggedNav";
import { useNavigate } from "react-router-dom";
import ContactUsPop from "../components/ContactUsPop";
import OrderItemCustomer from "../components/OrderItemCustomer";

function OrderListCustomer(props) {
  const [data, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const updateCustomer = async () => {
    setLoading(true);
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}book/customer_booking_history`,
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
  let role = localStorage.getItem("role");
  let token = localStorage.getItem("token");
  useEffect(() => {
    var title = `Order History | CHEF REPUBLIC`;
    var desc = ""
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

    if (role === null || role !== "1") {
      navigate("/sign-in");
      window.location.reload();
    }
    if (token === null || !token) {
      navigate("/sign-in");
      window.location.reload();
    }
    getStatusList()
    updateCustomer();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <LoggedNav customer={props.customer} />
          <div className="container my-5">
            <h1 className="fw-bold text-center">Order History</h1>
            <div className="row py-4">
              {data ? data.map((content, index) => {
                return <OrderItemCustomer key={index} data={content} />;
              }) : <h4 className="py-3 text-center fs-6">You have No Orders yet</h4>}
            </div>
          </div>
          <ContactUsPop />
        </>
      )}
    </>
  );
}

export default OrderListCustomer;
