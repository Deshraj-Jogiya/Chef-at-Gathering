import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingDetailSummary from "../components/BookingDetailSummary";
import BookingDetailSummaryGuest from "../components/BookingDetailSummaryGuest";

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
        var title = "Booking Summary | CHEF REPUBLIC"
        var desc = "Booking Summary page provides the summary of all your selections with option to edit if needed."
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
        loggedIn ? <BookingDetailSummary customer={true} /> : <BookingDetailSummaryGuest customer={true} />
    )
}
