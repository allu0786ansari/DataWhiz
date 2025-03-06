import { useState } from "react";
import QueryInput from "../components/QueryInput";
import ResultsTable from "../components/ResultsTable";

const Dashboard = () => {
    const [sqlQuery, setSqlQuery] = useState("");

    return (
        <div>
            <h1>Natural Language to SQL Converter</h1>
            <QueryInput setSqlQuery={setSqlQuery} />
            {sqlQuery && <ResultsTable sqlQuery={sqlQuery} />}
        </div>
    );
};

export default Dashboard;
