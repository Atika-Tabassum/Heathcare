import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './components/profile';
import Home from './components/homeComponent/Home';
import Login from './components/loginComponent/Login';
import FindDoctor from './components/patientComponent/FindDoctor';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/:userId/myprofile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/finddoctor" element={<FindDoctor />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
