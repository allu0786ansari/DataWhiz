import React, { useState } from "react";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" or "error"
    const [loading, setLoading] = useState(false);
    const [processedColumns, setProcessedColumns] = useState([]); // Store the columns
    const [showResults, setShowResults] = useState(false); // Control visibility

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setMessage("");
        setMessageType("");
        setProcessedColumns([]); 
        setShowResults(false); 
    };

    const showMessage = (text, type) => {
        setMessage(text);
        setMessageType(type);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            showMessage("Please select a CSV file", "error");
            return;
        }

        setMessage("");
        setMessageType("");
        setLoading(true); 

        const formData = new FormData();
        formData.append("file_type", "csv");
        formData.append("file", file);

        try {
            const response = await fetch("http://10.9.165.93:8000/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json(); 

            if (response.ok) {
                showMessage("✅ Upload successful!", "success");

                if (data.tables?.length > 0 && data.tables[0].columns) {
                    setProcessedColumns(data.tables[0].columns);
                    setShowResults(true);
                } else {
                    showMessage("Upload successful, but no column data found.", "warning");
                    setShowResults(false);
                }

                // Clear file input after successful upload
                setFile(null);
            } else {
                showMessage(`❌ Error: ${data.detail || `Server error (${response.status})`}`, "error");
                setShowResults(false);
            }
        } catch (error) {
            showMessage(`❌ Upload failed: ${error.message || "Unexpected error"}`, "error");
            setShowResults(false);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Your Data</h2>
            <p>Import your CSV file to see its columns</p>

            <form onSubmit={handleSubmit}>
                <div className="file-input">
                    <input
                        type="file"
                        accept=".csv"
                        id="file-upload"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        key={file ? file.name + file.lastModified : "empty"}
                    />
                    <label htmlFor="file-upload" className="custom-file-upload">
                        Choose CSV File
                    </label>
                    <span className="file-name">{file ? file.name : "No file chosen"}</span>
                </div>

                <button type="submit" className="submit-btn" disabled={!file || loading}>
                    {loading ? <span className="spinner"></span> : "Upload"}
                </button>

                {message && <div className={`message ${messageType}`}>{message}</div>}
            </form>

            {showResults && processedColumns.length > 0 && (
                <div className="results-container">
                    <h3>📌 Columns in CSV:</h3>
                    <ul>
                        {processedColumns.map((column, index) => (
                            <li key={index}>{column}</li>
                        ))}
                    </ul>
                </div>
            )}

            <style jsx>{`
                .upload-container {
                    border: 1px solid #ccc;
                    padding: 20px;
                    border-radius: 8px;
                    max-width: 500px;
                    margin: 20px auto;
                    text-align: center;
                }
                .file-input {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 15px;
                }
                .custom-file-upload {
                    border: 1px solid #ccc;
                    padding: 6px 12px;
                    cursor: pointer;
                    background-color: #f0f0f0;
                    border-radius: 4px;
                }
                .custom-file-upload:hover {
                    background-color: #e0e0e0;
                }
                .file-name {
                    margin-left: 10px;
                    font-style: italic;
                    color: #555;
                }
                .submit-btn {
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    min-width: 120px;
                    position: relative;
                }
                .submit-btn:disabled {
                    background-color: #cccccc;
                    cursor: not-allowed;
                }
                .submit-btn:hover:not(:disabled) {
                    background-color: #0056b3;
                }
                .message {
                    margin-top: 15px;
                    padding: 10px;
                    border-radius: 4px;
                }
                .message.success {
                    background-color: #d4edda;
                    color: #155724;
                }
                .message.error {
                    background-color: #f8d7da;
                    color: #721c24;
                }
                .message.warning {
                    background-color: #fff3cd;
                    color: #856404;
                }
                .results-container {
                    margin-top: 20px;
                    text-align: left;
                    border-top: 1px solid #eee;
                    padding-top: 15px;
                }
                .results-container h3 {
                    margin-bottom: 10px;
                    color: #333;
                }
                .results-container ul {
                    list-style-type: disc;
                    padding-left: 20px;
                }
                .results-container li {
                    margin-bottom: 5px;
                    color: #555;
                }
                .spinner {
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    border-top-color: #fff;
                    width: 16px;
                    height: 16px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default FileUpload;
