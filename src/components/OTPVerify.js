import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OTPInput from "otp-input-react";
import { isMobile } from "react-device-detect";
import $ from "jquery";
import { callErrorApi } from "../errorHandle/callErrorApi"

function OTPVerify(props) {
  const [OTP, setOTP] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    var title = props.customer ? `Verify OTP | CHEF REPUBLIC` : `Verify OTP | CHEF | CHEF REPUBLIC`;
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
    // eslint-disable-next-line
  }, []);

  if (state === null) {
    navigate("/");
  }
  const { email } = state;
  const handleSubmit = async (e) => {
    setIsSubmitting(true)
    if (!OTP || OTP.length !== 4) {
      $("#validate").html("Please Enter OTP");
    }
    e.preventDefault();
    if (OTP && OTP.length === 4) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}auth/verifyemail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              otp: OTP.toString(),
            }),
          }
        );
        const res_json = await response.text();
        const data = JSON.parse(res_json);
        if (data.status === true) {
          if (data.data.role === "1") {
            let data_user = await fetch(
              `${process.env.REACT_APP_BASE_URL}user/loggedin_customer_detail`,
              {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + data.data.token,
                  "Content-Type": "application/json",
                },
              }
            )
            let parsedData1 = await data_user.json();
            localStorage.setItem("logged_user_id", parsedData1.data[0].customer_id);
            localStorage.setItem("token", data.data.token);
          }
          localStorage.setItem("role", data.data.role);
          localStorage.setItem("owner", email);
          navigate(
            data.data.role === "1"
              ? "/add-card-details"
              : "/chef/add-payment-details",
            {
              state: { email: email },
            }
          );
          setIsSubmitting(false);
        } else {
          callErrorApi(`response_error: ${process.env.REACT_APP_BASE_URL}user/loggedin_customer_detail`, email, data);
          $("#validate").html("Invalid OTP. Please try again.");
          setIsSubmitting(false);
        }
      } catch (error) {
        callErrorApi(`catch_error: ${process.env.REACT_APP_BASE_URL}auth/verifyemail`, email, error);
        setIsSubmitting(false);
      }
    }
  };
  const handleResend = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}auth/resend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      const res_json = await response.text();
      const data = JSON.parse(res_json);
      if (data.status !== true) {
        callErrorApi(`response_error: ${process.env.REACT_APP_BASE_URL}auth/resend`, email, data);
        $("#validate").html("Something Went wrong!");
      }
    } catch (error) {
      callErrorApi(`catch_error: ${process.env.REACT_APP_BASE_URL}auth/resend`, email, error);
    }
  };

  return (
    <>
      <div className="row m-0 p-0">
        <div
          className="col-md-7"
          style={{
            background: `linear-gradient(to left, rgba(255, 255, 255, 1) 0%,  rgba(255, 255, 255, 0.8) 10%, rgba(255, 255, 255, 0.2) 18%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 100%), url(${props.image}) no-repeat`,
            height: "90vh",
            display: isMobile ? "none" : "block",
          }}
        ></div>
        <div className="col-md-5 d-flex align-items-center py-5 justify-content-center flex-column">
          <div
            className="d-flex justify-content-center flex-column"
            style={{ width: "60%" }}
          >
            <h2
              className="mb-3 text-center"
              style={{
                color: "rgba(30, 30, 30, 1)",
                fontSize: "1.75rem",
                fontWeight: 800,
              }}
            >
              Confirm Email
            </h2>
            <h5 style={{ fontSize: "14px" }} className="mb-3 text-center">
              We’ve sent you a confirmation code, please check your email.
            </h5>
          </div>
          <div style={{ width: "80%" }}>
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              otpType="number"
              style={{ display: "flex", justifyContent: "center" }}
              inputStyles={{
                borderRadius: "13px",
                background: "#EDEDED",
                height: "3rem",
                width: "3rem",
                border: "none",
                boxShadow: "none!important",
              }}
            />
            <h6 className="text-center pt-3" id="validate">
              {""}
            </h6>
            <h2 className="my-4 fs-6 text-center">
              Didn’t get an email? &nbsp;
              <span
                style={{
                  textDecoration: "none",
                  color: "#FF5E41",
                  cursor: "pointer",
                }}
                onClick={handleResend}
              >
                Resend
              </span>
            </h2>
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-3 btn-orange w-100"
              disabled={isSubmitting}>{isSubmitting ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                ""
              )}{" "}
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OTPVerify;
