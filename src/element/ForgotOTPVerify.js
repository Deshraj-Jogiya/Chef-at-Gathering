import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useNavigate, useLocation } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Formik, ErrorMessage } from "formik";
import Nav from "../components/Nav";

function ForgotOTP(props) {
  let navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState("");
  useEffect(() => {
    var title = props.customer? "Forgot OTP Verify | CHEF REPUBLIC" : "Forgot OTP Verify | CHEF | CHEF REPUBLIC";
    var desc = "";
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

    if (state === null || state === undefined) {
      navigate("/forgot-password");
    }
    const { email } = state;
    if (!email || email === null || email === undefined) {
      navigate("/forgot-password");
    }
    setEmail(email);
  }, []);

  return (
    <>
      <Nav customer={props.customer} />
      <div className="row m-0 p-0">
        <div
          className="col-md-7"
          style={{
            background: `linear-gradient(to left, rgba(255, 255, 255, 1) 0%,  rgba(255, 255, 255, 0.8) 10%, rgba(255, 255, 255, 0.2) 18%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 100%), url(${props.image}) no-repeat`,
            height: "100vh",
            backgroundSize: "auto 100%",
            display: isMobile ? "none" : "block",
          }}
        ></div>
        <div className="col-md-5 d-flex align-items-center pt-5 justify-content-center flex-column">
          <div
            className="d-flex justify-content-center flex-column"
            style={{ width: "60%" }}
          >
            <h2
              className="mb-3 text-center"
              style={{
                color: "rgba(30, 30, 30, 1)",
                fontSize: "1.75rem",
                fontWeight: 700,
              }}
            >
              Forgot Password
            </h2>
          </div>
          <Formik
            initialValues={{
              password: "", otp: ""
            }}
            validate={(values) => {
              const errors = {};
              if (!values.otp) {
                errors.otp = 'OTP is Required';
              }
              if (!values.password) {
                errors.password = 'Password is Required';
              } else if (values.password.length < 8) {
                errors.password = 'Password must be of 8 Character';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, setFieldError, setStatus }) => {
              setTimeout(async () => {
                const response = await fetch(
                  `${process.env.REACT_APP_BASE_URL}auth/reset_password`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: email,
                      password: values.password,
                      otp: values.otp
                    }),
                  }
                );
                const res_json = await response.text();
                const data = JSON.parse(res_json);
                if (data.status === true) {
                  navigate(props.customer ? "/sign-in" : "/chef/sign-in");
                } else {
                  $(".validation").html(data.messages);
                  setSubmitting(false);
                }
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form
                style={{ width: "80%" }}
                id="signup"
                onSubmit={handleSubmit}
              >
                <div className="mb-3">
                  <input
                    placeholder="OTP"
                    maxLength={4}
                    minLength={4}
                    type="text"
                    className={errors.otp ? "form-control shadow-none invalid" : "form-control shadow-none"}
                    name="otp"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.otp}
                  />
                  <ErrorMessage name="otp">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                </div>
                <div className="mb-3">
                  <input
                    placeholder="Password"
                    type="password"
                    className={errors.password ? "form-control shadow-none invalid" : "form-control shadow-none"}
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <ErrorMessage name="password">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                </div>
                <h6 className="text-center error-msg validation">{""}</h6>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mb-4 w-100 btn-orange"
                >
                  {isSubmitting ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    ""
                  )}{" "}
                  Confirm
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default ForgotOTP;
