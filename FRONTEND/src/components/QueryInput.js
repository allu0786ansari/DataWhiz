import { useState } from "react";
import { generateSQL } from "../services/api";

const QueryInput = ({ setSqlQuery }) => {
    const [naturalQuery, setNaturalQuery] = useState("");

    const handleGenerateSQL = async () => {
        const sql = await generateSQL(naturalQuery);
        setSqlQuery(sql);
    };

    return (
        <div className="query-input">
            <input
                type="text"
                value={naturalQuery}
                onChange={(e) => setNaturalQuery(e.target.value)}
                placeholder="Enter your question (e.g., Show all employees earning more than $50,000)"
            />
            <button onClick={handleGenerateSQL}>Generate SQL</button>
        </div>
    );
};

export default QueryInput;
