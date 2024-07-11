import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './routes/HomeRoute';
import HomeRoute from './routes/HomeRoute';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
      </Routes>
    </Router>

  );
}

export default App;
