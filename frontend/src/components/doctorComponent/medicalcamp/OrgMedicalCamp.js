import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../general/Header";
import img1 from "../../homeComponent/about-us.svg";
import img2 from "../../homeComponent/contact-us.svg";
import "./OrgMedicalCamp.css";

const OrgMedicalCamp = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [division, setDivision] = useState(""); // New state for division
  const [district, setDistrict] = useState(""); // New state for district
  const [upazila, setUpazila] = useState(""); // New state for upazila
  const [doctors, setDoctors] = useState([]);
  const [unionName, setUnionName] = useState("");
  const [wardName, setWardName] = useState("");
  const [villageName, setVillageName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [showDoctorsList, setShowDoctorsList] = useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    fetchDivisions();
    fetchDoctors();
  }, []);

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

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };


  const fetchDoctors = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/doctors/${userId}/viewdoctors`
      );
      const data = await response.json();
      if (Array.isArray(data.data)) {
        // Add a selected property to each doctor object
        const doctorsWithSelection = data.data.map((doctor) => ({
          ...doctor,
          selected: false,
        }));
        setDoctors(doctorsWithSelection);
      } else {
        console.error("Expected an array but received:", data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchDivisions = async () => {
    try {
      const response = await fetch("http://localhost:3001/location/divisions");
      if (!response.ok) {
        throw new Error("Failed to fetch divisions");
      }
      const data = await response.json();
      setDivisions(data);
    } catch (error) {
      console.error("Error fetching divisions:", error.message);
      // Handle error state or display a message
    }
  };

  const fetchDistricts = async (divisionId) => {
    try {
      const intDivisionId = parseInt(divisionId, 10); // Convert to integer
      const response = await fetch(
        `http://localhost:3001/location/districts/${intDivisionId}`
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `Failed to fetch districts: ${response.statusText}. Response: ${text}`
        );
      }

      const data = await response.json();
      setDistricts(data);
    } catch (error) {
      console.error("Error fetching districts:", error.message);
    }
  };

  const fetchUpazilas = async (districtId) => {
    // Fetch upazilas based on selected district
    const intdistrictId = parseInt(districtId, 10); // Convert to integer
    const response = await fetch(
      `http://localhost:3001/location/upazilas/${intdistrictId}`
    );
    const data = await response.json();
    setUpazilas(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedDoctorIds = selectedDoctors.map((doctor) => doctor.user_id);
      const formData = new FormData();
      formData.append("division", division);
      formData.append("district", district);
      formData.append("upazila", upazila);
      formData.append("unionName", unionName);
      formData.append("wardName", wardName);
      formData.append("villageName", villageName);
      formData.append("streetAddress", streetAddress);
      formData.append("postalCode", postalCode);
      formData.append(
        "date",
        date ? date : new Date().toISOString().split("T")[0]
      );
      formData.append("description", description);
      formData.append("selectedDoctors", JSON.stringify(selectedDoctorIds));
      if (image) {
        formData.append("image", image);
      }
      const response = await fetch(
        `http://localhost:3001/org/${userId}/orgmedicalcamp`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      navigate(`/${userId}/doctorHome`, { replace: true });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDivisionChange = (event) => {
    const divisionId = event.target.value;
    setDivision(divisionId);
    fetchDistricts(divisionId);
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setDistrict(districtId);
    console.log(upazilas);
    fetchUpazilas(districtId);
  };

  const handleUpazilaChange = (event) => {
    setUpazila(event.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDoctorClick = (doctorId) => {
    const updatedDoctors = doctors.map((doctor) =>
      doctor.user_id === doctorId
        ? { ...doctor, selected: !doctor.selected }
        : doctor
    );
    setDoctors(updatedDoctors);
    const updatedSelectedDoctors = updatedDoctors.filter(
      (doctor) => doctor.selected
    );
    setSelectedDoctors(updatedSelectedDoctors);
  };

  return (
    <Fragment>
      <Header />
      <navbar className="navbar">
        <div className="navbar-icons">
          <img src={img2} alt="contact us" className="contact-us-icon" />
          <div className="tool-tip">Contact Us</div>
        </div>
      </navbar>
      <navbar className="navbar2">
        <div className="bottom-icon">
          <img src={img1} alt="about us" className="about-us-icon" />
          <div className="tool-tip">About Us</div>
        </div>
      </navbar>
      <div className="page-container">
        <div className="page-content"></div>
        <h1>Organize Medical Camp</h1>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="division">Division:</label>
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
          </div>
          <div className="form-group">
            <label htmlFor="district">District:</label>
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
          </div>
          <div className="form-group">
            <label htmlFor="upazila">Upazila:</label>
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
          </div>
          <div className="form-group">
            <label htmlFor="unionName">Union Name:</label>
            <input
              type="text"
              id="unionName"
              name="unionName"
              value={unionName}
              onChange={handleUnionNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="wardName">Ward Name:</label>
            <input
              type="text"
              id="wardName"
              name="wardName"
              value={wardName}
              onChange={handleWardNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="villageName">Village Name:</label>
            <input
              type="text"
              id="villageName"
              name="villageName"
              value={villageName}
              onChange={handleVillageNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="streetAddress">Street Address:</label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={streetAddress}
              onChange={handleStreetAddressChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={postalCode}
              onChange={handlePostalCodeChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={handleDateChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              onClick={() => setShowDoctorsList(!showDoctorsList)}
            >
              {showDoctorsList ? "Hide Doctors List" : "Invite More Doctors"}
            </button>
          </div>
          {showDoctorsList && (
            <div className="doctors-table-container">
              <table className="doctors-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Specialization</th>
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doctor) => (
                    <tr
                      key={doctor.user_id}
                      onClick={() => handleDoctorClick(doctor.user_id)}
                      className={doctor.selected ? "selected" : ""}
                    >
                      <td>{doctor.name}</td>
                      <td>{doctor.specialisation}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={doctor.selected}
                          onChange={() => handleDoctorClick(doctor.user_id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

export default OrgMedicalCamp;
