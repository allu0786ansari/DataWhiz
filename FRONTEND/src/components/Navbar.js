import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">NLQ-AI</div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/upload" className="nav-link">File Upload</Link>
                <Link to="/about" className="nav-link">About Us</Link>
            </div>
        </nav>
    );
};

export default Navbar;
