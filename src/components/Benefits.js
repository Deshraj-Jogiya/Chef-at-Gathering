import React from "react";
import { isMobile } from 'react-device-detect';

function Benefits() {
  return (
    <div className="benefits row m-0 p-0" id="Benefits">
      <div id="title-mobile">Benefits for you</div>
      <div className="col-md-6 p-3">
        <div style={{ textAlign: isMobile ? "center" : "right", paddingRight: isMobile ? "0px" : "60px" }}>
          <h3 id="benefitsPercentage" style={isMobile ? {} : { textAlign: "right" }}>70%</h3>
          <h3>
            of your weight loss is <br />
            attributed to your diet
          </h3>
        </div>
      </div>
      <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
        <h6 id="title-desktop">Benefits for you</h6>
        <h6
          className="lh-base"
          id="benefits-desc"
        >
          With Private Chef prepping meals for you and your family according to your dietary needs, you can now focus on your Self Care and Well Care. You no longer have to spend exorbitant amount on Food Delivery Services or rely on meal kits prepped in bulk, with preservatives
        </h6>
      </div>
    </div >
  );
}

export default Benefits;
