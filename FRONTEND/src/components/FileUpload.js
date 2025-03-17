import { useState } from "react";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setMessage(""); // Clear message when file is changed
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            showMessage("Please select a CSV file", "error");
            return;
        }

        const formData = new FormData();
        formData.append("file_type", "csv");
        formData.append("file", file);

        setLoading(true);

        try {
            const response = await fetch("http://10.9.136.194:8000/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                showMessage("Success! Your CSV data has been uploaded.", "success");
            } else {
                showMessage(`Error: ${data.detail || "Something went wrong"}`, "error");
            }
        } catch (error) {
            showMessage(`Error: ${error.message || "Network error"}`, "error");
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (text, type) => {
        setMessage(text);
        setMessageType(type);
    };

    return (
        <div className="upload-container">
            <h2>Upload Your Data</h2>
            <p>Import your CSV file to begin analyzing your data</p>

            <form onSubmit={handleSubmit}>
                <div className="file-input">
                    <input type="file" accept=".csv" id="file-upload" onChange={handleFileChange} />
                    <label htmlFor="file-upload" className="custom-file-upload">
                        Choose CSV File
                    </label>
                    <span className="file-name">{file ? file.name : ""}</span>
                </div>

                <button type="submit" className="submit-btn" disabled={!file || loading}>
                    {loading ? <span className="spinner"></span> : "Upload Data"}
                </button>

                {message && <div className={`message ${messageType}`}>{message}</div>}
            </form>
        </div>
    );
};

export default FileUpload;
