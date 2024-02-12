import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Vector from "../images/Vector.jpg";
import $ from "jquery";
import { FiUpload } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";
import { isMobile } from "react-device-detect";
import { MdOutlineCancel } from "react-icons/md";
import { callErrorApi } from '../errorHandle/callErrorApi';

function ProfileChef(props) {
  // file upload state
  const [profilePic, setProfilePic] = useState(null);
  const [displayMenu, setDisplayMenu] = useState(null);
  const [menuImageVisible, setFoodImageVisible] = useState([]);
  const [menu, setMenu] = useState(null);
  const [food, setFood] = useState(null);
  const [email, setEmail] = useState(null);
  const [fileName, setfileName] = useState("");
  let navigate = useNavigate();
  const [diets, setDiets] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [credentials, setCredentials] = useState({
    address: localStorage.getItem("address"),
    aboutChef: "",
    city: localStorage.getItem("city"),
  });
  function removeItemOnce(arr, value) {
    setFoodImageVisible(menuImageVisible.filter(item => item !== value))
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const updateDiets = async () => {
    try {
      let data = await fetch(
        `${process.env.REACT_APP_BASE_URL}general/categories`
      );
      let parsedData = await data.json();
      setDiets(parsedData.data);
    } catch (error) {
      callErrorApi(`catch_error: ${process.env.REACT_APP_BASE_URL}general/categories`, email, error);
    }
  };
  let role = props.customer ? "1" : "2";
  const { state } = useLocation();
  useEffect(() => {
    var title = `Complete Profile | CHEF REPUBLIC`;
    var desc = "Create Chef Profile: Create and Update your Chef Profile by selecting the diets and cuisine you are interested in cooking and updating your menu and pictures of your meal prep."
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

    if (role && (role === null || role !== "2")) {
      navigate("/chef/sign-in");
      window.location.reload();
    }
    if (state === null || state === undefined) {
      navigate("/sign-in")
      window.location.reload()
    }
    const { email } = state;
    setEmail(email)
    updateDiets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const updateList = (file_imp) => {
    let objectURL;
    for (var i = 0; i < file_imp.length; ++i) {
      objectURL = URL.createObjectURL(file_imp[i])
      menuImageVisible.push(objectURL)
      setFoodImageVisible(menuImageVisible)
    }
  }

  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };
  const handleClick1 = () => {
    inputRef1.current.click();
  };
  const handleClick2 = () => {
    inputRef2.current.click();
  };
  function showFilemenu() {
    $("#showFilemenu").hide()
    $("#Filemenuimpit").removeClass("d-none")
    $("#Filemenuimpit").addClass("d-flex")
  }
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setProfilePic(event.target.files[0]);
    event.target.value = null;
    toBase64(fileObj).then((data) => {
      $("#imgUpload").attr("src", data);
    });
  };
  const validateFoodFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    if (event.target.files.length > 5) {
      event.target.value = null;
      alert("Maximum 5 food picture you can upload");
      while (menuImageVisible.length > 0) {
        menuImageVisible.pop();
      }
    } else {
      let file_arr = []
      updateList(event.target.files)
      for (var n = 0; n < event.target.files.length; n++) {
        file_arr.push(event.target.files[n]);
      }
      setFood(file_arr);
      event.target.value = null;
    }
  };
  const validateMenuFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setMenu(event.target.files[0]);
    setfileName(event.target.files[0].name)
    var files_menu = URL.createObjectURL(event.target.files[0])
    setDisplayMenu(files_menu)
    $("#Filemenuimpit").addClass("d-none")
    $("#Filemenuimpit").removeClass("d-flex")
    event.target.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      var yourArray = [];
      $("input:checkbox[name=diet-menu]:checked").each(function () {
        yourArray.push($(this).val());
      });
      var monday = [];
      $("input:checkbox[name=monday]:checked").each(function () {
        monday.push($(this).val());
      });
      var tuesday = [];
      $("input:checkbox[name=tuesday]:checked").each(function () {
        tuesday.push($(this).val());
      });
      var wednesday = [];
      $("input:checkbox[name=wednesday]:checked").each(function () {
        wednesday.push($(this).val());
      });
      var thursday = [];
      $("input:checkbox[name=thursday]:checked").each(function () {
        thursday.push($(this).val());
      });
      var friday = [];
      $("input:checkbox[name=friday]:checked").each(function () {
        friday.push($(this).val());
      });
      var saturday = [];
      $("input:checkbox[name=saturday]:checked").each(function () {
        saturday.push($(this).val());
      });
      var sunday = [];
      $("input:checkbox[name=sunday]:checked").each(function () {
        sunday.push($(this).val());
      });

      if (!profilePic) {
        alert("Please upload your profile Pic");
        setIsSubmitting(false);
        return false;
      }
      else if (!credentials.address) {
        alert("Please add your Address");
        setIsSubmitting(false);
        return false;
      }
      else if (!credentials.city) {
        alert("Please add your city");
        setIsSubmitting(false);
        return false;
      }
      else if (!credentials.aboutChef) {
        alert("Please add about yourself");
        setIsSubmitting(false);
        return false;
      }
      else if (yourArray.length === 0) {
        alert("Please add Food Category");
        setIsSubmitting(false);
        return false;
      }
      else if (!food) {
        alert("Please upload some Food Images");
        setIsSubmitting(false);
        return false;
      }
      else if (!menu) {
        alert("Please upload Food Menu");
        setIsSubmitting(false);
        return false;
      }
      else if (
        !monday ||
        !tuesday ||
        !wednesday ||
        !thursday ||
        !friday ||
        !saturday ||
        !sunday
      ) {
        alert("Please add your Availability Time");
        setIsSubmitting(false);
        return false;
      } else {
        var myHeaders = new Headers();
        var formdata = new FormData();
        formdata.append("profile_photo", profilePic);
        formdata.append("address", credentials.address);
        formdata.append("food_categories", yourArray.join(","));
        formdata.append("about", credentials.aboutChef);
        formdata.append("menu", menu);
        if (food) {
          for (var n = 0; n < food.length; n++) {
            formdata.append("food_pictures[]", food[n]);
          }
        } else {
          formdata.append("food_pictures", []);
        }
        formdata.append("city", credentials.city);
        formdata.append("email", email);
        formdata.append(
          "availability_time",
          JSON.stringify({
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday,
          })
        );
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}user/update_chef_details_first_time`,
          requestOptions
        );
        const res_json = await response.text();
        const data = JSON.parse(res_json);
        if (data.status === true) {
          localStorage.removeItem("address");
          setIsSubmitting(false);
          navigate("/under-review");
        } else {
          callErrorApi(`response_error: ${process.env.REACT_APP_BASE_URL}user/update_chef_details_first_time `, email, data);
          setIsSubmitting(false);
        }
      }
    } catch (error) {
      callErrorApi(`catch_error: ${process.env.REACT_APP_BASE_URL}user/update_chef_details_first_time`, email, error);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Nav customer={props.customer} />
      <div
        className="container d-flex align-items-center flex-column"
        style={{ marginTop: "70px", marginBottom: "35px" }}
      >
        <h4 className="fw-bolder pb-2">Hello {localStorage.getItem("user_name")}!</h4>
        <div
          className="card container d-flex align-items-center justify-content-center"
          style={{
            maxWidth: "650px",
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
            border: "none",
            borderRadius: "20px",
          }}
        >
          <div style={{ width: "300px" }}>
            <h6 className="text-center my-3 py-3">
              Build an attractive profile that impresses customers
            </h6>
          </div>
          <form
            id="profile-chef-complete"
            className="align-items-center d-flex flex-column"
            onSubmit={handleSubmit}
          >
            <div className="profile-img">
              <div
                className="d-flex align-items-center justify-content-center mb-4"
                style={{}}
              >
                <img
                  src={Vector}
                  alt=""
                  id="imgUpload"
                  style={{
                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                    width: "120px",
                    height: "120px",
                    padding: "10px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div
                className="add-media d-flex align-items-center justify-content-center"
                onClick={handleClick}
                style={{
                  position: "absolute",
                  right: isMobile ? "34%" : "41%",
                  top: "190px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  height: "40px",
                  width: "40px",
                  boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                }}
              >
                <FaPencilAlt />
                <input
                  style={{ display: "none" }}
                  ref={inputRef}
                  type="file"
                  name="profilePic"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="my-2">
              <input
                type="text"
                className="form-control shadow-none"
                value={credentials.address}
                onChange={onChange}
                name="address"
                style={{ maxWidth: "350px", minWidth: "300px" }}
                placeholder="Enter your Home Address"
              />
            </div>
            <div className="my-2">
              <input
                type="text"
                className="form-control shadow-none"
                value={credentials.city}
                onChange={onChange}
                name="city"
                style={{ maxWidth: "350px", minWidth: "300px" }}
                placeholder="Enter your City"
              />
            </div>
            <div className="my-2">
              <input
                type="text"
                className="form-control shadow-none"
                value={credentials.aboutChef}
                onChange={onChange}
                name="aboutChef"
                style={{ maxWidth: "350px", minWidth: "300px" }}
                placeholder="About Me"
              />
            </div>
            <hr style={{ border: "1px solid grey", width: "80%" }} />
            <h6
              style={{
                width: "280px",
                textAlign: "center",
                fontWeight: "700",
                lineHeight: "26px",
                fontSize: "0.9rem",
              }}
            >
              Please select cuisine and diet type you are comfortable cooking
            </h6>
            <div className="row" style={{ width: "95%" }}>
              {diets.map((element, index) => {
                return (
                  <div className="col-6 col-md-4 my-2" key={index}>
                    <input
                      type="checkbox"
                      id={"card-" + element.id.toString()}
                      value={element.id}
                      name="diet-menu"
                      className="Send_data input-hidden"
                    />
                    <label
                      className="time-availablibilty-card"
                      htmlFor={"card-" + element.id.toString()}
                      style={{
                        backgroundImage: `url(${element.category_image})`,
                      }}
                    >
                      {element.category_name}
                    </label>
                  </div>
                );
              })}
            </div>
            <hr style={{ border: "1px solid grey", width: "80%" }} />
            <h6
              style={{
                width: "280px",
                textAlign: "center",
                fontWeight: "700",
                lineHeight: "26px",
                fontSize: "0.9rem",
              }}
            >
              Upload your food pictures
            </h6>
            <h6
              style={{
                width: "280px",
                textAlign: "center",
                fontWeight: "500",
                lineHeight: "26px",
                fontSize: "0.8rem",
              }}
            >
              Only upload 5 photos of food items that you have cooked
            </h6>
            <div className="row" style={{ width: "90%" }}>
              {menuImageVisible.length > 0 ? menuImageVisible.map((element, index) => {
                return <>
                  <div key={index} className={`col-4 m-2 p-2 img-${index}`} style={{ position: "relative" }} onClick={() => removeItemOnce(menuImageVisible, element)}>
                    <div className="d-flex justify-content-center align-items-center" style={{ position: "absolute", right: "1%", cursor: "pointer", color: "white", backgroundColor: "rgba(52, 52, 52, 0.9)", borderRadius: "50%" }}><MdOutlineCancel style={{ fontSize: "1.2rem" }} /></div>
                    <img src={element} style={{ width: "100%" }} alt="" />
                  </div>
                </>
              }) : null}
            </div>
            <div
              className={menuImageVisible.length < 5 ? "add-media d-flex align-items-center justify-content-center flex-column" : "d-none"}
              onClick={handleClick1}
              style={{
                cursor: "pointer",
                width: "319px",
                height: "147px",
                background: "#FFDFD9",
                borderRadius: "20px",
              }}
            >
              <FiUpload style={{ color: "#FF5E41", fontSize: "1.25rem" }} />
              <h6 style={{ fontSize: "0.9rem", paddingTop: "10px" }}>
                {" "}
                Upload Photos
              </h6>
              <input
                style={{ display: "none" }}
                ref={inputRef1}
                type="file"
                accept="image/*"
                multiple="multiple"
                onChange={validateFoodFileChange}
              />
            </div>
            <hr style={{ border: "1px solid grey", width: "80%" }} />
            <h6
              style={{
                width: "280px",
                textAlign: "center",
                fontWeight: "700",
                lineHeight: "26px",
                fontSize: "0.9rem",
              }}
            >
              Upload you menu
            </h6>
            <h6
              style={{
                width: "280px",
                textAlign: "center",
                fontWeight: "500",
                lineHeight: "26px",
                fontSize: "0.8rem",
              }}
            >
              People can see your menu and order items through the app
            </h6>
            {displayMenu ? (displayMenu.includes("blob:http") ? <div className="text-center d-flex justify-content-center flex-column" style={{ width: "90%" }}>
              <p className="text-center text-break">{fileName}</p>  <p className="text-center" style={{ color: "red" }} onClick={() => { setDisplayMenu(null); showFilemenu() }}>Remove</p>
            </div> : <div id="showFilemenu" style={{ position: "relative" }} onClick={showFilemenu}>
              <div className="d-flex justify-content-center align-items-center" style={{ position: "absolute", right: "1%", cursor: "pointer", color: "white", backgroundColor: "rgba(52, 52, 52, 0.9)", borderRadius: "50%" }}><MdOutlineCancel style={{ fontSize: "1.2rem" }} /></div>
              {/* <iframe title={'menu'} src={displayMenu}></iframe> */}
              <object data={displayMenu} type="application/pdf">
                <iframe title={'menu'} src={"https://docs.google.com/viewer?url=" + displayMenu + "&embedded=true"} />
              </object>
            </div>) : null}
            <div
              id="Filemenuimpit"
              className="add-media d-flex align-items-center justify-content-center flex-column"
              onClick={handleClick2}
              style={{
                cursor: "pointer",
                width: "319px",
                height: "147px",
                background: "#FFDFD9",
                borderRadius: "20px",
              }}
            >
              <FiUpload style={{ color: "#FF5E41", fontSize: "1.25rem" }} />
              <h6 style={{ fontSize: "0.9rem", paddingTop: "10px" }}>
                {" "}
                Upload Menu
              </h6>
              <input
                style={{ display: "none" }}
                ref={inputRef2}
                type="file"
                accept="application/pdf"
                onChange={validateMenuFileChange}
              />
            </div>
            <hr style={{ border: "1px solid grey", width: "80%" }} />
            <h6
              style={{
                width: "280px",
                textAlign: "center",
                fontWeight: "700",
                lineHeight: "26px",
                fontSize: "0.9rem",
              }}
            >
              Update your availability for users to see and select
            </h6>
            <div className="row" style={{ width: "95%" }}>
              <div className="col-sm-6 col-md-6 my-2">
                <h6 style={{ fontSize: "16px", fontWeight: "400" }}>Monday</h6>
                <div className="d-flex justify-content-evenly">
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-8-monday"
                      name="monday"
                      className="Send_data input-hidden"
                      value="8am-11am"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-8-monday"
                    >
                      8am-11am
                    </label>
                  </div>
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-12-monday"
                      name="monday"
                      className="Send_data input-hidden"
                      value="12pm-3pm"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-12-monday"
                    >
                      12pm-3pm
                    </label>
                  </div>
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-4-monday"
                      name="monday"
                      className="Send_data input-hidden"
                      value="4pm-7pm"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-4-monday"
                    >
                      4pm-7pm
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 my-2">
                <h6 style={{ fontSize: "16px", fontWeight: "400" }}>Tuesday</h6>
                <div className="d-flex justify-content-evenly">
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-8-tuesday"
                      name="tuesday"
                      className="Send_data input-hidden"
                      value="8am-11am"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-8-tuesday"
                    >
                      8am-11am
                    </label>
                  </div>
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-12-tuesday"
                      name="tuesday"
                      className="Send_data input-hidden"
                      value="12pm-3pm"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-12-tuesday"
                    >
                      12pm-3pm
                    </label>
                  </div>
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-4-tuesday"
                      name="tuesday"
                      className="Send_data input-hidden"
                      value="4pm-7pm"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-4-tuesday"
                    >
                      4pm-7pm
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 my-2">
                <h6 style={{ fontSize: "16px", fontWeight: "400" }}>
                  Wednesday
                </h6>
                <div className="d-flex justify-content-evenly">
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-8-wednesday"
                      name="wednesday"
                      className="Send_data input-hidden"
                      value="8am-11am"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-8-wednesday"
                    >
                      8am-11am
                    </label>
                  </div>
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-12-wednesday"
                      name="wednesday"
                      className="Send_data input-hidden"
                      value="12pm-3pm"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-12-wednesday"
                    >
                      12pm-3pm
                    </label>
                  </div>
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-4-wednesday"
                      name="wednesday"
                      className="Send_data input-hidden"
                      value="4pm-7pm"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-4-wednesday"
                    >
                      4pm-7pm
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 my-2">
                <h6 style={{ fontSize: "16px", fontWeight: "400" }}>
                  Thursday
                </h6>
                <div className="d-flex justify-content-evenly">
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-8-thursday"
                      name="thursday"
                      className="Send_data input-hidden"
                      value="8am-11am"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-8-thursday"
                    >
                      8am-11am
                    </label>
                  </div>
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-12-thursday"
                      name="thursday"
                      className="Send_data input-hidden"
                      value="12pm-3pm"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-12-thursday"
                    >
                      12pm-3pm
                    </label>
                  </div>
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-4-thursday"
                      name="thursday"
                      className="Send_data input-hidden"
                      value="4pm-7pm"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-4-thursday"
                    >
                      4pm-7pm
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 my-2">
                <h6 style={{ fontSize: "16px", fontWeight: "400" }}>Friday</h6>
                <div className="d-flex justify-content-evenly">
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-8-friday"
                      name="friday"
                      className="Send_data input-hidden"
                      value="8am-11am"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-8-friday"
                    >
                      8am-11am
                    </label>
                  </div>
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-12-friday"
                      name="friday"
                      className="Send_data input-hidden"
                      value="12pm-3pm"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-12-friday"
                    >
                      12pm-3pm
                    </label>
                  </div>
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-4-friday"
                      name="friday"
                      className="Send_data input-hidden"
                      value="4pm-7pm"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-4-friday"
                    >
                      4pm-7pm
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 my-2">
                <h6 style={{ fontSize: "16px", fontWeight: "400" }}>
                  Saturday
                </h6>
                <div className="d-flex justify-content-evenly">
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-8-saturday"
                      name="saturday"
                      className="Send_data input-hidden"
                      value="8am-11am"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-8-saturday"
                    >
                      8am-11am
                    </label>
                  </div>
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-12-saturday"
                      name="saturday"
                      className="Send_data input-hidden"
                      value="12pm-3pm"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-12-saturday"
                    >
                      12pm-3pm
                    </label>
                  </div>
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-4-saturday"
                      name="saturday"
                      className="Send_data input-hidden"
                      value="4pm-7pm"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-4-saturday"
                    >
                      4pm-7pm
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 my-2">
                <h6 style={{ fontSize: "16px", fontWeight: "400" }}>Sunday</h6>
                <div className="d-flex justify-content-evenly">
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-8-sunday"
                      name="sunday"
                      className="Send_data input-hidden"
                      value="8am-11am"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-8-sunday"
                    >
                      8am-11am
                    </label>
                  </div>
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-12-sunday"
                      name="sunday"
                      className="Send_data input-hidden"
                      value="12pm-3pm"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-12-sunday"
                    >
                      12pm-3pm
                    </label>
                  </div>
                  <div className="col-md-4 p-0 mx-1">
                    <input
                      type="checkbox"
                      id="radiobtn-4-sunday"
                      name="sunday"
                      className="Send_data input-hidden"
                      value="4pm-7pm"
                    />
                    <label
                      className="time-availablibilty"
                      htmlFor="radiobtn-4-sunday"
                    >
                      4pm-7pm
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-orange my-4"
              style={{ width: "300px" }}
            >
              {isSubmitting ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                ""
              )}{" "}
              Create Profile
            </button>
          </form>
        </div>
      </div>
      <Footer top={1} />
    </>
  );
}

export default ProfileChef;
