import React, { useEffect, useState } from "react";
import LoggedNav from "../components/LoggedNav";
import Footer from "../components/Footer";
import Nav from "../components/Nav";


function PaymentDetail(props) {
  const [terms, setTerms] = useState([])
  const [loader, setLoader] = useState(true)
  const [nav, setNav] = useState(<Nav customer={props.customer} />)

  const updateTerms = async () => {
    setLoader(true)
    let data = await fetch(`${process.env.REACT_APP_BASE_URL}general/appsettings`);
    let parsedData = await data.json()
    let data_dict = parsedData.data.filter(item => item.item_slug === "terms")[0].item_desc
    setTerms(data_dict)
    setLoader(false)
  }
  useEffect(() => {
    var title = props.customer? "Terms & Conditions | CHEF REPUBLIC" : "Terms & Conditions | CHEF | CHEF REPUBLIC"
    var desc = ""
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

    if (localStorage.getItem("token")) {
      setNav(<LoggedNav customer={props.customer} />)
    }
    updateTerms();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {nav}
      <h3 className="text-center py-5" style={{ fontWeight: 700 }}>Chef Republic Terms and Conditions</h3>
      <div className="container pb-5" id="terms-condition" >
        {loader ? <div className="d-flex justify-content-center py-5"> <span className="text-center spinner-border text-success spinner-border"></span></div> : <div dangerouslySetInnerHTML={{ __html: terms }} />}
      </div>
      <Footer top={1} />
    </>
  );
}

export default PaymentDetail;
