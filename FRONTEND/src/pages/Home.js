import React from "react";
import QueryInput from "../components/QueryInput";
import FileUpload from "../components/FileUpload";

const Home = () => {
    return (
        <div className="home-container">
            <h1>NLQ AI - AI Powered Query Answering System</h1>
            <QueryInput />
            <FileUpload />
        </div>
    );
};

export default Home;
