import React from "react";
import { useNavigate } from "react-router-dom";

function OrderItemCustomer(props) {
  const navigate = useNavigate();
  return (
    <div className="col-md-4 col-sm-12">
      <div
        className="border row border-1 m-1"
        style={{
          borderRadius: "20px",
          boxShadow: "0,0,0,grba(0,0,0,0.2)",
        }}
      >
        <div className="col-2 mt-4">
          <img src={props.data.booked_chef_profile_image} style={{ width: "50px", height: "50px", borderRadius: "50%" }} alt="" />
        </div>
        <div className="col-10 my-3 ps-3 ">
          <div className="card-body">
            <p className="p-0 m-0">{props.data.booked_chef}</p>
            <span
              className="badge my-1"
              style={{
                borderRadius: "20px",
                backgroundColor: localStorage.getItem(props.data.booking_status),
                color: "white",
              }}
            >
              {props.data.booking_status}
            </span>
            <p className="p-0 m-0 my-1" style={{ color: "gray", fontSize: "0.8rem" }}>
              ORDER ID: {props.data.booking_order_id}
            </p>
            <p className="p-0 m-0 my-1" style={{ color: "gray", fontSize: "0.8rem" }}>
              {props.data.booked_on}
            </p>
            <button className="p-0" style={{ color: "rgb(255, 115, 0)", fontWeight: "700", backgroundColor: "transparent", border: "transparent", fontSize: "0.9rem" }} onClick={() => {
              localStorage.setItem("booking_id", props.data.booking_id);
              localStorage.setItem("chef_id", props.data.booked_chef_id);
              navigate("/order-detail")
            }}>
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItemCustomer;
