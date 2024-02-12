import React from "react";
import { useNavigate } from "react-router-dom";
function DietOfferItem(props) {
  const navigate = useNavigate();
  return (
    <div className="col-6 col-sm-6 p-2" style={{ cursor: "pointer" }}>
      <a onClick={() => {
        localStorage.setItem("food_categories", props.data.id + "-" + props.data.category_name)
        navigate("/chef-list")
      }} >
        <div
          className={"diet-card card-" + props.data.id.toString()}
          style={{
            backgroundImage: `url(${props.data.category_image})`,
            cursor: "pointer"
          }}
        >
          {props.data.category_name}
        </div>
      </a>
    </div >
  );
}

export default DietOfferItem;
