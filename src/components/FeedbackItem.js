import React from "react";
import { Rating } from 'react-simple-star-rating'

function FaqItem(props) {
  return (
    <div className="item d-flex justify-content-center align-items-center p-3 m-3 flex-column">
      <Rating
        allowFraction={true}
        initialValue={props.element.rating}
        size={22}
        allowHover={false}
        readonly={true}
      />
      <h6 className='text-center'>{props.element.description}</h6>
      <div className="feedback-owner">
        <img src={props.element.image} style={{ borderRadius: "50%", height: "50px", width: "50px" }} alt="" />
        <h6>{props.element.name}</h6>
      </div>
    </div>
  );
}

export default FaqItem;
