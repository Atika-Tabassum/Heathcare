import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/profile";
import Home from "./components/homeComponent/Home";
import Content from "./components/contentComponent/Content";
import UserReg from "./components/userRegComponent/userReg";
import DoctorHome from "./components/doctorComponent/DoctorHome";
import OrgMedicalCamp from "./components/doctorComponent/medicalcamp/OrgMedicalCamp";
import ViewCamp from "./components/doctorComponent/medicalcamp/ViewCamp";
import Login from "./components/loginComponent/Login";
import FindDoctor from "./components/patientComponent/FindDoctor";
import FindHospital from "./components/patientComponent/FindHospital";
import EmergencyService from "./components/patientComponent/EmergencyService";
import Notification from "./components/notificationComponent/Notification";
import CampDetails from "./components/doctorComponent/medicalcamp/campdetails";
import FindAmbulance from "./components/patientComponent/FindAmbulance";
import AmbulanceHomepage from "./components/ambulanceComponent/ambulanceHomepage";
import BookAmbulance from "./components/ambulanceComponent/bookAmbulance";

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/:userId/myprofile" element={<Profile />} />
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
          <Route path="/emergency" element={<EmergencyService />} />
          <Route path="/:userId/notifications" element={<Notification />} />
          <Route path="/:campId/camp_details" element={<CampDetails />} />
          <Route
            path="/findambulance/:patientUserId/:hospitalUserId"
            element={<FindAmbulance />}
          />
          <Route path="/ambulanceHomepage" element = {<AmbulanceHomepage />}/>
          <Route path="/bookambulance" element={<BookAmbulance />} /> // add this line
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
