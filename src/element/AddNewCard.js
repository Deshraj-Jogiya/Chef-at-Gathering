import React from "react";
import LoggedNav from "../components/LoggedNav";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftSLine } from 'react-icons/ri';
import $ from 'jquery';
import { Formik, ErrorMessage } from "formik";
import visa from "../images/icons/visa.png"
import master from "../images/icons/master.png"
import discover from "../images/icons/discover.png"
import { callErrorApi } from "../errorHandle/callErrorApi"

function AddNewCard(props) {
  const navigate = useNavigate();
  React.useEffect(() => {
    var title = `Add Card Details | CHEF REPUBLIC`;
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
  }, []);
  function containsSpecialChars(str, reg = null) {
    // eslint-disable-next-line
    var specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (reg) {
      specialChars = reg
    }
    return specialChars.test(str);
  }
  function validateCVV() {
    if ($("input[name='cvv']").val() && isNaN(($("input[name='cvv']").val()))) {
      $(".validation").html("Invalid CVV")
      return false
    }
    else {
      $(".validation").html("")
      return true
    }
  };
  function validateCardNumber() {
    if ($("input[name='card_number']").val() && isNaN(($("input[name='card_number']").val()).replaceAll(" ", ""))) {
      return false
    }
    else {
      return true
    }
  };
  // exp_month
  // exp_year

  function cc_format(value) {
    const v = value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);
    const parts = [];

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }

    return parts.length > 1 ? parts.join(" ") : value;
  }
  return (
    <>
      <LoggedNav customer={props.customer} />
      <div className="container my-4">
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
        <div className="container d-flex justify-content-center align-items-center">

          <Formik
            initialValues={{ name_on_card: '', card_number: '', exp_month: '', exp_year: '', cvv: '' }}
            validate={values => {
              const d = new Date();
              const errors = {};
              if (!values.name_on_card) {
                errors.name_on_card = 'Card Holder Name is Required';
              } else if (containsSpecialChars(values.name_on_card)) {
                errors.name_on_card = 'Special Character not allowed';
              }
              if (!values.card_number) {
                errors.card_number = 'Card Number is Required';
              } else if (containsSpecialChars(values.card_number)) {
                errors.card_number = 'Special Character not allowed';
              } else if (!validateCardNumber()) {
                errors.card_number = 'Invalid Card Number';
              }
              if (!values.exp_month) {
                errors.exp_month = 'Expiry Month is Required';
                // eslint-disable-next-line
              } else if (containsSpecialChars(values.exp_month, /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?~]/)) {
                errors.exp_month = 'Special Character not allowed';
              } else if (isNaN(values.exp_month)) {
                errors.exp_month = 'Expiry Month is Invalid';
              } else if (parseInt(values.exp_month) > 12) {
                errors.exp_month = 'Expiry Month cannot be more than 12';
              } else if (parseInt(values.exp_month) === 0) {
                errors.exp_month = 'Expiry Month cannot be 00';
              }
              if (!values.exp_year) {
                errors.exp_year = 'Expiry Year is Required';
                // eslint-disable-next-line
              } else if (containsSpecialChars(values.exp_year, /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?~]/)) {
                errors.exp_year = 'Special Character not allowed';
              } else if (isNaN(values.exp_year)) {
                errors.exp_year = 'Expiry Year is Invalid';
              } else if (parseInt(values.exp_year) < parseInt(d.getFullYear().toString())) {
                errors.exp_year = 'Card is Expired';
              } else if ((parseInt(d.getFullYear().toString()) === parseInt(values.exp_year)) && (parseInt(values.exp_month) === d.getMonth() + 1)) {
                errors.exp_month = 'Card is about to expire';
              } else if ((parseInt(d.getFullYear().toString()) === parseInt(values.exp_year)) && (parseInt(values.exp_month) < d.getMonth() + 1)) {
                errors.exp_month = 'Card is Expired';
              }
              if (!values.cvv) {
                errors.cvv = 'CVV is Required';
              } else if (containsSpecialChars(values.cvv)) {
                errors.cvv = 'Special Character not allowed';
              } else if (!validateCVV()) {
                errors.cvv = 'Invalid CVV';
              }
              return errors;
            }
            }
            onSubmit={(values, { setSubmitting, setFieldError, setStatus }) => {
              setTimeout(async () => {
                try {
                  const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}user/update_user_card_details`,
                    {
                      method: "POST",
                      headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        card_name: values.name_on_card,
                        card_number: values.card_number,
                        exp_month: values.exp_month,
                        exp_year: values.exp_year.slice(2),
                        cvv: values.cvv
                      }),
                    }
                  );
                  const res_json = await response.text();
                  const data = JSON.parse(res_json);
                  if (data.status === true) {
                    localStorage.setItem("card_added", 1)
                    setSubmitting(false);
                    navigate("/profile");
                  } else {
                    callErrorApi(`response_error: ${process.env.REACT_APP_BASE_URL}user/update_user_card_details`, localStorage.getItem("owner"), data);
                    if (data.message) {
                      $(".error-msg").html(data.message)
                    }
                    else {
                      $(".error-msg").html("Something went wrong. Please try Again")
                    }
                    setSubmitting(false);
                  }
                } catch (error) {
                  callErrorApi(`catch_error: ${process.env.REACT_APP_BASE_URL}user/update_user_card_details`, localStorage.getItem("owner"), error);
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
              <div className="card pb-3" style={{
                width: "388px", minHeight: "563px", borderRadius: "20px",
                boxShadow: "0,0,0,grba(0,0,0,0.2)",
              }}>
                <div className="card-header border-0 bg-transparent">
                  <h4 className="mx-auto my-4" style={{ textAlign: "center" }}>Add new credit card</h4>
                  <h6 className="mx-auto my-4" style={{ textAlign: "center" }}>You will not be charged right now</h6>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="border p-1 border-1 m-1 d-flex justify-content-center align-items-center">
                    <img src={visa} width={50} alt="" />
                  </div>
                  <div className="border p-1 border-1 m-1 d-flex justify-content-center align-items-center">
                    <img src={master} width={50} alt="" />
                  </div>
                  <div className="border p-1 border-1 m-1 d-flex justify-content-center align-items-center">
                    <img src={discover} width={50} alt="" />
                  </div>
                </div>
                <div className="card-body">
                  <form id="addCard" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        placeholder="Name on Card"
                        type="text"
                        name="name_on_card"
                        className={errors.name_on_card ? "form-control shadow-none invalid" : "form-control shadow-none"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name_on_card}
                      />
                      <ErrorMessage name="name_on_card">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                    </div>
                    <div className="mb-3">
                      <input
                        placeholder="Card Number"
                        type="text"
                        maxLength={19}
                        minLength={18}
                        name="card_number"
                        className={errors.card_number ? "form-control shadow-none invalid" : "form-control shadow-none"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={cc_format(values.card_number)}
                      />
                      <ErrorMessage name="card_number">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                    </div>
                    <div className="mb-3">
                      <input
                        placeholder="Expiry Month (MM)"
                        type="text"
                        maxLength={2}
                        minLength={2}
                        name="exp_month"
                        className={errors.exp_month ? "form-control shadow-none invalid" : "form-control shadow-none"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.exp_month}
                      />
                      <ErrorMessage name="exp_month">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                    </div>
                    <div className="mb-3">
                      <input
                        placeholder="Expiry Year (YYYY)"
                        type="text"
                        maxLength={4}
                        minLength={4}
                        name="exp_year"
                        className={errors.exp_year ? "form-control shadow-none invalid" : "form-control shadow-none"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.exp_year}
                      />
                      <ErrorMessage name="exp_year">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                    </div>
                    <div className="mb-3">
                      <input
                        placeholder="CVV"
                        type="text"
                        onKeyUp={validateCVV}
                        maxLength="3"
                        minLength="3"
                        name="cvv"
                        className={errors.cvv ? "form-control shadow-none invalid" : "form-control shadow-none"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cvv}
                      />
                      <ErrorMessage name="cvv">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                    </div>
                    <h6 className="text-center error-msg validation p-0">{""}</h6>
                    <div className="mb-3 text-center">
                      <button
                        type="submit"
                        className="mb-4 btn-orange w-100"
                      >
                        {isSubmitting ? <span className="spinner-border spinner-border-sm"></span> : ""} Add New Card
                      </button>
                    </div>
                  </form>
                </div >
              </div >
            )}
          </Formik>
        </div >
      </div>
    </>
  );
}

export default AddNewCard;
