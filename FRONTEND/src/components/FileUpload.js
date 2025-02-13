import React, { useState } from "react";
import { uploadFile } from "../services/api";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleFileUpload = async () => {
        if (!file) return;
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await uploadFile(file);
            setMessage(response.message || "File uploaded successfully!");
        } catch (err) {
            setError(err.error || "Failed to upload file");
        }

        setLoading(false);
    };

    return (
        <div className="upload-container">
            <h3>Upload a File to NLQ AI</h3>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleFileUpload} disabled={loading}>Upload</button>
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;
