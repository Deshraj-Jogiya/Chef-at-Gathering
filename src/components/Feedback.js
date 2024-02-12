import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { isMobile } from 'react-device-detect';
import React, { useEffect, useState } from "react";
import FeedbackItem from '../components/FeedbackItem'

function Feedback() {
  const [testimonial, setTestimonial] = useState([])
  const [loader, setLoader] = useState(true)

  const updateTestimonial = async () => {
    setLoader(true)
    let data = await fetch(`${process.env.REACT_APP_BASE_URL}general/get_all_testimonials`);
    let parsedData = await data.json()
    setTestimonial(parsedData.data)
    setLoader(false)
  }
  useEffect(() => {
    updateTestimonial();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div id="feedback">
        <h3 className='text-center my-2 mt-5' >What people say <br /> about us</h3>
        <div className="feedback container">
          {loader ? <div className="d-flex justify-content-center py-5"> <span className="text-center spinner-border text-success spinner-border"></span></div> :
            <OwlCarousel rewind={true} items={isMobile ? 1 : 3} mouseDrag={true} touchDrag={true} autoplay={true} autoplayHoverPause={true} dotsEach={true} className="owl-theme my-4">
              {testimonial.map((element, index) => {
                return <FeedbackItem key={index} element={element} />
              })}
            </OwlCarousel>
          }
        </div>
      </div>
    </>
  )
}


export default Feedback
