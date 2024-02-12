import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingDetail1 from "../components/BookingDetail1";
import BookingDetail1Guest from "../components/BookingDetail1Guest";

export default function ChefDetail() {
    const [loggedIn, setLoggedIn] = useState();
    let navigate = useNavigate();

    const checkLoggedInUser = () => {
        let token = localStorage.getItem("token");
        if (token) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }

    useEffect(() => {
        var title = "Booking Detail | CHEF REPUBLIC"
        var desc = "Customer enters his preferences by selecting menu items and portion sizes, along with specifying any allergies. Customers also need to specify whether they would like the private chef to pick the groceries for them and add any additional instructions for the private chef."
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

        let role = localStorage.getItem("role");
        if (localStorage.getItem("token")) {
            if (role === null) {
                navigate("/");
            }
            if (role === "2") {
                navigate("/chef");
            }
        }
        checkLoggedInUser()
    }, []);

    return (
        loggedIn ? <BookingDetail1 customer={true} /> : <BookingDetail1Guest customer={true} />
    )
}
