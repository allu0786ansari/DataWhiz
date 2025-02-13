import React from "react";
import "../App.css";
const AboutUs = () => {
    return (
        <div className="about-container">
            <h1>DataWhiz - AI-powered Query Answering System </h1>
            <p>
                Our AI-powered Query Answering System allows users to interact with databases using natural language. 
                It eliminates the need for complex SQL queries, making data retrieval easy for non-technical users.
            </p>

            <h2>Key Features</h2>
            <ul className="features-list">
                <li>🔍 **Natural Language Querying** – Convert human language into SQL queries.</li>
                <li>⚡ **Real-Time Query Execution** – Fetch data instantly from the database.</li>
                <li>📊 **Results Visualization** – Display results in tables and charts.</li>
                <li>📂 **File Upload Support** – Users can upload CSV or Excel files for querying.</li>
                <li>💡 **Intelligent Query Understanding** – Supports complex queries like joins, conditions, and aggregations.</li>
                <li>🚀 **Fast and Optimized** – Generates optimized SQL queries for better performance.</li>
                <li>🛠 **Error Handling** – Friendly error messages for invalid queries.</li>
                <li>⏳ **Loading States** – Displays loading animations while processing queries.</li>
            </ul>

            <h2>How It Works</h2>
            <p>Simply enter a question like <b>"Show me all sales in January"</b> and get results instantly!</p>
        </div>
    );
};

export default AboutUs;
