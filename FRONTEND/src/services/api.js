import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api"; // Django backend URL

export const processQuery = async (query) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/query/`, { query });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { error: "Server Error" };
    }
};

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(`${API_BASE_URL}/upload/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { error: "File Upload Failed" };
    }
};
