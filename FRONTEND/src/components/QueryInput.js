import { useState } from "react";
import { processQuery } from "../services/api";

const QueryInput = ({ setResults }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await processQuery(query);
        setResults(data.result || []);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Ask a database question..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default QueryInput;
