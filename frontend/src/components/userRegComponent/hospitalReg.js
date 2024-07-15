import React, { useState, useEffect } from "react";
import "./userReg.css";
import image from "./regimg.svg";
import Backdrop from "../Backdrop/Backdrop";
import Warning from "../Warning/Warning";
import Successful from "../Successful/Successful";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file
  const [division, setDivision] = useState(""); // New state for division
  const [district, setDistrict] = useState(""); // New state for district
  const [upazila, setUpazila] = useState(""); // New state for upazila
  const [unionName, setUnionName] = useState("");
  const [wardName, setWardName] = useState("");
  const [villageName, setVillageName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [show, setShow] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warning, setWarning] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchDivisions();
  }, []);

  const fetchDivisions = async () => {
    try {
      const response = await fetch("http://localhost:3001/location/divisions");
      if (!response.ok) {
        throw new Error('Failed to fetch divisions');
      }
      const data = await response.json();
      setDivisions(data);
    } catch (error) {
      console.error("Error fetching divisions:", error.message);
      // Handle error state or display a message
    }
  };
  
  const fetchDistricts = async (divisionId) => {
    // Fetch districts based on selected division
    const response = await fetch(`http://localhost:3001/location/districts?division_id=${divisionId}`);
    const data = await response.json();
    setDistricts(data);
  };

  const fetchUpazilas = async (districtId) => {
    // Fetch upazilas based on selected district
    const response = await fetch(`http://localhost:3001/location/upazilas?district_id=${districtId}`);
    const data = await response.json();
    setUpazilas(data);
  };

  const handleShowSuccess = () => {
    window.location.href = "/signin";
  };

  const handleShowWarning = () => {
    setShowWarning(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmChange = (event) => {
    setConfirm(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleDivisionChange = (event) => {
    const divisionId = event.target.value;
    setDivision(divisionId);
    fetchDistricts(divisionId);
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setDistrict(districtId);
    fetchUpazilas(districtId);
  };

  const handleUpazilaChange = (event) => {
    setUpazila(event.target.value);
  };
  const handleUnionNameChange = (event) => {
    setUnionName(event.target.value);
  };

  const handleWardNameChange = (event) => {
    setWardName(event.target.value);
  };

  const handleVillageNameChange = (event) => {
    setVillageName(event.target.value);
  };

  const handleStreetAddressChange = (event) => {
    setStreetAddress(event.target.value);
  };

  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    return /^\d{11}$/.test(phoneNumber);
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const isFormValid = () => {
    if (
      !name ||
      !email ||
      !password ||
      !confirm ||
      !phoneNumber ||
      
      !description ||
      !division ||
      !district ||
      !upazila ||
      !unionName ||
      !wardName ||
      !villageName ||
      !streetAddress ||
      !postalCode 
      
    ) {
      setWarning("Please complete all required fields.");
      setShowWarning(true);
      return false;
    }
    if (!isValidEmail(email)) {
      setWarning("Please enter a valid email address.");
      setShowWarning(true);
      return false;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setWarning("Please enter a valid phone number (11 digits).");
      setShowWarning(true);
      return false;
    }

    if (!isValidPassword(password)) {
      setWarning("Password must be at least 8 characters long.");
      setShowWarning(true);
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    if (password !== confirm) {
      setWarning("Passwords must match!");
      setShowWarning(true);
      setConfirm("");
      setPassword("");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("contact_no", phoneNumber);
     
      formData.append("password", password);
     
      formData.append("description", description);
      formData.append("image", imageFile); // Append the image file to FormData
      formData.append("division_id", division);
      formData.append("district_id", district);
      formData.append("upazila_id", upazila);
      formData.append("union_name", unionName);
      formData.append("ward_name", wardName);
      formData.append("village_name", villageName);
      formData.append("street_address", streetAddress);
      formData.append("postal_code", postalCode);

      const response = await fetch("http://localhost:3001/hospital/register", {
        method: "POST",
        body:JSON.stringify({
          name,
          email,
          contact_no: phoneNumber,
          description,
          division_id: division,
          district_id: district,
          upazila_id: upazila,
          union_name: unionName,
          ward_name: wardName,
          village_name: villageName,
          street_address: streetAddress,
          postal_code: postalCode,
          password,
          user_type: "hospital",
          image: imageFile,

          
        }),
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setShowSuccess(true);
      } else {
        setWarning(result.message || "Registration failed, please try again");
        setShowWarning(true);
      }
    } catch (error) {
      console.log(error.message);
      setWarning("An error occurred. Please try again later.");
      setShowWarning(true);
    }
  };

  return (
    <>
      <br />
      <br />
      <div className="signInContainer">
        <img src={image} className="woman" alt="" />
        <div className="reg-form">
          <h1 className="signin-h1">REGISTER</h1>
          <div className="flex-start">
            <label className="signin-label">Username*</label>
            <input
              className="signin-input"
              value={name}
              placeholder="Carla Ayala"
              onChange={handleNameChange}
              type="text"
            />
            <br />
            <label className="signin-label">Email*</label>
            <input
              className="signin-input"
              value={email}
              placeholder="carla.ayala@gmail.com"
              onChange={handleEmailChange}
              type="text"
            />
            <label className="signin-label">Phone Number*</label>
            <input
              className="signin-input"
              value={phoneNumber}
              placeholder="01XXXXXXXXX"
              onChange={handlePhoneNumberChange}
              type="text"
            />
            
            <label className="signin-label">Description*</label>
            <input
              className="signin-input"
              value={description}
              placeholder="none"
              onChange={handleDescriptionChange}
              type="text"
            />
            <label className="signin-label">Division*</label>
            <select
              className="signin-input"
              value={division}
              onChange={handleDivisionChange}
            >
              <option value="">Select Division</option>
              {divisions.map((division) => (
                <option key={division.division_id} value={division.division_id}>
                  {division.division_name}
                </option>
              ))}
            </select>
            <label className="signin-label">District*</label>
            <select
              className="signin-input"
              value={district}
              onChange={handleDistrictChange}
              disabled={!division}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </select>
            <label className="signin-label">Upazila*</label>
            <select
              className="signin-input"
              value={upazila}
              onChange={handleUpazilaChange}
              disabled={!district}
            >
              <option value="">Select Upazila</option>
              {upazilas.map((upazila) => (
                <option key={upazila.upazila_id} value={upazila.upazila_id}>
                  {upazila.upazila_name}
                </option>
              ))}
            </select>
            <label className="signin-label">Union Name*</label>
            <input
              className="signin-input"
              value={unionName}
              placeholder="Union Name"
              onChange={handleUnionNameChange}
              type="text"
            />
            <label className="signin-label">Ward Name*</label>
            <input
              className="signin-input"
              value={wardName}
              placeholder="Ward Name"
              onChange={handleWardNameChange}
              type="text"
            />
            <label className="signin-label">Village Name*</label>
            <input
              className="signin-input"
              value={villageName}
              placeholder="Village Name"
              onChange={handleVillageNameChange}
              type="text"
            />
            <label className="signin-label">Street Address*</label>
            <input
              className="signin-input"
              value={streetAddress}
              placeholder="Street Address"
              onChange={handleStreetAddressChange}
              type="text"
            />
            <label className="signin-label">Postal Code*</label>
            <input
              className="signin-input"
              value={postalCode}
              placeholder="Postal Code"
              onChange={handlePostalCodeChange}
              type="text"
            />
            <label className="signin-label">Image*</label>
            <input
              className="signin-input"
              onChange={handleImageChange}
              type="file"
              accept="image/*"
            />
            <label className="signin-label">Password*</label>
            <input
              className="signin-input"
              value={password}
              placeholder="********"
              onChange={handlePasswordChange}
              type={show ? "text" : "password"}
            />
            <label className="signin-label">Confirm Password</label>
            <input
              className="signin-input"
              value={confirm}
              placeholder="********"
              onChange={handleConfirmChange}
              type={show ? "text" : "password"}
            />
            <div className="check-btn">
              <input
                type="checkbox"
                onClick={() => {
                  setShow(!show);
                }}
              />
              <span>Show Password</span>
              <button onClick={handleRegister} className="btn1">
                REGISTER
              </button>
            </div>
          </div>
        </div>
        {showWarning && <Warning message={warning} close={handleShowWarning} />}
        {showSuccess && (
          <Successful message="Registration successful!" close={handleShowSuccess} />
        )}
      </div>
    </>
  );
}

export default Registration;
