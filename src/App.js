import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- IMPORTS FIXED TO MATCH YOUR FOLDER STRUCTURE ---

// From src/pages/
import Home from "./pages/Home"; 

// From src/components/
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Features from "./components/Features";
import About from "./components/About";
import ClassStatus from "./components/ClassStatus";
import ClassHistory from "./components/ClassHistory";
import StartClass from "./components/StartClass";
import Timetable from "./components/Timetable";
import AdminManagement from "./components/AdminManagement";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          
          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Private/Internal Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/class_status" element={<ClassStatus />} />
          <Route path="/history" element={<ClassHistory />} />
          <Route path="/start_end_class" element={<StartClass />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/admin_management" element={<AdminManagement />} />
          
          {/* 404 Fallback */}
          <Route path="*" element={<div style={{textAlign:'center', marginTop:'50px'}}><h1>404 - Page Not Found</h1></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;