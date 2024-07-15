import React, { useState, useEffect } from "react";
import "./userReg.css";
import image1 from "./regimg.svg";

import Backdrop from '../Backdrop/Backdrop';
import Warning from '../Warning/Warning';
import Successful from '../Successful/Successful';

function DoctorRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [specializations, setSpecializations] = useState([]);
  const [availableSpecializations, setAvailableSpecializations] = useState([]);
  const [newSpecialization, setNewSpecialization] = useState("");
  const [show, setShow] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warning, setWarning] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [division, setDivision] = useState(""); // New state for division
  const [district, setDistrict] = useState(""); // New state for district
  const [upazila, setUpazila] = useState(""); // New state for upazila
  const [unionName, setUnionName] = useState("");
  const [wardName, setWardName] = useState("");
  const [villageName, setVillageName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    
    fetchDivisions();
    const fetchSpecializations = async () => {
      try {
        const response = await fetch(`http://localhost:3001/doctors/specializations`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAvailableSpecializations(data);
      } catch (error) {
        console.error("Error fetching specializations:", error);
      }
    };
  
    fetchSpecializations();
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

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
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

  const isFormValid = () => {
    if (!name || !email || !password || !confirm || !phoneNumber || !division ||
      !district ||
      !upazila ||
      !unionName ||
      !wardName ||
      !villageName ||
      !streetAddress ||
      !postalCode || !description || specializations.length === 0) {
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
    try {
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

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("contact_no", phoneNumber);
      formData.append("division_id", division);
      formData.append("district_id", district);
      formData.append("upazila_id", upazila);
      formData.append("union_name", unionName);
      formData.append("ward_name", wardName);
      formData.append("village_name", villageName);
      formData.append("street_address", streetAddress);
      formData.append("postal_code", postalCode);
      formData.append("password", password);
      formData.append("description", description);
      formData.append("specializations", JSON.stringify(specializations));
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch("http://localhost:3001/doctors/register", {
        method: "POST",
        body: formData,
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

  const handleAddSpecialization = async () => {
    if (newSpecialization.trim() === "") return;

    try {
      const response = await fetch("http://localhost:3001/doctors/specializations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: newSpecialization })
      });

      if (!response.ok) {
        throw new Error("Failed to add specialization");
      }

      const addedSpecialization = await response.json();
      setAvailableSpecializations([...availableSpecializations, addedSpecialization]);
      setSpecializations([...specializations, addedSpecialization.name]);
      setNewSpecialization("");
    } catch (error) {
      console.error("Error adding specialization:", error);
      setWarning("Failed to add specialization. Please try again.");
      setShowWarning(true);
    }
  };

  const handleSpecializationChange = (e) => {
    const value = e.target.value;
    setSpecializations(prevSpecializations =>
      prevSpecializations.includes(value)
        ? prevSpecializations.filter(spec => spec !== value)
        : [...prevSpecializations, value]
    );
  };

  return (
    <>
      <br />
      <br />
      <div className="signInContainer">
        <img src={image1} className="woman" alt="" />
        <div className="reg-form">
          <h1 className="signin-h1">DOCTOR REGISTER</h1>
          <div className="flex-start">
            <label className="signin-label">Username*</label>
            <input
              className="signin-input"
              value={name}
              placeholder="Dr. John Doe"
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <br />
            <label className="signin-label">Email*</label>
            <input
              className="signin-input"
              value={email}
              placeholder="john.doe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <label className="signin-label">Phone Number*</label>
            <input
              className="signin-input"
              value={phoneNumber}
              placeholder="01XXXXXXXXX"
              onChange={(e) => setPhoneNumber(e.target.value)}
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
            <label className="signin-label">Description*</label>
            <textarea
              className="signin-input"
              value={description}
              placeholder="Brief description of your experience and qualifications"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="signin-label">Specializations*</label>
            <div className="specializations-container">
              {availableSpecializations.map((spec) => (
                <div key={spec.specialization_id} className="specialization-item">
                  <input
                    type="checkbox"
                    value={spec.name}
                    checked={specializations.includes(spec.name)}
                    onChange={handleSpecializationChange}
                  />
                  <label>{spec.name}</label>
                </div>
              ))}
            </div>
            <label className="signin-label">Add New Specialization</label>
            <input
              className="signin-input"
              value={newSpecialization}
              placeholder="New Specialization"
              onChange={(e) => setNewSpecialization(e.target.value)}
              type="text"
            />
            <button type="button" className="btn" onClick={handleAddSpecialization}>
              Add Specialization
            </button>
            <label className="signin-label">Profile Image</label>
            <input
              className="signin-input"
              type="file"
              onChange={handleImageChange}
            />
            <label className="signin-label">Password*</label>
            <input
              className="signin-input"
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
            />
            <label className="signin-label">Confirm Password</label>
            <input
              className="signin-input"
              value={confirm}
              placeholder="********"
              onChange={(e) => setConfirm(e.target.value)}
              type={show ? "text" : "password"}
            />
            <div className="label-wrap">
              <label>
                <input
                  type="checkbox"
                  checked={show}
                  onChange={() => setShow(!show)}
                />
                Show passwords
              </label>
            </div>
          </div>
          <br />
          <br />
          <button onClick={handleRegister} className="btn">
            Sign Up
          </button>
          <br />
          <div className="side-by-side">
            Already a member?&nbsp;
            <u
              onClick={() => (window.location.href = "/signin")}
              className="reg-text"
            >
              <b>Sign In</b>
            </u>
          </div>
        </div>
        {showWarning && (
          <>
            <Backdrop />
            <Warning message={warning} onClose={handleShowWarning} />
          </>
        )}
        {showSuccess && (
          <>
            <Backdrop />
            <Successful message={`Registered successfully!\nWelcome to pagolkhana`} onClose={handleShowSuccess} />
          </>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default DoctorRegistration;
