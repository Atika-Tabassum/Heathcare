import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css";
import Profile from "./components/profilesComponent/profile";
import HospitalProfile from "./components/profilesComponent/hospital/HospitalProfile";
import Home from "./components/homeComponent/Home";
import Content from "./components/contentComponent/Content";
import UserReg from "./components/userRegComponent/userReg";
import DoctorHome from "./components/doctorComponent/DoctorHome";
import OrgMedicalCamp from "./components/doctorComponent/medicalcamp/OrgMedicalCamp";
import ViewCamp from "./components/doctorComponent/medicalcamp/ViewCamp";
import Login from "./components/loginComponent/Login";
import FindDoctor from "./components/patientComponent/FindDoctor";
import EmergencyService from "./components/patientComponent/EmergencyService";
import FindHospital from "./components/patientComponent/FindHospital";
import Notification from "./components/notificationComponent/Notification";
import CampDetails from "./components/doctorComponent/medicalcamp/campdetails";
// import Map from "./components/patientComponent/Map";

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/:userId/myprofile" element={<Profile />} />
          <Route path="/:userId/hospitalprofile" element={<HospitalProfile />} />
          <Route path="/" element={<Home />} />
          <Route path="/contents" element={<Content />} />
          <Route path="/patient/register" element={<UserReg />} />
          <Route path="/:userId/doctorHome" element={<DoctorHome />} />
          <Route path="/:userId/orgmedicalcamp" element={<OrgMedicalCamp />} />
          <Route path="/:userId/org_camps" element={<ViewCamp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/finddoctor" element={<FindDoctor />} />
          <Route path="/findhospital" element={<FindHospital />} />
          <Route path="/emergencyservice" element={<EmergencyService />} />
          <Route path="/:userId/notifications" element={<Notification />} />
          <Route path="/:campId/camp_details" element={<CampDetails />} />

        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
