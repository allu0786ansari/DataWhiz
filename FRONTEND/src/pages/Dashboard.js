import { useState } from "react";
import QueryInput from "../components/QueryInput";
import ResultsTable from "../components/ResultsTable";
const Dashboard = () => {
    const [queryResults, setQueryResults] = useState([]); // Store executed query results

    return (
        <div>
            <h1>Natural Language to SQL Converter</h1>
            <QueryInput setQueryResults={setQueryResults} />
            {queryResults.length > 0 && <ResultsTable queryResults={queryResults} />}
        </div>
    );
};

export default Dashboard;
