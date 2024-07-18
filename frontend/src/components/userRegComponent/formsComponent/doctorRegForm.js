import React, { useState, useEffect } from "react";
import "../userReg.css";
import Header from "../../general/Header";
import PersonalInfoForm from "./PersonalInfoForm";
import QualificationsForm from "./QualificationsForm";
import SpecializationsForm from "./SpecializationsForm";
import Warning from "../../Warning/Warning";
import Successful from "../../Successful/Successful";

const DoctorRegistration = () => {
  const [step, setStep] = useState(1);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [availableSpecializations, setAvailableSpecializations] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [warning, setWarning] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    division: "",
    district: "",
    upazila: "",
    unionName: "",
    wardName: "",
    villageName: "",
    streetAddress: "",
    postalCode: "",
    description: "",
    image: "",
    password: "",
    confirm: "",
    reg_no: "",
    qualifications: [],
    specializations: [],
    newSpecialization: "",
    hospital:"",
  });

  useEffect(() => {
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
      }
    };
    fetchDivisions();
  }, []);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await fetch("http://localhost:3001/doctors/specializations");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAvailableSpecializations(data);
      } catch (error) {
        console.error("Error fetching specializations:", error);
      }
    };
    fetchSpecializations();
  }, []);
  console.log(availableSpecializations);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (formData.division) {
        try {
          const response = await fetch(`http://localhost:3001/location/districts/${formData.division}`);
          if (!response.ok) {
            throw new Error("Failed to fetch districts");
          }
          const data = await response.json();
          setDistricts(data);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      } else {
        setDistricts([]);
        setFormData((prevFormData) => ({
          ...prevFormData,
          district: "",
          upazilas: [],
          upazila: "",
        }));
      }
    };
    fetchDistricts();
  }, [formData.division]);

  useEffect(() => {
    const fetchUpazilas = async () => {
      if (formData.district) {
        try {
          const response = await fetch(`http://localhost:3001/location/upazilas/${formData.district}`);
          if (!response.ok) {
            throw new Error("Failed to fetch upazilas");
          }
          const data = await response.json();
          setUpazilas(data);
        } catch (error) {
          console.error("Error fetching upazilas:", error);
        }
      } else {
        setUpazilas([]);
        setFormData((prevFormData) => ({
          ...prevFormData,
          upazila: "",
        }));
      }
    };
    fetchUpazilas();
  }, [formData.district]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const isValidPhoneNumber = (phoneNumber) => /^\d{11}$/.test(phoneNumber);

  const isValidPassword = (password) => password.length >= 8;

  const isFormValid = () => {
    if (!isValidEmail(formData.email)) {
      setWarning("Please enter a valid email address.");
      setShowWarning(true);
      return false;
    }

    if (!isValidPhoneNumber(formData.phoneNumber)) {
      setWarning("Please enter a valid phone number (11 digits).");
      setShowWarning(true);
      return false;
    }

    if (!isValidPassword(formData.password)) {
      setWarning("Password must be at least 8 characters long.");
      setShowWarning(true);
      return false;
    }

    return true;
  };

  const handleSpecializationChange = (event) => {
    const { value } = event.target;
    const { specializations } = formData;

    if (specializations.includes(value)) {
      setFormData({
        ...formData,
        specializations: specializations.filter((spec) => spec !== value),
      });
    } else {
      setFormData({
        ...formData,
        specializations: [...specializations, value],
      });
    }
  };

  const handleAddSpecialization = () => {
    if (formData.newSpecialization) {
      setAvailableSpecializations((prevSpecializations) => [
        ...prevSpecializations,
        { specialization_id: prevSpecializations.length + 1, name: formData.newSpecialization },
      ]);
      setFormData({
        ...formData,
        newSpecialization: "",
      });
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    console.log("registering doctor");
    if (!isFormValid()) {
      console.log("Form is not valid");
      return;
    }

    if (formData.password !== formData.confirm) {
      console.log("Passwords do not match");
      setWarning("Passwords must match!");
      setShowWarning(true);
      setFormData({
        ...formData,
        confirm: "",
        password: "",
      });
      return;
    }

    try {
      console.log("try block");
      const response = await fetch("http://localhost:3001/doctors/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Doctor registered successfully!");
        window.location.href = "/login";

      } else {
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error registering doctor:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="form-container">
      <div className="left-section">
        <Header />
        <h1>Doctor Registration</h1>
        <p>Register as a doctor to provide your services on our platform.</p>
      </div>
      <div className="right-section">
        <div className="form-content">
          {step === 1 && (
            <PersonalInfoForm
              formData={formData}
              handleChange={handleChange}
              divisions={divisions}
              districts={districts}
              upazilas={upazilas}
              nextStep={nextStep}
            />
          )}
          {step === 2 && (
            <QualificationsForm
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 3 && (
            <SpecializationsForm
              formData={formData}
              handleChange={handleChange}
              availableSpecializations={availableSpecializations}
              handleAddSpecialization={handleAddSpecialization}
              handleSpecializationChange={handleSpecializationChange}
              nextStep={handleSubmit} // Changed to handleSubmit for final step
              prevStep={prevStep}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistration;
