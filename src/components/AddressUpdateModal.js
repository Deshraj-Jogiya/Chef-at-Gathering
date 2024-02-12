import React from "react";
import $ from "jquery";
import { Formik, ErrorMessage } from "formik";
import { isMobile } from 'react-device-detect';
import { callErrorApi } from '../errorHandle/callErrorApi';
function PopUp(props) {
    return (
        <div className="modal fade" id="addressUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex justify-content-center align-items-center">
                        <Formik
                            initialValues={{
                                postal_code: '', city: '', country: 'US', line1: '', line2: '', state: ''
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.line1) {
                                    errors.line1 = 'Address Line 1 is Required';
                                }
                                if (!values.line2) {
                                    errors.line2 = 'Address Line 2 is Required';
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
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting, setFieldError, setStatus }) => {
                                $(".validation").html("")
                                setTimeout(async () => {
                                    try {
                                        var response = await fetch(
                                            `${process.env.REACT_APP_BASE_URL}user/update_user_details`,
                                            {
                                                method: "POST",
                                                headers: {
                                                    "Authorization": "Bearer " + localStorage.getItem("token"),
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({
                                                    postal_code: values.postal_code,
                                                    city: values.city,
                                                    country: values.country,
                                                    line1: values.line1,
                                                    line2: values.line2,
                                                    state: values.state,
                                                    type: "address"
                                                })
                                            }
                                        );
                                        const res_json = await response.text();
                                        const data = JSON.parse(res_json);
                                        if (data.status === true) {
                                            window.location.reload()
                                        } else {
                                            callErrorApi(`response_error: ${process.env.REACT_APP_BASE_URL}user/update_user_details`, localStorage.getItem("owner"), data);
                                            setSubmitting(false);
                                        }
                                        setSubmitting(false);
                                    } catch (error) {
                                        callErrorApi(`catch_error: ${process.env.REACT_APP_BASE_URL}user/update_user_details`, localStorage.getItem("owner"), error);
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
                                    style={{ width: isMobile ? "90%" : "70%" }}
                                    onSubmit={handleSubmit}

                                    id="addressUpdate"
                                >
                                    <div className="mb-3">
                                        <input
                                            placeholder="Address Line 1"
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
                                            placeholder="Address Line 2"
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
                                            type="number"
                                            name="postal_code"
                                            className={errors.postal_code ? "form-control shadow-none invalid" : "form-control shadow-none"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.postal_code}
                                        />
                                        <ErrorMessage name="postal_code">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
                                    </div>
                                    <div className="mb-3">
                                        <button
                                            type="submit"
                                            className="btn-orange w-100"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? <span className="spinner-border spinner-border-sm"></span> : ""} Update
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div >
    );
}


export default PopUp;