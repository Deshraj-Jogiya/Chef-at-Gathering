import React from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Formik, ErrorMessage } from "formik";
import Nav from "../components/Nav";

function ForgotOTP(props) {
  let navigate = useNavigate();

  React.useEffect(() => {
    var title = props.customer? "Forgot OTP | CHEF REPUBLIC" : "Forgot OTP | CHEF | CHEF REPUBLIC";
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
              email: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Email is Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, setFieldError, setStatus }) => {
              setTimeout(async () => {
                const response = await fetch(
                  `${process.env.REACT_APP_BASE_URL}auth/forgot_password`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: values.email }),
                  }
                );
                const res_json = await response.text();
                const data = JSON.parse(res_json);
                if (data.status === true) {
                  navigate(props.customer ? "/forgot-password/verify" : "/chef/forgot-password/verify", { state: { email: values.email } });
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
