import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useNavigate, useLocation } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Formik, ErrorMessage } from "formik";
import { callErrorApi } from "../errorHandle/callErrorApi";

function PaymentDetail(props) {
  let navigate = useNavigate();
  const { state } = useLocation();
  let role = props.customer ? "1" : "2";
  const [email, setEmail] = useState("");
  useEffect(() => {
    var title = `Add Bank Details | CHEF REPUBLIC`;
    var desc = "Add Bank Details so that charges are automatically deposited in your account after every order is complete"
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

    if (role === null) {
      navigate("/chef/sign-in");
      window.location.reload();
    }
    if (state === null || state === undefined) {
      navigate("/chef/sign-in");
      window.location.reload();
    }
    const { email } = state;
    if (!email || email === null || email === undefined) {
      navigate("/chef/sign-in");
      window.location.reload();
    }
    setEmail(email);
  }, []);

  function containsSpecialChars(str, reg = null) {
    var specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (reg) {
      specialChars = reg;
    }
    return specialChars.test(str);
  }
  function validateAccountNumber() {
    if (
      $("input[name='bank_account_number']").val() &&
      isNaN($("input[name='bank_account_number']").val())
    ) {
      return false;
    } else {
      return true;
    }
  }
  function validateRouteNumber() {
    if (
      $("input[name='routing_number']").val() &&
      isNaN($("input[name='routing_number']").val())
    ) {
      return false;
    } else {
      return true;
    }
  }
  return (
    <>
      <div className="row m-0 p-0">
        <div
          className="col-md-7"
          style={{
            background: `linear-gradient(to left, rgba(255, 255, 255, 1) 0%,  rgba(255, 255, 255, 0.8) 10%, rgba(255, 255, 255, 0.2) 18%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 100%), url(${props.image}) no-repeat`,
            // height: "100vh",
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
              Add Bank Details
            </h2>
            <h5 style={{ fontSize: "14px" }} className="mb-3 text-center">
              to receive payments
            </h5>
          </div>
          <Formik
            initialValues={{
              bank_account_number: "",
              ssn_number: "",
              routing_number: "",
              account_holder_name: "",
              bank_name: "",
              postal_code: "",
              city: "",
              country: "US",
              line1: "",
              line2: "",
              state: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.bank_account_number) {
                errors.bank_account_number = "Bank Account Number is Required";
              } else if (containsSpecialChars(values.bank_account_number)) {
                errors.bank_account_number = "Special Character not allowed";
              } else if (!validateAccountNumber()) {
                errors.bank_account_number = "Invalid Bank Account Number";
              }
              if (!values.routing_number) {
                errors.routing_number = "Bank Routing Number is Required";
              } else if (!validateRouteNumber()) {
                errors.routing_number = "Invalid Bank Routing Number";
              } else if (containsSpecialChars(values.routing_number)) {
                errors.routing_number = "Special Character not allowed";
              }
              if (!values.account_holder_name) {
                errors.account_holder_name = "Account Holder Name is Required";
              } else if (containsSpecialChars(values.account_holder_name)) {
                errors.account_holder_name = "Special Character not allowed";
              }
              if (!values.bank_name) {
                errors.bank_name = "Bank Name is Required";
              } else if (containsSpecialChars(values.bank_name)) {
                errors.bank_name = "Special Character not allowed";
              }
              if (!values.line1) {
                errors.line1 = "Home Address Line 1 is Required";
              }
              if (!values.line2) {
                errors.line2 = "Home Address Line 2 is Required";
              }
              if (!values.city) {
                errors.city = "City is Required";
              }
              if (!values.state) {
                errors.state = "State is Required";
              }
              if (!values.country) {
                errors.country = "Country is Required";
              }
              if (!values.ssn_number) {
                errors.ssn_number = "Social Security Number is Required";
              }
              if (!values.postal_code) {
                errors.postal_code = "Zip Code is Required";
              } else if (isNaN(values.postal_code)) {
                errors.postal_code = "Zip Code is Invalid";
              } else if (values.postal_code.toString().length > 6) {
                errors.postal_code = "Zip Code is Invalid";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, setFieldError, setStatus }) => {
              setTimeout(async () => {
                try {
                  const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}user/update_payment_details`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        email: email,
                        role: role,
                        account_number: values.bank_account_number,
                        account_holder_name: values.account_holder_name,
                        ssn_number: values.ssn_number,
                        bank_name: values.bank_name,
                        routing_number: values.routing_number,
                        postal_code: values.postal_code,
                        city: values.city,
                        country: values.country,
                        line1: values.line1,
                        line2: values.line2,
                        state: values.state,
                      }),
                    }
                  );
                  const res_json = await response.text();
                  const data = JSON.parse(res_json);
                  if (data.status === true) {
                    navigate("/chef/complete-profile",
                      {
                        state: { email: email },
                      }
                    );
                    localStorage.setItem("address", values.line1 + ", " + values.line2 + ", " + values.city + ", " + values.state + ", " + values.country + ", " + values.postal_code)
                    localStorage.setItem("city", values.city)
                  } else {
                    callErrorApi(`response_error: ${process.env.REACT_APP_BASE_URL}user/update_payment_details`, email, data);
                    $(".validation").html(data.message);
                    setSubmitting(false);
                  }
                } catch (error) {
                  callErrorApi(`catch_error: ${process.env.REACT_APP_BASE_URL}user/update_payment_details`, email, error);
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
                    placeholder="Account Number"
                    onKeyUp={validateAccountNumber}
                    type="text"
                    name="bank_account_number"
                    className={
                      errors.bank_account_number
                        ? "form-control shadow-none invalid"
                        : "form-control shadow-none"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_account_number}
                  />
                  <ErrorMessage name="bank_account_number">
                    {(msg) => <h6 className="error-msg">{msg}</h6>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <input
                    placeholder="Account Holders Name"
                    type="text"
                    name="account_holder_name"
                    className={
                      errors.account_holder_name
                        ? "form-control shadow-none invalid"
                        : "form-control shadow-none"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.account_holder_name}
                  />
                  <ErrorMessage name="account_holder_name">
                    {(msg) => <h6 className="error-msg">{msg}</h6>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <input
                    placeholder="Bank Routing Number"
                    type="text"
                    name="routing_number"
                    className={
                      errors.routing_number
                        ? "form-control shadow-none invalid"
                        : "form-control shadow-none"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.routing_number}
                  />
                  <ErrorMessage name="routing_number">
                    {(msg) => <h6 className="error-msg">{msg}</h6>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <input
                    placeholder="Bank Name"
                    type="text"
                    name="bank_name"
                    className={
                      errors.bank_name
                        ? "form-control shadow-none invalid"
                        : "form-control shadow-none"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_name}
                  />
                  <ErrorMessage name="bank_name">
                    {(msg) => <h6 className="error-msg">{msg}</h6>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <input
                    placeholder="Home Address Line 1"
                    type="text"
                    name="line1"
                    className={
                      errors.line1
                        ? "form-control shadow-none invalid"
                        : "form-control shadow-none"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.line1}
                  />
                  <ErrorMessage name="line1">
                    {(msg) => <h6 className="error-msg">{msg}</h6>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <input
                    placeholder="Home Address Line 2"
                    type="text"
                    name="line2"
                    className={
                      errors.line2
                        ? "form-control shadow-none invalid"
                        : "form-control shadow-none"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.line2}
                  />
                  <ErrorMessage name="line2">
                    {(msg) => <h6 className="error-msg">{msg}</h6>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <input
                    placeholder="City"
                    type="text"
                    name="city"
                    className={
                      errors.city
                        ? "form-control shadow-none invalid"
                        : "form-control shadow-none"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                  />
                  <ErrorMessage name="city">
                    {(msg) => <h6 className="error-msg">{msg}</h6>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <input
                    placeholder="State"
                    type="text"
                    name="state"
                    className={
                      errors.state
                        ? "form-control shadow-none invalid"
                        : "form-control shadow-none"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                  />
                  <ErrorMessage name="state">
                    {(msg) => <h6 className="error-msg">{msg}</h6>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <input
                    placeholder="Country"
                    type="text"
                    name="country"
                    className={
                      errors.country
                        ? "form-control shadow-none invalid"
                        : "form-control shadow-none"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.country}
                    disabled={true}

                  />
                  <ErrorMessage name="country">
                    {(msg) => <h6 className="error-msg">{msg}</h6>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <input
                    placeholder="Zip Code"
                    type="number"
                    name="postal_code"
                    className={
                      errors.postal_code
                        ? "form-control shadow-none invalid"
                        : "form-control shadow-none"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.postal_code}
                  />
                  <ErrorMessage name="postal_code">
                    {(msg) => <h6 className="error-msg">{msg}</h6>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <input
                    placeholder="Enter your Social Security Number"
                    type="text"
                    name="ssn_number"
                    minLength={9}
                    maxLength={14}
                    className={
                      errors.ssn_number
                        ? "form-control shadow-none invalid"
                        : "form-control shadow-none"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ssn_number}
                  />
                  <h6
                    className="text-center mt-1"
                    style={{ color: "rgba(0, 0, 0, 0.63)", fontSize: "0.8rem" }}
                  >
                    (we will need it to pay you and run a background check)
                  </h6>
                  <ErrorMessage name="ssn_number">
                    {(msg) => <h6 className="error-msg">{msg}</h6>}
                  </ErrorMessage>
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

export default PaymentDetail;
