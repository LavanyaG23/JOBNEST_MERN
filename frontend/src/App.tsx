import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
