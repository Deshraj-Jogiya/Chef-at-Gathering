import React, { useState, useEffect } from "react";
import Spinner from "./BePatient";
import { useNavigate } from "react-router-dom";
import LoggedNav from "../components/LoggedNav";
import ContactUsPop from "../components/ContactUsPop";
import OrderItemChef from "../components/OrderItemChef";

function OrderListChef(props) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const updateOrders = async () => {
    let data = await fetch(
      `${process.env.REACT_APP_BASE_URL}book/chef_booking_history`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    let parsedData = await data.json();
    setOrders(parsedData.data);
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
    var title = `Order History | CHEF | CHEF REPUBLIC`;
    var desc = "Review Orders you have Meal Prepped for customers of Chef Republic"
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

    if (role === null || role !== "2") {
      navigate("/chef/sign-in");
      window.location.reload();
    }
    if (token === null || !token) {
      navigate("/chef/sign-in");
      window.location.reload();
    }
    localStorage.removeItem("from_msg")
    getStatusList()
    updateOrders();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <LoggedNav customer={props.customer} main={true} />
          <div className="container my-5">
            <h1 className="fw-bold text-center fs-2 my-4">Orders</h1>
            <div className="row">
              {orders ? orders.map((content, index) => {
                return <OrderItemChef key={index} content={content} />;
              }) : <h4 className="py-3 text-center fs-6">You have No Orders yet. Stay Tuned</h4>}
            </div>
          </div>
          <ContactUsPop />
        </>
      )}
    </>
  );
}

export default OrderListChef;
