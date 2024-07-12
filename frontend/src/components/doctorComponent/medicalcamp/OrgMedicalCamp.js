import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./OrgMedicalCamp.css"; 

const OrgMedicalCamp = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); 
  const [showDoctorsList, setShowDoctorsList] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`http://localhost:3001/doctors/${userId}/viewdoctors`);
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setDoctors(data.data);
      } else {
        console.error("Expected an array but received:", data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleDoctorClick = (user_id) => {
    if (selectedDoctor === user_id) {
      setSelectedDoctor(null);
    } else {
      setSelectedDoctor(user_id);
      console.log("selectedDoctor:", user_id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { location, date, description, selectedDoctor };

      const response = await fetch(
        `http://localhost:3001/org/${userId}/orgmedicalcamp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      console.log(data);
      navigate(`/${userId}/doctorHome`, { replace: true });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="org-medical-camp">
      <h1>Organize Medical Camp</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
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
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr
                    key={doctor.user_id}
                    onClick={() => handleDoctorClick(doctor.user_id)}
                    className={selectedDoctor === doctor.user_id ? "selected" : ""}
                  >
                    <td>{doctor.name}</td>
                    <td>{doctor.specialisation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OrgMedicalCamp;
