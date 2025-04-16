import axios from "axios";

const API_BASE_URL = "http://10.9.165.93:8000";
const UPLOAD_URL = `${API_BASE_URL}/upload`; // File upload endpoint

/**
 * Generates an SQL query from a natural language query.
 * @param {string} naturalQuery - The natural language query.
 * @returns {Promise<string>} - The generated SQL query or an error message.
 */
export const generateSQL = async (naturalQuery) => {
    try {
        const cleanQuery = naturalQuery.trim();
        const response = await axios.post(`${API_BASE_URL}/generate_sql/`, { 
            query: cleanQuery,
        });
        return response.data.sql_query;
    } catch (error) {
        console.error("Error generating SQL:", error);
        return "Error generating SQL query.";
    }
};

/**
 * Executes a given SQL query.
 * @param {string} sqlQuery - The SQL query to execute.
 * @returns {Promise<Array<object>|null>} - The query results or null on failure.
 */
export const executeSQL = async (sqlQuery) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/execute_sql/`, { 
            sql_query: sqlQuery,
        });
        return response.data.results; 
    } catch (error) {
        console.error("Error executing SQL:", error);
        return null; 
    }
};

/**
 * Uploads a file (e.g., CSV) to the backend.
 * @param {File} file - The file object to upload.
 * @param {string} [fileType="csv"] - Type of the file.
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
export const uploadFile = async (file, fileType = "csv") => {
    if (!file) {
        console.error("No file provided for upload.");
        return { success: false, error: "No file selected. Please choose a file." };
    }

    const formData = new FormData();
    formData.append("file_type", fileType);
    formData.append("file", file);

    try {
        const response = await axios.post(UPLOAD_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.data?.tables?.length > 0) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: "File uploaded, but no column data found." };
        }
    } catch (error) {
        console.error("Upload failed:", error.response?.data || error.message);

        let errorMessage = "File upload failed. Please try again.";
        if (error.response) {
            errorMessage = error.response.data?.detail || `Server error: ${error.response.status}`;
        } else if (error.request) {
            errorMessage = "No response from server. Check your connection.";
        } else {
            errorMessage = `Upload request error: ${error.message}`;
        }

        return { success: false, error: errorMessage };
    }
};
