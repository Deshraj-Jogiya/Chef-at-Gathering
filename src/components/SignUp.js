import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { Formik, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { callErrorApi } from '../errorHandle/callErrorApi';
function SignUp(props) {
  useEffect(() => {
    var title = props.customer ? "Signup | CHEF REPUBLIC" : "Signup | CHEF | CHEF REPUBLIC"
    var desc = props.customer ? "Customer must Sign Up or even Continue as guest in order to browse Private Chefs and various Cuisines/Diets like Keto, Indian, Caribbean, Mediterranean, Italian, American, Chinese, Paleo" : "Create your Personal Chef Account by signing up with Chef Republic to meal prep for our customers";
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

    $("#sex").css("color", "#6c757d")
  }, []);
  const [startDate, setStartDate] = useState();
  function containsSpecialChars(str, reg = null) {

    // eslint-disable-next-line
    var specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (reg) {
      specialChars = reg
    }
    return specialChars.test(str);
  }
  let navigate = useNavigate();
  var year_date = new Date();
  year_date.setFullYear(year_date.getFullYear() - 18);

  const getBody = (values) => {
    let month = ""
    let date = ""
    if ((startDate.getMonth() + 1) < 10) {
      month = "0" + (startDate.getMonth() + 1).toString()
    } else {
      month = (startDate.getMonth() + 1).toString()
    }
    if (startDate.getDate() < 10) {
      date = "0" + (startDate.getDate()).toString()
    } else {
      date = (startDate.getDate()).toString()
    }
    let us_date_string = month + "/" + date + "/" + startDate.getFullYear().toString()
    let body;
    if (props.customer) {
      body = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        mobile: values.phone_number,
        password: values.password,
        role: props.customer ? "1" : "2",
        postal_code: values.postal_code,
        city: values.city,
        country: values.country,
        line1: values.line1,
        line2: values.line2,
        state: values.state,
        dob: us_date_string,
        sex: values.sex
      }
    }
    else {
      body = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        mobile: values.phone_number,
        password: values.password,
        dob: us_date_string,
        sex: values.sex,
        role: props.customer ? "1" : "2"
      }
    }
    return body
  }
  return (
    <>
      <div className="row m-0 p-0">
        <div
          className="col-md-7"
          style={{
            background: `linear-gradient(to left, rgba(255, 255, 255, 1) 0%,  rgba(255, 255, 255, 0.8) 10%, rgba(255, 255, 255, 0.2) 18%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 100%), url(${props.image}) no-repeat`,
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
            <h2 >
              <span style={{ color: "#FF5E41", fontWeight: 700 }}>Sign Up</span> <br />
            </h2>
            <h2>
              <Link
                to={props.customer ? "/sign-in" : "/chef/sign-in"}
                style={{ textDecoration: "none", color: "rgba(0, 0, 0, .5)", fontWeight: 700 }}
              >
                Sign In
              </Link>
            </h2>
          </div>
          <div
            className="d-flex justify-content-start mt-2 mb-3"
            style={{ width: isMobile ? "90%" : "70%" }}
          >
            <h4 style={{ fontSize: "16px", width: "320px" }}>{props.customer ? "to hire a private chef on demand" : "Grow your network of clients and earn extra money with us"}</h4>
          </div>
          <Formik
            initialValues={{
              first_name: '', last_name: "", phone_number: "", email: '', password: '', postal_code: '', city: '', country: 'US', line1: '', line2: '', state: '', dob: '', sex: ''
            }}
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
              if (!values.first_name) {
                errors.first_name = 'First Name is Required';
              } else if (containsSpecialChars(values.first_name)) {
                errors.first_name = 'Special Character not allowed';
              }
              if (!values.last_name) {
                errors.last_name = 'Last Name is Required';
              } else if (containsSpecialChars(values.last_name)) {
                errors.last_name = 'Special Character not allowed';
              }
              if (!values.sex) {
                errors.sex = 'Please select your Gender';
              }
              if (values.sex) {
                $("#sex").css("color", "black")
              }
              if (!startDate) {
                errors.dob = 'Date of Birth is Required';
              }
              if (!values.phone_number) {
                errors.phone_number = 'Phone Number is Required';
              } else if (isNaN(values.phone_number)) {
                errors.phone_number = 'Phone Number is Invalid';
              }
              if (props.customer) {
                if (!values.line1) {
                  errors.line1 = 'Home Address Line 1 is Required';
                }
                if (!values.line2) {
                  errors.line2 = 'Home Address Line 2 is Required';
                }
                if (!values.city) {
                  errors.city = 'City is Required';
                }
                if (!values.state) {
                  errors.state = 'State is Required';
                }
                if (!values.country) {
                  errors.country = 'Country is Required';
                }
                if (!values.postal_code) {
                  errors.postal_code = 'Zip Code is Required';
                } else if (isNaN(values.postal_code)) {
                  errors.postal_code = 'Zip Code is Invalid';
                } else if ((values.postal_code.toString()).length > 6) {
                  errors.postal_code = 'Zip Code is Invalid';
                }
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, setFieldError, setStatus }) => {
              // eslint-disable-next-line
              if ((props.customer && $("#tn_check_1").is(':checked') || (!props.customer && $("#tn_check_2").is(':checked') && $("#tn_check_3").is(':checked')))) {
                $(".validation").html("")
                setTimeout(async () => {
                  try {
                    var response = await fetch(
                      `${process.env.REACT_APP_BASE_URL}auth/register`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(getBody(values))
                      }
                    );
                    const res_json = await response.text();
                    const data = JSON.parse(res_json);
                    if (data.status === true) {
                      localStorage.setItem("user_name", values.first_name + " " + values.last_name);
                      if (props.customer) {
                        localStorage.setItem("address", values.line1 + ", " + values.line2 + ", " + values.city + ", " + values.state + ", " + values.country + ", " + values.postal_code);
                        localStorage.setItem("city", values.city);
                      }
                      navigate(
                        props.customer ? "/sign-up/verify-otp" : "/chef/sign-up/verify-otp",
                        {
                          state: { email: values.email ? values.email : "" },
                        }
                      );
                    } else {
                      callErrorApi(`response_error: ${process.env.REACT_APP_BASE_URL}auth/register`, values.email, data);
                      if (data.messages.email && (((data.messages.email).toLowerCase()).includes("unique"))) {
                        setFieldError('email', "Email already in use");
                      }
                      if (data.messages.phone_number && (((data.messages.phone_number).toLowerCase()).includes("unique"))) {
                        setFieldError('phone_number', "Phone Number already in use");
                      }
                      setSubmitting(false);
                    }
                  } catch (error) {
                    callErrorApi(`catch_error: ${process.env.REACT_APP_BASE_URL}auth/register`, values.email, error);
                    setSubmitting(false);
                  }
                }, 400);
              }
              else {
                $(".validation").html("Please accept the below mentioned criteria before Signing Up")
                setSubmitting(false);
              }
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
                id="signup"
              >
                <div className="mb-3">
                  <input
                    placeholder="First Name"
                    type="text"
                    name="first_name"
                    className={errors.first_name ? "form-control shadow-none invalid" : "form-control shadow-none"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name}
                  />
                  <ErrorMessage name="first_name">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                </div>
                <div className="mb-3">
                  <input
                    placeholder="Last Name"
                    type="text"
                    name="last_name"
                    className={errors.last_name ? "form-control shadow-none invalid" : "form-control shadow-none"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.last_name}
                  />
                  <ErrorMessage name="last_name">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                </div>
                <div className="mb-3">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    className={errors.email ? "form-control shadow-none invalid" : "form-control shadow-none"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <ErrorMessage name="email">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                </div>
                <div className="mb-3">
                  <input
                    placeholder="Phone Number"
                    type="text"
                    name="phone_number"
                    minLength={10}
                    maxLength={10}
                    className={errors.phone_number ? "form-control shadow-none invalid" : "form-control shadow-none"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone_number}
                  />
                  <ErrorMessage name="phone_number">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                  <h6 className="px-1 pt-1 text-secondary" style={{ fontSize: "0.7rem" }}>By entering this number, you agree to receive sms notification about your order</h6>
                </div>
                <div className="mb-3">
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    className={errors.password ? "form-control shadow-none invalid" : "form-control shadow-none"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <ErrorMessage name="password">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                </div>
                <div className="mb-3">
                  <select onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sex}
                    name="sex"
                    id="sex"
                    placeholder="Gender"
                    className={errors.sex ? "form-control shadow-none invalid" : "form-control shadow-none"}>
                    <option value={""} disabled={true}>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <ErrorMessage name="sex">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                </div>
                <div className="mb-3">
                  <DatePicker
                    disabledKeyboardNavigation
                    useShortMonthInDropdown
                    showMonthDropdown
                    showYearDropdown
                    yearDropdownItemNumber={60}
                    scrollableYearDropdown
                    placeholderText="Date of Birth"
                    className={errors.dob ? "form-control shadow-none invalid" : "form-control shadow-none"}
                    showIcon
                    value={startDate}
                    selected={startDate}
                    style={{ borderRadius: "30px", padding: "10px", background: "#EDEDED", border: "none", fontSize: "1rem" }}
                    dateFormat="MM/dd/yyyy"
                    maxDate={year_date}
                    onChange={(date) => setStartDate(date)}
                  />
                  <ErrorMessage name="dob">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                </div>
                {props.customer ?
                  <>
                    <div className="mb-3">
                      <input
                        placeholder="Home Address Line 1"
                        type="text"
                        name="line1"
                        className={errors.line1 ? "form-control shadow-none invalid" : "form-control shadow-none"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.line1}
                      />
                      <ErrorMessage name="line1">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                    </div>
                    <div className="mb-3">
                      <input
                        placeholder="Home Address Line 2"
                        type="text"
                        name="line2"
                        className={errors.line2 ? "form-control shadow-none invalid" : "form-control shadow-none"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.line2}
                      />
                      <ErrorMessage name="line2">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                    </div>
                    <div className="mb-3">
                      <input
                        placeholder="City"
                        type="text"
                        name="city"
                        className={errors.city ? "form-control shadow-none invalid" : "form-control shadow-none"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                      />
                      <ErrorMessage name="city">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                    </div>
                    <div className="mb-3">
                      <input
                        placeholder="State"
                        type="text"
                        name="state"
                        className={errors.state ? "form-control shadow-none invalid" : "form-control shadow-none"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.state}
                      />
                      <ErrorMessage name="state">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                    </div>
                    <div className="mb-3">
                      <input
                        placeholder="Country"
                        type="text"
                        name="country"
                        style={{ color: "rgb(108, 117, 125)" }}
                        className={errors.country ? "form-control shadow-none invalid" : "form-control shadow-none"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                        disabled={true}

                      />
                      <ErrorMessage name="country">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                    </div>
                    <div className="mb-3">
                      <input
                        placeholder="Zip Code"
                        type="text"
                        name="postal_code"
                        maxLength={5}
                        minLength={5}
                        className={errors.postal_code ? "form-control shadow-none invalid" : "form-control shadow-none"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.postal_code}
                      />
                      <ErrorMessage name="postal_code">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                    </div>
                  </> : ""}
                <h6 className="text-center error-msg validation">{""}</h6>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn-orange w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <span className="spinner-border spinner-border-sm"></span> : ""} Sign Up
                  </button>
                </div>
                {props.customer ? <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="tn_check_1"
                    name="tn_check_1"
                    value={true}
                  />
                  <label htmlFor="tn_check_1">
                    By signing up you agree to our
                    <a href={props.customer ? "/terms-and-conditions" : "/chef/terms-and-conditions"}>Terms & Conditions</a>  & <a href={props.customer ? "/privacy-policy" : "/chef/privacy-policy"}>Privacy Policies</a>
                  </label>
                </div> : <div> <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="tn_check_2"
                    name="tn_check_2"
                    value={true}
                  />
                  <label htmlFor="tn_check_2">
                    You confirm you have reviewed and agreed to the <a href={props.customer ? "/terms-and-conditions" : "/chef/terms-and-conditions"}>Terms & Conditions</a>  & <a href={props.customer ? "/privacy-policy" : "/chef/privacy-policy"}>Privacy Policy</a> of Chef Republic
                  </label>
                </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="tn_check_3"
                      name="tn_check_3"
                      value={true}
                    />
                    <label htmlFor="tn_check_3">
                      I have work authorization to work in US
                    </label>
                  </div> </div>}

                <div className="mb-3">
                  <button
                    onClick={() => { navigate("/") }}
                    type="button"
                    className="btn-white w-100"
                  >
                    Continue as guest
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default SignUp;
