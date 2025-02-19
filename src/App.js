import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Report from "./components/Report";
import Patient from "./components/Patient";
import ReportCards from "./components/ReportCards";
import Assessment from "./components/Assessment";

const App = () => {
  // Data navigasi agar lebih rapi & mudah dikelola
  const navLinks = [
    { path: "/login", label: "Login" },
    { path: "/register", label: "Register" },
    { path: "/patient", label: "Patient" },
    { path: "/report", label: "Report" },
    { path: "/reportcards", label: "ReportCards" },
    { path: "/reportAssessment", label: "ReportAssesment" }
  ];

  return (
    <Router>
      {/* Navigation Bar */}
      <nav style={{ padding: "1rem", backgroundColor: "#f5f5f5" }}>
        {navLinks.map(({ path, label }) => (
          <Link key={path} to={path} style={{ marginRight: "1rem" }}>
            {label}
          </Link>
        ))}
      </nav>

      {/* Routing */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/report" element={<Report />} />
        <Route path="/reportcards" element={<ReportCards />} />
        <Route path="/reportAssessment" element={<Assessment/>} />
      </Routes>
    </Router>
  );
};

export default App;
