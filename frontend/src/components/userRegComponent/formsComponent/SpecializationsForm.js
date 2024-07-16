import React from "react";

const SpecializationsForm = ({
  formData,
  handleChange,
  availableSpecializations,
  nextStep,
  prevStep,
  handleAddSpecialization,
  handleSpecializationChange,
}) => {
  const { specializations, newSpecialization } = formData;

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
