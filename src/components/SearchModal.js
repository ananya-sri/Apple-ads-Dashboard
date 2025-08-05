import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp, Filter } from 'lucide-react';
import './SearchModal.css';

const SearchModal = ({ onSearch, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches] = useState([
    'campaign performance',
    'keyword optimization',
    'budget allocation',
    'ROAS improvement',
    'ad group settings'
  ]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      // Generate suggestions based on query
      const newSuggestions = [
        `${query} campaigns`,
        `${query} performance`,
        `${query} optimization`,
        `${query} analysis`,
        `${query} metrics`
      ].filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()));
      
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      // Save to recent searches
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleRecentClick = (recent) => {
    setQuery(recent);
    handleSearch(recent);
  };

  const handlePopularClick = (popular) => {
    setQuery(popular);
    handleSearch(popular);
  };

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <div className="search-input-container">
            <Search size={20} className="search-icon" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search campaigns, keywords, metrics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="search-input"
            />
            {query && (
              <button 
                className="clear-button"
                onClick={() => setQuery('')}
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="search-content">
          {suggestions.length > 0 && (
            <div className="search-section">
              <h4>Suggestions</h4>
              <div className="suggestion-list">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <Search size={16} />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {recentSearches.length > 0 && (
            <div className="search-section">
              <h4>
                <Clock size={16} />
                Recent Searches
              </h4>
              <div className="recent-list">
                {recentSearches.map((recent, index) => (
                  <button
                    key={index}
                    className="recent-item"
                    onClick={() => handleRecentClick(recent)}
                  >
                    {recent}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="search-section">
            <h4>
              <TrendingUp size={16} />
              Popular Searches
            </h4>
            <div className="popular-list">
              {popularSearches.map((popular, index) => (
                <button
                  key={index}
                  className="popular-item"
                  onClick={() => handlePopularClick(popular)}
                >
                  <Filter size={14} />
                  {popular}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal; 