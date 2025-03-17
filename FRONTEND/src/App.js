import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Navbar from "./components/Navbar";
import FileUpload from "./components/FileUpload"; // Import FileUpload Component


function App() {
    return (
        <>
            <Navbar /> {/* Add Navbar here */}
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/upload" element={<FileUpload />} />

            </Routes>
        </>
    );
}

export default App;
