import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { Formik, ErrorMessage } from "formik";
import $ from "jquery"
import { callErrorApi } from '../errorHandle/callErrorApi';
function SignIn(props) {
  let navigate = useNavigate();
  let role = localStorage.getItem("role");
  let token = localStorage.getItem("token");
  useEffect(() => {
    var title = props.customer ? "Signin | CHEF REPUBLIC" : "Signin | CHEF | CHEF REPUBLIC"
    var desc = props.customer ? "Customer must signin or even Continue as guest in order to browse Private Chefs and various Cuisines/Diets like Keto, Indian, Caribbean, Mediterranean, Italian, American, Chinese, Paleo" : "Signin your Personal Chef Account with Chef Republic to meal prep for our customers"
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

    if (role !== null) {
      navigate(props.customer ? "/sign-in" : "/chef/sign-in");
    }
    if (role === "1" && token) {
      navigate("/chef-list");
    }
    if (role === "2" && token) {
      navigate("/chef/order-list");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
        <div
          className="col-md-5 d-flex align-items-center pt-5 justify-content-center flex-column"
          style={{ position: "relative" }}
        >
          <div
            className="d-flex justify-content-between"
            style={{ width: isMobile ? "90%" : "70%" }}
          >
            <h2>
              <span style={{ color: "#FF5E41", fontWeight: 700 }}>Sign In</span> <br />
            </h2>
            <h2>
              <Link
                to={props.customer ? "/sign-up" : "/chef/sign-up"}
                style={{
                  textDecoration: "none",
                  color: "rgba(0, 0, 0, .5)",
                  fontWeight: 700
                }}
              >
                Sign Up
              </Link>
            </h2>
          </div>
          <div
            className="d-flex justify-content-start mt-2 mb-3"
            style={{ width: isMobile ? "90%" : "70%" }}
          >
            <h4 style={{ fontSize: "16px", width: "320px" }}>{props.customer ? "to hire a private chef on demand" : "to get more clients"}</h4>
          </div>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Email is Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
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
                // try {
                var response = await fetch(
                  `${process.env.REACT_APP_BASE_URL}auth/login`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      email: values.email,
                      password: values.password,
                    }),
                  }
                );
                const res_json = await response.text();
                const data = JSON.parse(res_json);
                if (data.status === true) {
                  localStorage.setItem("role", data.data.role);
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
                    localStorage.setItem("owner", values.email);
                    localStorage.setItem("logged_user_id", parsedData1.data[0].customer_id);
                    localStorage.setItem("token", data.data.token);
                    localStorage.setItem("card_added", data.data.card_added);
                    localStorage.setItem("user_image", data.data.user_image);
                    if (!data.data.card_added) {
                      navigate("/add-card-details",
                        {
                          state: { email: values.email },
                        }
                      );
                    } else if (localStorage.getItem("redirect_to")) {
                      navigate(localStorage.getItem("redirect_to"));
                    }
                    else {
                      navigate("/chef-list");
                    }
                  } else {
                    localStorage.setItem("user_name", data.data.user_name);
                    localStorage.setItem("city", data.data.city);
                    localStorage.setItem("address", data.data.address);
                    if (data.data.token) {
                      let data_user = await fetch(
                        `${process.env.REACT_APP_BASE_URL}user/loggedin_chef_detail`,
                        {
                          method: "POST",
                          headers: {
                            Authorization: "Bearer " + data.data.token,
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      let parsedData1 = await data_user.json();
                      localStorage.setItem("logged_user_id", parsedData1.data[0].chef_id);
                      localStorage.setItem("owner", values.email);
                      localStorage.setItem("token", data.data.token);
                      localStorage.setItem("user_image", data.data.user_image);
                      navigate("/chef/order-list");
                    } else {
                      if (!data.data.bank_added) {
                        navigate("/chef/add-payment-details",
                          {
                            state: { email: values.email },
                          }
                        );
                      } else if (!data.data.profile_updated) {
                        navigate("/chef/complete-profile",
                          {
                            state: { email: values.email },
                          }
                        );
                      } else {
                        navigate("/under-review");
                      }
                    }
                  }
                }
                else {
                  callErrorApi(`response_error: ${process.env.REACT_APP_BASE_URL}auth/login`, values.email, data);
                  if (data.data && data.data.otp_verify && data.data.otp_verify == "0") {
                    navigate(
                      props.customer ? "/sign-up/verify-otp" : "/chef/sign-up/verify-otp",
                      {
                        state: { email: data.data.email ? data.data.email : "" },
                      }
                    );
                  }
                  else if (data.messages && !data.messages.error) {
                    $(".validation").html(data.messages)
                  } else {
                    if (((data.messages.error).toLowerCase()).includes("email")) {
                      $(".validation").html("")
                      setFieldError('email', data.messages.error);
                    }
                    if (((data.messages.error).toLowerCase()).includes("password")) {
                      $(".validation").html("")
                      setFieldError('password', data.messages.error);
                    }
                  }
                  setSubmitting(false);
                }
                // } catch (error) {
                //   callErrorApi(`catch_error: ${process.env.REACT_APP_BASE_URL}auth/login`, values.email, error);
                //   setSubmitting(false);
                // }
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
                style={{ width: isMobile ? "90%" : "70%", paddingBottom: "60px" }}
                onSubmit={handleSubmit}
                id="signin"
              >
                <div className="mb-3">
                  <input
                    placeholder="Email ID"
                    type="text"
                    className={errors.password ? "form-control shadow-none invalid" : "form-control shadow-none"}
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <ErrorMessage name="email">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
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
                <div className="text-center">
                  <button
                    type="submit"
                    className="m-2 btn-orange w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <span className="spinner-border spinner-border-sm"></span> : ""} Sign In
                  </button>
                </div>
                <p style={{ color: "red", fontSize: "0.8rem" }} className="validation text-center">{""}</p>
                <ErrorMessage name="credential" >{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                <h2 className="mb-4 text-center">
                  <Link
                    to={props.customer ? "/forgot-password" : "/chef/forgot-password"}
                    style={{
                      textDecoration: "none",
                      color: "#FF5E41",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>Forgot Password?</span>
                  </Link>
                </h2>
              </form>
            )}
          </Formik>
        </div >
      </div >
    </>
  );
}

export default SignIn;
