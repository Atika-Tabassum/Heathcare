import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Profile from './components/profile';
import Home from './components/homeComponent/Home';
import Content from './components/contentComponent/Content';
import DoctorHome from './components/doctorComponent/DoctorHome';
import OrgMedicalCamp from './components/doctorComponent/medicalcamp/OrgMedicalCamp';
import ViewCamp from './components/doctorComponent/medicalcamp/ViewCamp';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/:userId/myprofile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/contents" element={<Content />} />
          <Route path="/:userId/doctorHome" element={<DoctorHome />} />
          <Route path="/:userId/orgmedicalcamp" element={<OrgMedicalCamp />} />  
          <Route path="/:userId/org_camps" element={<ViewCamp />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
