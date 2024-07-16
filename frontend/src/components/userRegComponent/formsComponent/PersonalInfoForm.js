import React, { useState } from "react";

const PersonalInfoForm = ({
  formData,
  handleChange,
  divisions,
  districts,
  upazilas,
  nextStep,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <div className="signInContainer">
      <div className="reg-form">
        <h2 className="signin-h1">Personal Information</h2>
        <form>
          <div className="label-wrap">
            <label className="signin-label">Name:</label>
            <input
              className="signin-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="label-wrap">
            <label className="signin-label">Email:</label>
            <input
              className="signin-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="label-wrap">
            <label className="signin-label">Phone Number:</label>
            <input
              className="signin-input"
              type="number"
              name="phoneNumber"
              value={parseInt(formData.phoneNumber)}
              onChange={handleChange}
            />
          </div>
          <div className="label-wrap">
            <label className="signin-label">Division:</label>
            <select
              className="signin-input"
              name="division"
              value={formData.division}
              onChange={handleChange}
            >
              <option value="">Select Division</option>
              {divisions.map((division) => (
                <option key={division.division_id} value={division.division_id}>
                  {division.division_name}
                </option>
              ))}
            </select>
          </div>
          <div className="label-wrap">
            <label className="signin-label">District:</label>
            <select
              className="signin-input"
              name="district"
              value={formData.district}
              onChange={handleChange}
              disabled={!formData.division}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </select>
          </div>
          <div className="label-wrap">
            <label className="signin-label">Upazila:</label>
            <select
              className="signin-input"
              name="upazila"
              value={formData.upazila}
              onChange={handleChange}
              disabled={!formData.district}
            >
              <option value="">Select Upazila</option>
              {upazilas.map((upazila) => (
                <option key={upazila.upazila_id} value={upazila.upazila_id}>
                  {upazila.upazila_name}
                </option>
              ))}
            </select>
          </div>
          <div className="label-wrap">
            <label className="signin-label">Union Name:</label>
            <input
              className="signin-input"
              type="text"
              name="unionName"
              value={formData.unionName}
              onChange={handleChange}
            />
          </div>
          <div className="label-wrap">
            <label className="signin-label">Ward Name:</label>
            <input
              className="signin-input"
              type="text"
              name="wardName"
              value={formData.wardName}
              onChange={handleChange}
            />
          </div>
          <div className="label-wrap">
            <label className="signin-label">Village Name:</label>
            <input
              className="signin-input"
              type="text"
              name="villageName"
              value={formData.villageName}
              onChange={handleChange}
            />
          </div>
          <div className="label-wrap">
            <label className="signin-label">Street Address:</label>
            <input
              className="signin-input"
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
            />
          </div>
          <div className="label-wrap">
            <label className="signin-label">Postal Code:</label>
            <input
              className="signin-input"
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>
          <div className="label-wrap">
            <label className="signin-label">Description:</label>
            <textarea
              className="signin-input"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="label-wrap">
            <label className="signin-label">Password:</label>
            <div className="password-container">
              <input
                className="signin-input password-input"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} password-icon`}
                onClick={toggleShowPassword}
              />
            </div>
          </div>
          <div className="label-wrap">
            <label className="signin-label">Confirm Password:</label>
            <div className="password-container">
              <input
                className="signin-input password-input"
                type={showConfirmPassword ? "text" : "password"}
                name="confirm"
                value={formData.confirm}
                onChange={handleChange}
              />
              <i
                className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} password-icon`}
                onClick={toggleShowConfirmPassword}
              />
            </div>
          </div>
          <div className="label-wrap">
            <label className="signin-label">Registration Number:</label>
            <input
              className="signin-input"
              type="text"
              name="reg_no"
              value={formData.reg_no}
              onChange={handleChange}
            />
          </div>
          <button type="button" className="btn" onClick={nextStep}>
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
