import React, { useRef, useEffect, useState } from "react";
import LoggedNav from "../components/LoggedNav";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowLeftSLine, RiPencilLine, RiArrowRightLine } from 'react-icons/ri';
import profile from "../images/Vector.jpg";
import Spinner from "./BePatient";
import $ from "jquery";
import { isMobile } from "react-device-detect";
import MobileUpdateModal from '../components/MobileUpdateModal'
import AddressUpdateModal from '../components/AddressUpdateModal'
import EmailUpdateModal from '../components/EmailUpdateModal'
import { FaPencilAlt } from "react-icons/fa";

function Profile(props) {
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const updateProfile = async (image) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    var formdata = new FormData();
    formdata.append("profile_photo", image);
    formdata.append("type", "profile_image");
    var response = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/update_user_details`,
      {
        headers: myHeaders,
        method: "POST",
        body: formdata,
        redirect: "follow",
      }
    );
    const res_json = await response.text();
    const data = JSON.parse(res_json);
    if (data.status) {
      customerDetails();
    }
  }
  const customerDetails = async () => {
    setLoading(true);
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/loggedin_customer_detail`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const res_json = await response.text();
    const data = JSON.parse(res_json);
    if (data.status === true) { setCustomer(data.data[0]); localStorage.setItem("user_image", data.data[0].customer_profile_image); } else {
      setLoading(false);
    }
    setLoading(false);
  };
  let role = localStorage.getItem("role");
  let token = localStorage.getItem("token");
  useEffect(() => {
    var title = `Profile | CHEF REPUBLIC`
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

    if (role === null || role !== "1") {
      navigate("/sign-in");
      window.location.reload();
    }
    if (token === null || token === undefined) {
      navigate("/sign-in");
      window.location.reload();
    }
    customerDetails();
    // eslint-disable-next-line
  }, []);
  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    updateProfile(event.target.files[0]);
    event.target.value = null;
    toBase64(fileObj).then((data) => {
      $("#profile_pic").attr("src", data);
    });
  };
  return (
    loading ? <Spinner /> : <>
      <LoggedNav customer={props.customer} />
      <div className="container my-5 ">

        {isMobile ? null : <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" style={{ cursor: "pointer" }} aria-current="page" onClick={() => { navigate(-1) }}>
              <span className="pe-2 h4">
                <RiArrowLeftSLine />
              </span>
              Go Back
            </li>
          </ol>
        </nav>}
        <MobileUpdateModal />
        <AddressUpdateModal />
        <EmailUpdateModal />
        <div
          className="d-flex justify-content-center align-items-center"
        >
          <img id="profile_pic" src={customer.customer_profile_image ? customer.customer_profile_image : profile} className="" alt="" style={{ borderRadius: "50%", height: "80px", width: "80px" }} />
        </div>
        <div className="profile-img" style={{ position: "absolute", left: isMobile? "52%": "51%", top: isMobile? "175px": "210px" }}>
          <div
            className="add-media d-flex align-items-center justify-content-center"
            onClick={handleClick}
            style={{
              borderRadius: "50%",
              backgroundColor: "white",
              height: "40px",
              width: "40px",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
          >
            <FaPencilAlt />
            <input
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="container" style={{ position: "" }}>
          <div className="mt-4">
            <h5 style={{ textAlign: "center", marginTop: "10px", fontWeight: 900 }}>{customer.customer_name}</h5>
            <div className="row my-5">
              <div className="col-sm m-1">
                <div className="border border-1 p-2"
                  style={{ borderRadius: "20px", boxShadow: "0,0,0,rgba(0,0,0,0.5)" }}
                >
                  <div className="px-2 d-flex justify-content-between">
                    <label
                      htmlFor="Input"
                      className="form-label"
                      style={{ color: "black", fontWeight: 600 }}
                    >
                      Registered Email
                    </label><button className="pe-2 h6" type="button" data-bs-toggle="modal" style={{ border: "none", backgroundColor: "transparent" }}
                      data-bs-target="#emailUpdate">
                      <RiPencilLine />
                    </button>
                  </div>
                  <h6 className="px-2 text-wrap">{customer.customer_email}</h6>
                  <input
                    type="email"
                    className="form-control shadow-none d-none"
                    placeholder={customer.customer_email}
                    aria-label="City"
                  />
                </div>
              </div>
              <div className="col-sm m-1">
                <div className="border border-1 p-2"
                  style={{ borderRadius: "20px", boxShadow: "0,0,0,rgba(0,0,0,0.5)" }}
                >
                  <div className="px-2 d-flex justify-content-between">
                    <label
                      htmlFor="Input"
                      className="form-label"
                      style={{ color: "black", fontWeight: 600 }}
                    >
                      Registered Phone number
                    </label><button className="pe-2 h6" type="button" data-bs-toggle="modal" style={{ border: "none", backgroundColor: "transparent" }} data-bs-target="#mobileUpdate">
                      <RiPencilLine />
                    </button>
                  </div>
                  <h6 className="px-2 text-wrap">{customer.customer_mobile}</h6>
                  <input
                    type="number"
                    className="form-control shadow-none d-none"
                    placeholder={customer.customer_mobile}
                    aria-label="State"
                  />
                </div>
              </div>
              <div className="col-sm m-1">
                <div className="border border-1 p-2"
                  style={{ borderRadius: "20px", boxShadow: "0,0,0,rgba(0,0,0,0.5)" }}
                >
                  <div className="px-2 d-flex justify-content-between">
                    <label
                      htmlFor="Input"
                      className="form-label"
                      style={{ color: "black", fontWeight: 600 }}
                    >
                      Saved Address
                    </label><button className="pe-2 h6" type="button" data-bs-toggle="modal" style={{ border: "none", backgroundColor: "transparent" }}
                      data-bs-target="#addressUpdate">
                      <RiPencilLine />
                    </button>
                  </div>
                  <h6 className="px-2 text-wrap">{customer.customer_address.replaceAll(",", ", ")}</h6>
                  <input
                    type="text"
                    className="form-control shadow-none d-none"
                    placeholder={customer.customer_address}
                    aria-label="Zip"
                  />
                </div>
              </div>
            </div>

            <div className="mx-auto" style={{ marginTop: "35px", width: isMobile ? "100%" : "400px" }}>
              <Link
                to="/chef-list"
                className="border border-1 my-2 text-dark d-flex justify-content-between align-items-center"
                style={{ borderRadius: "20px", background: "none", textDecoration: "none", padding: "10px 30px", color: "black", fontWeight: 600, boxShadow: "0,0,0,rgba(0,0,0,0.5)" }}
              >
                Browse Chef <RiArrowRightLine />
              </Link>
              <Link
                to="/order-list"
                className="border border-1 my-2 text-dark d-flex justify-content-between align-items-center"
                style={{ borderRadius: "20px", background: "none", textDecoration: "none", padding: "10px 30px", color: "black", fontWeight: 600, boxShadow: "0,0,0,rgba(0,0,0,0.5)" }}
              >
                Order History <RiArrowRightLine />
              </Link>
              <Link
                to="/update-card-details"
                className="border border-1 my-2 text-dark d-flex justify-content-between align-items-center"
                style={{ borderRadius: "20px", background: "none", textDecoration: "none", padding: "10px 30px", color: "black", fontWeight: 600, boxShadow: "0,0,0,rgba(0,0,0,0.5)" }}
              >
                Update Credit Card <RiArrowRightLine />
              </Link>
              <a

                type="button"
                onClick={() => { localStorage.clear(); navigate("/sign-in") }}
                className="border border-1 my-2 text-dark d-flex justify-content-between align-items-center"
                style={{ borderRadius: "20px", background: "none", textDecoration: "none", padding: "10px 30px", color: "black", fontWeight: 600, boxShadow: "0,0,0,rgba(0,0,0,0.5)" }}
              >
                Logout <RiArrowRightLine />
              </a>
              <a href="mailto:support@chefrepublic.us"
                className="text-center mt-2 d-flex justify-content-center align-items-center"
                style={{ border: "0px", textDecoration: "none", color: "#FF5E41" }}
              >
                Contact us
              </a>
            </div>
          </div >
        </div >
      </div >
    </>
  );
}

export default Profile;
