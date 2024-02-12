import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CardToolTips(props) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const removeCard = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    let data = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/remove_user_card_details`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    let parsedData = await data.json();
    if (parsedData.status === true) {
      localStorage.setItem("card_added", 0)
      setIsSubmitting(false);
      navigate("/add-new-card")
    }
    else {
      navigate(-1)
    }
  }
  return (
    <>
      <div className="text-center d-flex flex-column align-items-center justify-content-evenly" style={{
        position: "absolute",
        marginLeft: props.width - 185 + "px",
        marginTop: "25px",
        width: "auto",
        padding: "10px",
        background: "#FFFFFF",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
        zIndex: 999
      }}>
        <a onClick={isSubmitting ? null : removeCard} style={{ textDecoration: "none", color: "#000", cursor: "pointer" }}>{isSubmitting ? <span className="spinner-border spinner-border-sm"></span> : ""} Remove Card</a>
      </div>
    </>
  );
}

export default CardToolTips;
