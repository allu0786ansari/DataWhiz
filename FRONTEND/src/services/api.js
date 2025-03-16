import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/core";

export const generateSQL = async (naturalQuery) => {
    try {
        const cleanQuery = naturalQuery.trim();  // ✅ Remove extra spaces/newlines
        const response = await axios.post(`${API_BASE_URL}/generate_sql/`, { 
            query: cleanQuery,
        });
        return response.data.sql_query;
    } catch (error) {
        console.error("Error generating SQL:", error);
        return "Error generating SQL query.";
    }
};

export const executeSQL = async (sqlQuery) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/execute_sql/`, { 
            sql_query: sqlQuery,
        });
        return response.data.results; // Assuming backend returns results
    } catch (error) {
        console.error("Error executing SQL:", error);
        return null; // Return null to indicate failure
    }
};

