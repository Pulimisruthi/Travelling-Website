import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search destinations, activities..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search destinations"
      />
      <button type="submit" aria-label="Search">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBar;