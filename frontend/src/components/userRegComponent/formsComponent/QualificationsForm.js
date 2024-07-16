import React, { useState } from "react";
//import "../userReg.css";
import "./QualificationsForm.css";

const QualificationsForm = ({ formData, handleChange, nextStep, prevStep }) => {
  const [qualification, setQualification] = useState({
    name: "",
    institution: "",
    year_of_completion: "",
  });

  const handleAddQualification = () => {
    handleChange({
      target: {
        name: "qualifications",
        value: [...formData.qualifications, qualification],
      },
    });
    setQualification({
      name: "",
      institution: "",
      year_of_completion: "",
    });
  };

  return (
    <div className="qualifications-container">
      <h2 className="qualifications-header">Qualifications</h2>
      {formData.qualifications.map((qual, index) => (
        <div key={index} className="qualification-item">
          <p><strong>Name:</strong> {qual.name}</p>
          <p><strong>Institution:</strong> {qual.institution}</p>
          <p><strong>Year of Completion:</strong> {qual.year_of_completion}</p>
        </div>
      ))}
      <div className="label-wrap">
        <label className="signin-label">Qualification Name*</label>
        <input
          className="input-field"
          name="name"
          value={qualification.name}
          placeholder="Qualification Name"
          onChange={(e) =>
            setQualification({ ...qualification, name: e.target.value })
          }
          type="text"
        />
      </div>
      <div className="label-wrap">
        <label className="signin-label">Institution*</label>
        <input
          className="input-field"
          name="institution"
          value={qualification.institution}
          placeholder="Institution"
          onChange={(e) =>
            setQualification({ ...qualification, institution: e.target.value })
          }
          type="text"
        />
      </div>
      <div className="label-wrap">
        <label className="signin-label">Year of Completion*</label>
        <input
          className="input-field"
          name="year_of_completion"
          value={qualification.year_of_completion}
          placeholder="Year of Completion"
          onChange={(e) =>
            setQualification({ ...qualification, year_of_completion: e.target.value })
          }
          type="number"
        />
      </div>
      <button className="btn" onClick={handleAddQualification}>Add Qualification</button>
      <button className="btn" onClick={prevStep}>Back</button>
      <button className="btn" onClick={nextStep}>Next</button>
    </div>
  );
};

export default QualificationsForm;
