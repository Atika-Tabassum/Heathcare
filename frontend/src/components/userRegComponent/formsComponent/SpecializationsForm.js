
import React, { useState, useEffect } from "react";

const SpecializationsForm = ({
  formData,
  handleChange,
  availableSpecializations,
  nextStep,
  prevStep,
  handleAddSpecialization,
  handleSpecializationChange,
}) => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch("http://localhost:3001/hospitals");
        if (!response.ok) {
          throw new Error("Failed to fetch hospitals");
        }
        const data = await response.json();
        setHospitals(data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  const { specializations, newSpecialization, hospital} = formData;

  return (
    <div className="signInContainer">
      <div className="reg-form">
        <h2 className="signin-h1">Specializations</h2>
        <label className="signin-label">Specializations*</label>
        <div className="specializations-container">
          {availableSpecializations &&
            availableSpecializations.map((spec) => (
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
          name="newSpecialization"
          value={newSpecialization}
          placeholder="New Specialization"
          onChange={handleChange}
          type="text"
        />
        <button className="btn" type="button" onClick={handleAddSpecialization}>
          Add Specialization
        </button>
        <label className="signin-label">Working Hospital</label>
        <select
          className="signin-input"
          name="hospital"
          value={hospital}
          onChange={handleChange}
        >
          <option value="">Select Hospital</option>
          {hospitals.map((hosp) => (
            <option key={hosp.user_id} value={hosp.name}>
              {hosp.name}
            </option>
          ))}
        </select>
        <button className="btn" onClick={prevStep}>
          Back
        </button>
        <button className="btn" onClick={nextStep}>
          Finish
        </button>
      </div>
    </div>
  );
};

export default SpecializationsForm;
