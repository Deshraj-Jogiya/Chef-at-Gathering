import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import img_404 from "../images/404.webp";

function PageNotFound(props) {
  React.useEffect(() => {
    var title = "404 | CHEF REPUBLIC"
    var desc = ""
    const titleTag = document.querySelector('title');
    titleTag.innerText = title;
    const metaTitle = document.querySelector("meta[name='title']");
    metaTitle.setAttribute('content', title)
    const metaDescription = document.querySelector("meta[name='description']");
    metaDescription.setAttribute('content', desc)
    const metaTitleOG = document.querySelector("meta[property='og:title']");
    metaTitleOG.setAttribute('content', title)
    const metaDescriptionOG = document.querySelector("meta[property='og:description']");
    metaDescriptionOG.setAttribute('content', desc)
    const metaTitleTwitter = document.querySelector("meta[property='twitter:title']");
    metaTitleTwitter.setAttribute('content', title)
    const metaDescriptionTwitter = document.querySelector("meta[property='twitter:description']");
    metaDescriptionTwitter.setAttribute('content', desc)
  }, []);
  return (
    <>
      <Nav />
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "85vh" }}
      >
        <img src={img_404} alt="" className="img-fluid" />
      </div>
      <Footer top={1} />
    </>
  );
}

export default PageNotFound;
