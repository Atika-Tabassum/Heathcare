import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './showDonor.css'; // Import the CSS file

const ShowDonor = () => {

  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");

  useEffect(() => {
    console.log("Component mounted, fetching donors...");
    fetch("http://localhost:3001/bloodDonation/getBloodDonors")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched donors data:", data);
        setDonors(data.data);
        setFilteredDonors(data.data); 
      })
      .catch((err) => console.log("Error received", err));
  }, []);


  const handleBloodGroupChange = (event) => {
    const selectedGroup = event.target.value;
    setSelectedBloodGroup(selectedGroup);

    if (selectedGroup === "") {
      setFilteredDonors(donors); // Show all donors if no filter selected
    } else {
      const filtered = donors.filter(donor => donor.blood_group === selectedGroup);
      setFilteredDonors(filtered);
    }
  };

  return (
    <div className="show-donor-container">
      <h1>Blood Donors</h1>
      <div className="filter-container">
        <label htmlFor="bloodGroup">Choose Blood Group:</label>
        <select id="bloodGroup" value={selectedBloodGroup} onChange={handleBloodGroupChange}>
          <option value="">All</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="O+">O+</option>
          <option value="AB+">AB+</option>
          <option value="A-">A-</option>
          <option value="B-">B-</option>
          <option value="O-">O-</option>
          <option value="AB-">AB-</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact No</th>
            <th>Location</th>
            <th>Blood Group</th>
            <th>Will Donate Blood</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonors.map((donor, index) => (
            <tr key={index}>
              <td>{donor.name}</td>
              <td>{donor.email}</td>
              <td>{donor.contact_no}</td>
              <td>{donor.district_name}, {donor.upazila_name}, {donor.division_name}</td>
              <td>{donor.blood_group}</td>
              <td>{donor.will_donate_blood ? 'Available' : 'Not Available'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowDonor;
