const ResultsTable = ({ sqlQuery }) => {
    return (
        <div>
            <h2>Generated SQL Query:</h2>
            <pre>{sqlQuery}</pre>
        </div>
    );
};

export default ResultsTable;
