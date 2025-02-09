import axios from "axios";

const API_URL = "http://127.0.0.1:8000/core/";

export const processQuery = async (query) => {
    try {
        const response = await axios.post(`${API_URL}query/`, { query });
        return response.data;
    } catch (error) {
        console.error("Error processing query:", error);
        return { error: "Failed to process query" };
    }
};
