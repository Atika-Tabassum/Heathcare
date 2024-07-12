import React, { useState } from "react";
import "./userReg.css";
import image from "./regimg.svg"

import Backdrop from '../Backdrop/Backdrop';
import Warning from '../Warning/Warning';
import Successful from '../Successful/Successful';

// import photo from "./photo.jpg"; // Import a placeholder photo

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState(""); // New address state
  const [medicalHistory, setMedicalHistory] = useState("");
  const [show, setShow] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warning, setWarning] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleAddressChange = (event) => {
    setAddress(event.target.value); // Handle address change
  };

  const handleMedicalHistoryChange = (event) => {
    setMedicalHistory(event.target.value);
  };

  const userType = "patient";

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
    if (!name || !email || !password || !confirm || !phoneNumber || !address || !medicalHistory || !userType) {
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

      const response = await fetch("http://localhost:3001/patient/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          contact_no: phoneNumber,
          address, // Include address in the request
          password,
          user_type: userType,
          medical_history: medicalHistory,
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
            <label className="signin-label">Address*</label> {/* New address field */}
            <input
              className="signin-input"
              value={address}
              placeholder="123 Main St, City, Country"
              onChange={handleAddressChange}
              type="text"
            />
            <label className="signin-label">Medical History*</label>
            <input
              className="signin-input"
              value={medicalHistory}
              placeholder="No known allergies"
              onChange={handleMedicalHistoryChange}
              type="text"
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

export default Registration;
