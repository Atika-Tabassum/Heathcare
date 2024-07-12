import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Profile from './components/profile';
import Home from './components/homeComponent/Home';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/:userId/myprofile" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
