import React, { useRef, useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import CardToolTips from '../components/CardToolTips'

function UpdateCardItems(props) {
  const [showpopup, setPopUp] = useState(false)
  const [width, setwidth] = useState(0)
  const ref = useRef(null);

  const cardHide = (card) => {
    let hideNum = [];
    for (let i = 0; i < card.length; i++) {
      if (i < card.length - 14) {
        hideNum.push(card[i]);
      }
      else if (i === 9) {
        hideNum.push(" ");
      }
      else if (i < card.length - 5) {
        hideNum.push("*");
      } else {
        hideNum.push(card[i]);
      }
    }
    return hideNum.join("");
  }

  useEffect(() => {
    document.title = `Message - Chef Republic`;
    setwidth(ref.current.offsetWidth)
  }, [ref.current]);

  const showTips = () => {
    setPopUp(true)
  }

  const hideTips = () => {
    setPopUp(false)
  }
  return (
    <div ref={ref} className="card border-0 mx-auto my-1" style={{ width: "90%", height: "auto", borderRadius: "10px", boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)", }} >
      {showpopup ? <CardToolTips width={width} /> : null}
      <h6 className="position-relative" style={{ margin: "10px" }} > {props.item.card_name} <span className="position-absolute top- 0 end-0" style={{ cursor: "pointer" }} onClick={showTips}><BiDotsVerticalRounded /></span></h6>
      <div className="card-footer border-0 bg-transparent mt-2" onClick={() => { hideTips(); }}>
        <p className="position-relative">{cardHide(props.item.card_number)} <span className="position-absolute top-0 end-0">{props.item.exp_month}/{props.item.exp_year}</span></p>
      </div>
    </div>

  );
}

export default UpdateCardItems;
