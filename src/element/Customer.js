import React from "react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CustomerCover from "../components/CustomerCover";
import DietOffer from "../components/DietOffer";
import Desc from "../components/Desc";
import HowWorks from "../components/HowWorks";
import Benefits from "../components/Benefits";
import Feedback from "../components/Feedback";
import Faq from "../components/Faq";
import HomeSignup from "../components/HomeSignup";

function Customer(props) {
  React.useEffect(() => {
    var title = "HOME | CHEF REPUBLIC"
    var desc = "On Demand Private Chef Service for Personalized Meal Prep at an affordable rate. Use the app to select your preferred cuisine or diet and book your private chef to meal prep it for you"
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
  }, []);
  return (
    <>
      <Nav customer={props.customer} home={true} />
      <CustomerCover />
      <DietOffer />
      <Desc />
      <HowWorks />
      <Benefits />
      <Feedback />
      <Faq />
      <HomeSignup />
      <Footer customer={props.customer} />
    </>
  );
}

export default Customer;
