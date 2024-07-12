import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Profile from './components/profile';
import Home from './components/homeComponent/Home';
import Content from './components/contentComponent/Content';
import UserReg from './components/userRegComponent/userReg'

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/:userId/myprofile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/contents" element={<Content />} />
          <Route path="/patient/register" element={<UserReg />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
