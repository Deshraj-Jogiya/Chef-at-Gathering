import React, { useEffect, useState } from "react";
import FaqItem from "./FaqItem";
function Faq() {
  const [faqs, setFaqs] = useState([])

  const updateFaqs = async () => {
    let data = await fetch(`${process.env.REACT_APP_BASE_URL}general/faqs`);
    let parsedData = await data.json()
    setFaqs(parsedData.data)
  }
  useEffect(() => {
    updateFaqs();
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <div className="container py-4 my-4" id="faq">
        <h4 className="text-center my-2 py-2">FAQ's</h4>
        <div className="list-group my-2" id="faq-list">
          {
            faqs.map((element, index) => {
              return <FaqItem key={index} index={index} element={element} />
            })
          }

        </div>
      </div>
    </>
  );
}

export default Faq;
