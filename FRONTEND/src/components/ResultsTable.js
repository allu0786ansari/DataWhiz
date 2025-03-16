import { useState } from "react";
import { executeSQL } from "../services/api";

const ResultsTable = ({ queryResults }) => {
    return (
        <div>
            <h2>Query Results:</h2>
            {queryResults.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            {Object.keys(queryResults[0]).map((col, index) => (
                                <th key={index}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {queryResults.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {Object.values(row).map((value, colIndex) => (
                                    <td key={colIndex}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default ResultsTable;
