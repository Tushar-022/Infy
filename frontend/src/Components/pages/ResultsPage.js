import React from 'react';
import { useLocation } from 'react-router-dom';

function ResultsPage() {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return <div>No results available.</div>;
  }

  return (
    <div className="results-container p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Analysis Results</h1>
      <div className="result-content bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-2">Analysis Summary:</h2>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
}

export default ResultsPage;
