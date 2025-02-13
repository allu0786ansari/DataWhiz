import React, { useState } from "react";
import { processQuery } from "../services/api";
import ResultsDisplay from "./ResultsDisplay";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const QueryInput = () => {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleQuerySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const data = await processQuery(query);
            setResult(data);
        } catch (err) {
            setError(err.error || "An error occurred");
        }

        setLoading(false);
    };

    return (
        <div className="query-container">
            <h2>Interact with your database</h2>
            <form onSubmit={handleQuerySubmit}>
                <input
                    type="text"
                    placeholder="Enter a question in natural language..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" disabled={loading}>Submit</button>
            </form>
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {result && <ResultsDisplay result={result} />}
        </div>
    );
};

export default QueryInput;
