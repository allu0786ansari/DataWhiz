import { useState } from "react";
import QueryInput from "./components/QueryInput";
import ResultsTable from "./components/ResultsTable";

const App = () => {
    const [results, setResults] = useState([]);

    return (
        <div>
            <h1>AI Query Answering System</h1>
            <QueryInput setResults={setResults} />
            <ResultsTable results={results} />
        </div>
    );
};

export default App;
