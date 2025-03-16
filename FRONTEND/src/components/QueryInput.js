import { useState } from "react";
import { generateSQL, executeSQL } from "../services/api";

const QueryInput = ({ setQueryResults }) => {
    const [naturalQuery, setNaturalQuery] = useState("");
    const [sqlQuery, setSqlQuery] = useState(""); // Now editable
    const [loading, setLoading] = useState(false);
    const [showExecute, setShowExecute] = useState(false); // Controls Execute button visibility

    const handleGenerateSQL = async () => {
        setLoading(true);
        const sql = await generateSQL(naturalQuery);
        setSqlQuery(sql.trim());
        setShowExecute(true); // Show Execute button after SQL is generated
        setLoading(false);
    };

    const handleExecuteSQL = async () => {
        setLoading(true);
        const results = await executeSQL(sqlQuery);
        setQueryResults(results);
        setLoading(false);
    };

    return (
        <div className="query-input">
            <input
                type="text"
                value={naturalQuery}
                onChange={(e) => setNaturalQuery(e.target.value)}
                placeholder="Enter your question (e.g., Show all employees earning more than $50,000)"
            />
            <button onClick={handleGenerateSQL} disabled={loading}>
                {loading ? "Generating..." : "Generate SQL"}
            </button>

            {showExecute && (
                <>
                    <h2>Edit SQL Query:</h2>
                    <textarea
                        value={sqlQuery}
                        onChange={(e) => setSqlQuery(e.target.value)}
                        rows="3"
                        cols="50"
                        style={{whitespace: "pre-wrap", wordBreak: "break-word"}}
                    />
                    <button onClick={handleExecuteSQL} disabled={loading}>
                        {loading ? "Executing..." : "Execute"}
                    </button>
                </>
            )}
        </div>
    );
};

export default QueryInput;
