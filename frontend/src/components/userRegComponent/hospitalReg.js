import React, { useState } from "react";
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
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file
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
    setAddress(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
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
    if (
      !name ||
      !email ||
      !password ||
      !confirm ||
      !phoneNumber ||
      !address ||
      !description ||
      !userType
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
      formData.append("address", address);
      formData.append("password", password);
      formData.append("user_type", userType);
      formData.append("description", description);
      formData.append("image", imageFile); // Append the image file to FormData

      const response = await fetch("http://localhost:3001/hospital/register", {
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
            <label className="signin-label">Address*</label>{" "}
            {/* New address field */}
            <input
              className="signin-input"
              value={address}
              placeholder="123 Main St, City, Country"
              onChange={handleAddressChange}
              type="text"
            />
            <label className="signin-label">description*</label>
            <input
              className="signin-input"
              value={description}
              placeholder="none"
              onChange={handleDescriptionChange}
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
            <Successful
              message={`Registered successfully!\nWelcome to pagolkhana`}
              onClose={handleShowSuccess}
            />
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
