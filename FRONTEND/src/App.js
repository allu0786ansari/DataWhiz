import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar /> {/* Add Navbar here */}
            <Routes>
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;
