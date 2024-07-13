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

  useEffect(() => {
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

  const isFormValid = () => {
    if (!name || !email || !password || !confirm || !phoneNumber || !address || !description || specializations.length === 0) {
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
      formData.append("address", address);
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
            <label className="signin-label">Address*</label>
            <input
              className="signin-input"
              value={address}
              placeholder="123 Main St, City, Country"
              onChange={(e) => setAddress(e.target.value)}
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
