// SearchResults.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

function SearchResults() {
  const { query } = useParams();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Search Results for: <strong>{decodeURIComponent(query)}</strong></h2>
      {/* Replace the below with actual search results fetching logic */}
      <p>Displaying results for "{decodeURIComponent(query)}"... (This can be integrated with backend or filtered data)</p>
    </div>
  );
}

export default SearchResults;
