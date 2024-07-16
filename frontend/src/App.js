import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './components/profilesComponent/profile';
import Home from './components/homeComponent/Home';
import Login from './components/loginComponent/Login';
import FindDoctor from './components/patientComponent/FindDoctor';
import FindHospital from './components/patientComponent/FindHospital';
import EmergencyService from './components/patientComponent/EmergencyService';

import Content from './components/contentComponent/Content';
import UserReg from './components/userRegComponent/userReg';
import HospitalReg from './components/userRegComponent/hospitalReg';
import DoctorReg from './components/userRegComponent/formsComponent/doctorRegForm';
import DoctorHome from './components/doctorComponent/DoctorHome';
import OrgMedicalCamp from './components/doctorComponent/medicalcamp/OrgMedicalCamp';
import ViewCamp from './components/doctorComponent/medicalcamp/ViewCamp';

import HospitalProfile from "./components/profilesComponent/hospital/HospitalProfile";
import Notification from "./components/notificationComponent/Notification";
import CampDetails from "./components/doctorComponent/medicalcamp/campdetails";
import FindAmbulance from "./components/patientComponent/FindAmbulance";
import AmbulanceHomepage from "./components/ambulanceComponent/ambulanceHomepage";
import BookAmbulance from "./components/ambulanceComponent/bookAmbulance";
import DoctorProfile from "./components/profilesComponent/doctor/DoctorProfile";
import Map from "./components/patientComponent/Map";
import Chats from './components/chatComponent/chats';
import MediCampDetails from './components/patientComponent/MediCampDetails';

import Appointment from './components/doctorComponent/appointment';
import ChatPreview from './components/chatComponent/chatPreview';
import BlogList from './components/blogComponent/blogList';
import BlogPost from './components/blogComponent/blogPost';
import NewPost from './components/blogComponent/newPost';

function App() {
  return (

    <Router>
      <Fragment>
        <Routes>
          <Route path="/:userId/myprofile" element={<Profile />} />
          <Route path="/:userId/hospitalprofile" element={<HospitalProfile />} />
          <Route path="/:userId/doctorprofile" element={<DoctorProfile />} />
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
          <Route path="/" element={<Home />} />
          <Route path="/contents" element={<Content />} />
          <Route path="/patient/register" element={<UserReg />} />
          <Route path="/doctors/register" element={<DoctorReg />} />
          <Route path="/hospital/register" element={<HospitalReg />} />
          <Route path="/:userId/doctorHome" element={<DoctorHome />} />
          <Route path="/:userId/orgmedicalcamp" element={<OrgMedicalCamp />} />
          <Route path="/:userId/org_camps" element={<ViewCamp />} />
          <Route path="/emergencyservice" element={<EmergencyService />} />
          <Route path="/:userId/notifications" element={<Notification />} />
          <Route path="/:campId/camp_details" element={<CampDetails />} />
          <Route path="/findambulance/:patientUserId/:hospitalUserId" element={<FindAmbulance />} />
          <Route path="/ambulanceHomepage" element={<AmbulanceHomepage />} />
          <Route path="/bookambulance" element={<BookAmbulance />} />
          <Route path="/:userId/appointments" element={<Appointment />} />
          <Route path="/:userId/chat_preview" element={<ChatPreview />} />
          <Route path="/:userId/:receiver/chats" element={<Chats />} />
          <Route path="/medicalcampdetails" element={<MediCampDetails />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/:userId/new-post" element={<NewPost />} />
        </Routes>
      </Fragment>
    </Router>

  );
}

export default App;
