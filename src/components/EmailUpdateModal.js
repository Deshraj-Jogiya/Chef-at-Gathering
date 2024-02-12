import React, { useState } from "react";
import $ from "jquery";
import OTPInput from "otp-input-react";
import { isMobile } from 'react-device-detect';
function PopUp(props) {
    const [OTP, setOTP] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);
    const sendOtp = async (e) => {
        e.preventDefault();
        setSubmitting(true)
        if (!$("#email").val()) {
            $(".validation").html('Email is Required');
            $("#email").addClass("invalid")
            setSubmitting(false)
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test($("#email").val())
        ) {
            $(".validation").html('Email is Required');
            $("#email").addClass("invalid")
            setSubmitting(false)
        }
        var response = await fetch(
            `${process.env.REACT_APP_BASE_URL}user/update_user_details`,
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: $("#email").val(),
                    type: "email"
                })
            }
        );
        const res_json = await response.text();
        const data = JSON.parse(res_json);
        if (data.status === true) {
            localStorage.setItem("temp_email", $("#email").val())
            $("#EmailUpdateVerify").removeClass("d-none")
            $("#EmailUpdate").addClass("d-none")
        }
        setSubmitting(false);
    }
    const verifyOtp = async (e) => {
        e.preventDefault();
        setSubmitting(true)
        var response = await fetch(
            `${process.env.REACT_APP_BASE_URL}user/update_user_details`,
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: $("#email").val(),
                    otp: OTP,
                    type: "verify_email"
                })
            }
        );
        const res_json = await response.text();
        const data = JSON.parse(res_json);
        if (data.status === true) {
            $("#EmailUpdateVerify").addClass("d-none")
            $("#successMessage").removeClass("d-none")
        }
        setSubmitting(false);
    }


    return (
        <div className="modal fade" id="emailUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex justify-content-center align-items-center" id="EmailUpdate">
                        <form
                            style={{ width: isMobile ? "90%" : "70%" }}
                            onSubmit={sendOtp}

                            id="emailUpdateForm"
                        >
                            <div className="mb-3">
                                <input
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-control shadow-none"
                                />
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
                    </div>
                    <div className="modal-body d-flex justify-content-center align-items-center d-none" id="EmailUpdateVerify">
                        <form
                            style={{ width: isMobile ? "90%" : "70%" }}
                            onSubmit={verifyOtp}

                            id="emailVerifyUpdateForm"
                        >
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
                            <div className="my-3">
                                <button
                                    type="submit"
                                    className="btn-orange w-100"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? <span className="spinner-border spinner-border-sm"></span> : ""} Verify
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-body text-center d-none" id="successMessage">
                        Email Updated Successfully
                    </div>
                </div>
            </div>
        </div >
    );
}


export default PopUp;