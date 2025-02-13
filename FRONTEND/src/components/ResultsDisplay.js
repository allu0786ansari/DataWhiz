import React from "react";

const ResultsDisplay = ({ result }) => {
    if (!result || !result.result) return null;

    return (
        <div className="results-container">
            <h3>Query Results:</h3>
            <p><strong>Generated SQL:</strong> {result.query}</p>
            <table>
                <thead>
                    <tr>
                        {result.result.length > 0 &&
                            Object.keys(result.result[0]).map((key) => <th key={key}>{key}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {result.result.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, i) => <td key={i}>{value}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsDisplay;
