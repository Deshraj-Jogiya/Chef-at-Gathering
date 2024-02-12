import React from "react";
import Footer from "../components/Footer";
import ChefCover from "../components/chef/ChefCover";
import WhyChefRepublic from "../components/chef/WhyChefRepublic";
import HowWorksChef from "../components/chef/HowWorksChef";
import Feedback from "../components/Feedback";
import Faq from "../components/Faq";
import HomeSignup from "../components/HomeSignup";
import Nav from "../components/Nav";

function Chef(props) {
  React.useEffect(() => {
    var title = "CHEF | CHEF REPUBLIC"
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
      <ChefCover />
      <WhyChefRepublic />
      <HowWorksChef />
      <Feedback />
      <Faq />
      <HomeSignup />
      <Footer customer={props.customer} />
    </>
  );
}

export default Chef;
