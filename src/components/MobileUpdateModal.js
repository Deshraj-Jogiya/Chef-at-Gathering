import React from "react";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { isMobile } from 'react-device-detect';
function PopUp(props) {
    let navigate = useNavigate();
    return (
        <div className="modal fade" id="mobileUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex justify-content-center align-items-center">
                        <Formik
                            initialValues={{
                                phone_number: ""
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.phone_number) {
                                    errors.phone_number = 'Phone Number is Required';
                                } else if (isNaN(values.phone_number)) {
                                    errors.phone_number = 'Phone Number is Invalid';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting, setFieldError, setStatus }) => {
                                $(".validation").html("")
                                setTimeout(async () => {
                                    var response = await fetch(
                                        `${process.env.REACT_APP_BASE_URL}user/update_user_details`,
                                        {
                                            method: "POST",
                                            headers: {
                                                "Authorization": "Bearer " + localStorage.getItem("token"),
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                mobile: values.phone_number,
                                                type: "mobile"
                                            })
                                        }
                                    );
                                    const res_json = await response.text();
                                    const data = JSON.parse(res_json);
                                    if (data.status === true) {
                                        window.location.reload()
                                    }
                                    setSubmitting(false);
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

                                    id="mobileUpdate"
                                >
                                    <div className="mb-3">
                                        <input
                                            placeholder="Phone Number"
                                            type="number"
                                            name="phone_number"
                                            minLength={10}
                                            maxLength={14}
                                            className={errors.phone_number ? "form-control shadow-none invalid" : "form-control shadow-none"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phone_number}
                                        />
                                        <ErrorMessage name="phone_number">{msg => <h6 className="error-msg">{msg}</h6>}</ErrorMessage>
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