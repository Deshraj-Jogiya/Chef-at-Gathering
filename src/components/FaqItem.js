import React from "react";
import arrow from "../images/icons/arrow.png";
function FaqItem(props) {
  return (
    <>
      <a
        data-bs-toggle="collapse"
        href={"#collapseExample_" + props.element.id.toString()}
        role="button"
        aria-expanded="false"
        aria-controls={"collapseExample_" + props.element.id.toString()}
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        aria-current="true"
      >
        <h6 className="fw-bolder">
          {props.index + 1}. {props.element.question}
        </h6>
        <img
          src={arrow}
          style={{ width: "8px", height: "12px" }}
          alt="arrow"
        />
      </a>
      <div className="collapse" id={"collapseExample_" + props.element.id.toString()}>
        <div className="card card-body" style={{ border: "none" }}>
          {props.element.answer}
        </div>
      </div>
    </>
  );
}

export default FaqItem;
