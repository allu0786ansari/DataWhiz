import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import QueryInput from "./components/QueryInput";
import FileUpload from "./components/FileUpload";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="app-name">DataWhiz</div> {/* App Name on the Left */}
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/upload">File Upload</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
      </nav>

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<QueryInput />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
