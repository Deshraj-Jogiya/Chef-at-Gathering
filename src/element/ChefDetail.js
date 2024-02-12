import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import BrowseChef from "../components/BrowseChef";
import BrowseChefGuest from "../components/BrowseChefGuest";
import BrowseChefMobile from "../components/BrowseChefMobile";
import BrowseChefMobileGuest from "../components/BrowseChefMobileGuest";

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
        loggedIn ? (isMobile ? <BrowseChefMobile customer={true} /> : <BrowseChef customer={true} />) : (isMobile ? <BrowseChefMobileGuest customer={true} /> : <BrowseChefGuest customer={true} />)
    )
}
