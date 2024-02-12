import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedNav from "../components/LoggedNav";
import Footer from "../components/Footer";
import Spinner from "../element/BePatient";
import $ from "jquery";
import { RiArrowLeftSLine } from 'react-icons/ri';
import { Rating } from 'react-simple-star-rating';
import { BiPencil } from "react-icons/bi";
import { isMobile } from "react-device-detect";
import { callErrorApi } from '../errorHandle/callErrorApi';
function BookingDetailSummary(props) {
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [showBreakup, setShowBreakup] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [chef_id, setChefId] = useState("");
    const [address, setAddress] = useState("");
    const [booking_date, setbookingDate] = useState("");
    const [timeslots, setTimeslots] = useState("");
    const [food_categories_id, setFoodCategoryId] = useState("");
    const [food_categories_name, setFoodCategoryName] = useState("");
    const [allergies, setAllergies] = useState("");
    const [chef_grocery_pickup, setGroceryPick] = useState();
    const [groceryFees, setGroceryFees] = useState(0);
    const [totalFees, setTotalFees] = useState(0);
    const [menu_item, setMenuItem] = useState([]);
    const [instructions_for_chef, setInstructionsChef] = useState("");
    const base_charge = "109.00"
    const service_fees = 6.99
    let navigate = useNavigate();
    const messagesEndRef = React.useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    React.useLayoutEffect(() => {
        scrollToBottom()
    });
    const updateGroceryPart = (value) => {
        setGroceryPick(value)
        localStorage.setItem("chef_grocery_pickup", value)
        setGroceryFees(value === "Yes" ? 14.99 : 0)
        setTotalFees(parseFloat(base_charge) + (value === "Yes" ? 14.99 : 0) + service_fees)
    }
    const updateChefs = async (chef_id) => {
        setLoading(true)
        try {
            let data = await fetch(`${process.env.REACT_APP_BASE_URL}user/get_chef_detail`,
                {
                    method: 'POST',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "chef_id": (chef_id).toString()
                    })
                });
            let parsedData = await data.json()
            setDetails(parsedData.data)
            setLoading(false)
        } catch (error) {
            callErrorApi(`catch_error: ${process.env.REACT_APP_BASE_URL}user/get_chef_detail`, localStorage.getItem("owner"), error);
            setLoading(false)
        }
    }
    function navigateToDetail() {
        navigate(-1)
    }
    useEffect(() => {
        setChefId(localStorage.getItem("chef_id"));
        updateChefs(localStorage.getItem("chef_id"));
        setAddress(localStorage.getItem("address").replaceAll(",", ", "));
        setbookingDate(localStorage.getItem("booking_date"));
        setTimeslots(localStorage.getItem("timeslots"));
        setFoodCategoryId(localStorage.getItem("food_categories").split("-")[0]);
        setFoodCategoryName(localStorage.getItem("food_categories").split("-")[1]);
        setAllergies(localStorage.getItem("allergies"));
        setInstructionsChef(localStorage.getItem("instructions_for_chef"));
        setMenuItem([{ 'item_number': localStorage.getItem("item_number_1"), 'portion': localStorage.getItem("portion_1") }, { 'item_number': localStorage.getItem("item_number_2"), 'portion': localStorage.getItem("portion_2") }, { 'item_number': localStorage.getItem("item_number_3"), 'portion': localStorage.getItem("portion_3") }, { 'item_number': localStorage.getItem("item_number_4"), 'portion': localStorage.getItem("portion_4") }]);
        setGroceryPick(localStorage.getItem("chef_grocery_pickup"));
        setGroceryFees(localStorage.getItem("chef_grocery_pickup") === "Yes" ? 14.99 : 0)
        setTotalFees(parseFloat(base_charge) + (localStorage.getItem("chef_grocery_pickup") === "Yes" ? 14.99 : 0) + service_fees)
        // eslint-disable-next-line
    }, [])
    const bookChef = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        if (localStorage.getItem("card_added") == 0) {
            localStorage.setItem("redirect_to", "/booking-summary")
            navigate("/add-card-details",
                {
                    state: { email: localStorage.getItem("owner") },
                }
            );
        } else {
            var formdata = new FormData();
            formdata.append("chef_id", chef_id);
            formdata.append("address", address);
            formdata.append("booking_date", booking_date);
            formdata.append("timeslots", timeslots);
            formdata.append("food_categories", food_categories_id);
            formdata.append("allergies", $("#allergies").val());
            formdata.append("instructions_for_chef", $("#instructions_for_chef").val());
            formdata.append("chef_grocery_pickup", chef_grocery_pickup);
            formdata.append("menu_item", JSON.stringify(menu_item));
            formdata.append("payment_details", JSON.stringify([{ "base_charge": base_charge.toString() }, { "grocery_fees": groceryFees.toString() }, { "service_fee": service_fees.toString() }, { "sub_total": totalFees.toString() }, { "total_booking_payment": totalFees.toString() }]));
            formdata.append("total_payment", totalFees.toString());
            try {
                let response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}book/book_chef`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                        body: formdata,
                        redirect: "follow",
                    }
                );
                const res_json = await response.text();
                const data = JSON.parse(res_json);
                if (data.status === true) {
                    localStorage.removeItem("redirect_to")
                    localStorage.removeItem("allergies")
                    localStorage.removeItem("item_number_1")
                    localStorage.removeItem("item_number_2")
                    localStorage.removeItem("item_number_3")
                    localStorage.removeItem("item_number_4")
                    localStorage.removeItem("portion_1")
                    localStorage.removeItem("portion_2")
                    localStorage.removeItem("portion_3")
                    localStorage.removeItem("portion_4")
                    localStorage.removeItem("instructions_for_chef")
                    localStorage.removeItem("chef_grocery_pickup")
                    localStorage.removeItem("address")
                    localStorage.removeItem("booking_date")
                    localStorage.removeItem("timeslots")
                    localStorage.removeItem("food_categories")
                    localStorage.removeItem("food_categories_id")
                    localStorage.removeItem("food_categories_name")
                    localStorage.removeItem("redirect_to")
                    navigate("/booking-detail/confirm");
                } else {
                    callErrorApi(`response_error: ${process.env.REACT_APP_BASE_URL}book/book_chef`, localStorage.getItem("owner"), data);
                    setIsSubmitting(false);
                }
            } catch (error) {
                callErrorApi(`catch_error: ${process.env.REACT_APP_BASE_URL}book/book_chef`, localStorage.getItem("owner"), error);
                setIsSubmitting(false);
            }
        }
        setIsSubmitting(false)
    }
    return (
        loading ? <Spinner /> : <>
            <LoggedNav customer={props.customer} />
            {isMobile ? <div className="fixBoxOrange">
                <div className="edit_btn">
                    {showBreakup ? <>
                        <div className="d-flex justify-content-between align-items-center">
                            <p>Base Charge</p>
                            <p style={{ fontWeight: 700 }}>${base_charge.toString()}</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p>Service Fee</p>
                            <p style={{ fontWeight: 700 }}>${service_fees}</p>
                        </div>
                        {chef_grocery_pickup === "Yes" || groceryFees ? <div className="d-flex justify-content-between align-items-center">
                            <p>Grocery Delivery Fee</p>
                            <p style={{ fontWeight: 700 }}>${groceryFees}</p>
                        </div> : null}
                    </> : null}
                    <div className="d-flex justify-content-between align-items-center">
                        <p style={{ fontWeight: 700 }}>Total Payment After Meal</p>
                        <p style={{ fontWeight: 700 }}>${totalFees}</p>
                    </div>
                    <div className="d-flex mt-1 justify-content-between align-items-center">
                        <p id="showBreakup" className="" style={{ fontSize: "0.8rem", color: "#FF5E41" }} onClick={() => { setShowBreakup(true); $("#showBreakup").addClass("d-none"); $("#hideBreakup").removeClass("d-none") }}>See Breakup</p>
                        <p id="hideBreakup" className="d-none" style={{ fontSize: "0.8rem", color: "#FF5E41" }} onClick={() => { setShowBreakup(false); $("#showBreakup").removeClass("d-none"); $("#hideBreakup").addClass("d-none") }}>Hide Breakup</p>
                    </div>
                    <button type="button" className="btn text-center btn-orange rounded-pill mb-1" onClick={bookChef}
                        style={{ width: "100%", margin: "auto" }} disabled={isSubmitting}>{isSubmitting ? (
                            <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                            ""
                        )}{" "} Confirm Booking </button>
                    <p style={{ fontSize: "0.7rem", color: "#7C7C7C" }}>Grocery bill charges
                        will be added to reimburse the chef</p>
                </div>
            </div> : null}
            <div className="container my-5 border border-0 ">
                {isMobile ? null : <nav aria-label="breadcrumb">
                    <a onClick={navigateToDetail} style={{ textDecoration: "none", color: "black", fontWeight: 500, cursor: "pointer" }}>
                        <RiArrowLeftSLine size={"2.3rem"} /> <span style={{ textDecoration: "none", color: "orange", fontWeight: 700 }}>{details[0].chef_name} </span>
                    </a>
                    / Enter Booking Details
                </nav>}

                <div className="main_container row">
                    {isMobile ? null : <div className="col-5">
                        <div className="box_title">
                            <h1 className="">{details[0].chef_name}</h1>
                            <h5 style={{ marginTop: "15px" }}>{details[0].chef_city}</h5>
                        </div>

                        <div className={"d-flex justify-content-start " + (isMobile ? "pt-1 mt-1" : "pt-3 mt-3")}>
                            <Rating
                                allowFraction={true}
                                initialValue={details[0].chef_rating}
                                size={18}
                                allowHover={false}
                                readonly={true}
                                style={{ display: "flex", alignItems: "center" }}
                            />
                            <div className="d-flex justify-content-center ms-3">
                                <p style={{ fontSize: "0.9rem", color: "#7C7C7C" }}>{details[0].chef_total_number_of_reviews} reviews</p>
                            </div>
                        </div>

                        <div className="image_box" style={{
                            backgroundImage: `url(${details[0].chef_profile_image})`, backgroundSize: "cover",
                            backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "80px", height: "80px",
                            borderRadius: "20px", marginTop: "20px"
                        }}>
                        </div>
                    </div>
                    }

                    <div className={isMobile ? "col-12 p-4 d-flex flex-column justify-content-center align-items-center" : "col-7 p-5 d-flex flex-column justify-content-center align-items-center"} style={{ boxShadow: isMobile ? "" : "0px 0px 8px rgba(0, 0, 0, 0.1)", border: "none", borderRadius: isMobile ? "" : "20px" }}>
                        <form id="profile-chef-complete">
                            <div className="box_title" style={{ width: isMobile ? "100%" : "50%", height: "auto", margin: "auto" }}>
                                <h4 className={isMobile ? "" : "mt-5"} style={{ textAlign: "center", fontWeight: "700", fontSize: "1.5rem" }}>Booking Summary</h4>
                                <p style={{ textAlign: "center" }}>Check all details before confirming</p>
                            </div>

                            <div className="box_title py-2 my-2" style={{
                                background: "#FFFFFF",
                                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)", borderRadius: "15px", width: isMobile ? "95%" : "90%",
                                margin: "auto"
                            }}>

                                <div className="d-flex justify-content-between mx-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Address for service</label>
                                    <BiPencil size={18} style={{ cursor: "pointer" }} onClick={() => {
                                        navigate("/booking-detail", {
                                            state: { chef_id: chef_id },
                                        })
                                    }} />
                                </div>
                                <div className="mx-3">
                                    <p className="m-0">{address}</p>
                                </div>
                            </div>

                            <div className="box_title py-2 my-2"
                                style={{
                                    background: "#FFFFFF", boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                                    borderRadius: "15px", width: isMobile ? "95%" : "90%",
                                    margin: "auto"
                                }}>

                                <div className="d-flex justify-content-between mx-3">
                                    <label className="form-label fw-bold">Date Selected</label>
                                    <BiPencil size={18} style={{ cursor: "pointer" }} onClick={() => {
                                        navigate("/booking-detail", {
                                            state: { chef_id: chef_id },
                                        })
                                    }} />
                                </div>
                                <div className="mx-3">
                                    <p className="m-0">{booking_date}</p>
                                </div>
                            </div>

                            <div className="box_title py-2 my-2" style={{
                                background: "#FFFFFF",
                                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)", borderRadius: "15px", width: isMobile ? "95%" : "90%",
                                margin: "auto"
                            }}>

                                <div className="d-flex justify-content-between mx-3">
                                    <label className="form-label fw-bold">Timeslot Selected</label>
                                    <BiPencil size={18} style={{ cursor: "pointer" }} onClick={() => {
                                        navigate("/booking-detail", {
                                            state: { chef_id: chef_id },
                                        })
                                    }} />
                                </div>
                                <div className="mx-3">
                                    <p className="m-0">{timeslots}</p>
                                </div>
                            </div>

                            <div className="box_title py-2 my-2" style={{
                                background: "#FFFFFF",
                                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)", borderRadius: "15px", width: isMobile ? "95%" : "90%",
                                margin: "auto"
                            }}>

                                <div className="d-flex justify-content-between mx-3">
                                    <label className="form-label fw-bold">Cuisine/Diet Selected</label>
                                    <BiPencil size={18} style={{ cursor: "pointer" }} onClick={() => {
                                        navigate("/booking-detail", {
                                            state: { chef_id: chef_id },
                                        })
                                    }} />
                                </div>
                                <div className="mx-3">
                                    <p className="m-0">{food_categories_name}</p>
                                </div>
                            </div>


                            <div className="form_box" style={{ width: isMobile ? "95%" : "90%", margin: "auto" }}>
                                <div className="row my-4">
                                    <div className="col-7"><h6 className="fw-bold text-nowrap">Enter menu item number</h6></div>
                                    <div className="col-1"></div>
                                    <div className="col-4 text-center"><h6 className="fw-bold text-nowrap">Portion Size</h6></div>
                                    {menu_item.map((element, index) => {
                                        return <div className="row my-1" key={index} >
                                            <div className="col-7">
                                                <input
                                                    disabled="disabled"
                                                    type="number"
                                                    className="form-control shadow-none"
                                                    placeholder={element.item_number}
                                                    defaultValue={element.item_number}
                                                />
                                            </div>
                                            <div className="col-1"></div>
                                            <div className={isMobile ? "col-4 d-flex justify-content-end" : "col-4 d-flex justify-content-center"}>
                                                <select defaultValue={element.portion} disabled={"disabled"}>
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>
                                            </div>
                                        </div>
                                    })}
                                </div>

                                <div className="mb-3 mt-5 pt-3"  >
                                    <label htmlFor="Input" className="form-label fw-bold">Please state your allergies, if any
                                    </label>
                                    <input type="text" className="form-control shadow-none" id="allergies" style={{
                                        borderRadius: "15px", backgroundColor: "rgba(128, 128, 128,0.4)"
                                    }} placeholder="Enter Allergies" defaultValue={allergies} />
                                </div>

                                <div className="mb-3 pt-3"  >
                                    <label htmlFor="Input" className="form-label fw-bold">Do you want the chef to pick up groceries? </label>
                                    <label>Grocery delivery fees is $14.99 </label>
                                    <div className="mt-3 row ">
                                        <div key="1" className="col p-0 mx-1">
                                            <input type="radio" id="want-grocerties-yes" name="chef_grocery_pickup" onChange={() => updateGroceryPart("Yes")} className="Send_data input-hidden" value="Yes" defaultChecked={chef_grocery_pickup === "Yes"} />
                                            <label className="time-availablibilty" htmlFor="want-grocerties-yes" style={{ fontSize: "14px" }}>
                                                Yes
                                            </label>
                                        </div>
                                        <div key="2" className="col p-0 mx-1">
                                            <input type="radio" id="want-grocerties-no" name="chef_grocery_pickup" onChange={() => updateGroceryPart("No")} className="Send_data input-hidden" value="No" defaultChecked={chef_grocery_pickup === "No"} />
                                            <label className="time-availablibilty" htmlFor="want-grocerties-no" style={{ fontSize: "14px" }}>
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3"  >
                                    <label htmlFor="Input" className="form-label fw-bold">Add instructions for the Chef </label>
                                    <input type="text" className="form-control shadow-none" id="instructions_for_chef" style={{
                                        borderRadius: "15px", backgroundColor: "rgba(128, 128, 128,0.4)"
                                    }} placeholder="Enter Instructions" defaultValue={instructions_for_chef} />
                                </div>

                                <div className="box_title py-2" style={{ background: "#FFFFFF", boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)", borderRadius: "15px" }}>
                                    <h6 className="ms-3 my-2">Disclaimer 👇</h6>
                                    <ul>
                                        <li className="p-1" style={{ fontSize: "0.8rem" }}>
                                            Please keep all pots/pans ready and dishwasher empty.</li>
                                        <li className="p-1" style={{ fontSize: "0.8rem" }}>We would appreciate if any pets at home are restrained for Chef's safety</li>
                                    </ul>

                                </div>

                                <div className="accordion my-3" id="accordionExample">
                                    <div className="accordion-item  border-0 shadow-none">
                                        <h2 className="accordion-header border-0 shadow-none" id="headingOne" style={{
                                            background: "#FFFFFF",
                                            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)", borderRadius: "15px"
                                        }}>
                                            <button className="accordion-button bg-transparent border-0 shadow-none text-black" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Cancelation Policy  ❌
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body box_title" style={{
                                                background: "#FFFFFF",
                                                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)", borderRadius: "15px"
                                            }}>
                                                <p className="ms-3 my-2" style={{ fontSize: "0.8rem" }}>
                                                    <span className="fw-bold"> Scenario A: </span> If user cancels the service, 24 hours and more before the scheduled time of service, and the groceries are not picked by the private chef, user will not be charged a Cancelation fee.
                                                </p>
                                                <p className="ms-3 my-2" style={{ fontSize: "0.8rem" }}>
                                                    <span className="fw-bold"> Scenario B: </span> If user cancels the service, 24 hours and more before the scheduled time of service, and the private chef has picked the grocery, user will not be charged Cancelation fee. Instead user will be charged Grocery Pick Up and Delivery Fee of $14.99 and the user will incur Grocery Bill Reimbursement charge.
                                                </p>
                                                <p className="ms-3 my-2" style={{ fontSize: "0.8rem" }}>
                                                    <span className="fw-bold"> Scenario C: </span> If user cancels the service, with less than 24 hours for the scheduled time of service, and the groceries are not picked by the private chef yet, user will be charged a Cancelation fee of $54.99.
                                                </p>
                                                <p className="ms-3 my-2" style={{ fontSize: "0.8rem" }}>
                                                    <span className="fw-bold"> Scenario D: </span> If user cancels the service, with less than 24 hours of the scheduled time of service, and the groceries have been picked by the private chef, user will be charged a Cancelation fee of $54.99, a grocery pickup and delivery fee of $14.99 and will also incur a grocery bill reimbursement charge.
                                                </p>
                                                <p className="ms-3 my-2" style={{ fontSize: "0.8rem" }}>
                                                    <span className="fw-bold"> Scenario E: </span> If the private chef at any time decides to cancel the service scheduled, user will not be charged a Cancelation fee and neither is the Chef liable to pay a Cancelation fee.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {isMobile ? null :
                                    <>
                                        <div className="bill_title text-center" >
                                            <h6 className="fw-bold">Total Bill</h6>
                                        </div>

                                        <div className="box_title py-2 my-4 d-flex justify-content-center py-5"
                                            style={{
                                                background: "#FFFFFF", boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                                                borderRadius: "15px"
                                            }}>

                                            <table width="80%">
                                                <tbody>
                                                    <tr className="">
                                                        <td align="left" style={{ fontSize: "0.9rem" }}>Base Charge</td>
                                                        <td align="right" style={{ fontSize: "0.9rem" }}>${base_charge.toString()}</td>
                                                    </tr>
                                                    <tr className="">
                                                        <td align="left" style={{ fontSize: "0.9rem" }}>Service Fee</td>
                                                        <td align="right" style={{ fontSize: "0.9rem" }}>${service_fees}</td>
                                                    </tr>
                                                    {chef_grocery_pickup === "Yes" ? <tr className="">
                                                        <td align="left" style={{ fontSize: "0.9rem" }}>Grocery Delivery Fee</td>
                                                        <td align="right" style={{ fontSize: "0.9rem" }}>${groceryFees}</td>
                                                    </tr> : <tr></tr>}
                                                    <tr>
                                                        <td align="left" style={{ fontSize: "0.9rem" }} className="fw-bold pt-4">Total Payment After Meal Prep</td>
                                                        <td align="right" style={{ fontSize: "0.9rem" }} className="fw-bold pt-4">${totalFees}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="edit_btn mt-5 text-center">
                                            <button type="button" className="btn btn-orange rounded-pill mb-1" onClick={bookChef}
                                                style={{ width: "80%", margin: "auto" }} disabled={isSubmitting}>{isSubmitting ? (
                                                    <span className="spinner-border spinner-border-sm"></span>
                                                ) : (
                                                    ""
                                                )}{" "} Confirm Booking </button>
                                            <p style={{ fontSize: "0.8rem" }}>Grocery bill charges
                                                will be added to reimburse the chef</p>
                                        </div>
                                    </>
                                }
                            </div>
                        </form>
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>
            <Footer top={1} />
        </>
    );
}

export default BookingDetailSummary;
