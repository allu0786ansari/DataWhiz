const ResultsTable = ({ results }) => {
    return (
        <table border="1">
            <thead>
                <tr>
                    {results.length > 0 && results[0].map((_, index) => (
                        <th key={index}>Column {index + 1}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {results.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((col, colIndex) => (
                            <td key={colIndex}>{col}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ResultsTable;
