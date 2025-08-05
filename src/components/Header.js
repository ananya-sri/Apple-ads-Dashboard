import React, { useState } from 'react';
import { Calendar, Search, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = ({ activeTab, onTabChange, dateRange, onDateRangeChange, onSearchClick }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const tabs = [
    'Accounts', 'Apps', 'Campaigns', 'Ad groups', 'Ad group settings', 
    'Keywords', 'Search terms', 'Negative keywords', 'Ads', 'CPP'
  ];

  const dateRanges = [
    { label: 'Today', start: '2025-07-11', end: '2025-07-11' },
    { label: 'Yesterday', start: '2025-07-10', end: '2025-07-10' },
    { label: 'Last 7 Days', start: '2025-07-05', end: '2025-07-11' },
    { label: 'Last 30 Days', start: '2025-06-12', end: '2025-07-11' },
    { label: 'This Month', start: '2025-07-01', end: '2025-07-31' },
    { label: 'Last Month', start: '2025-06-01', end: '2025-06-30' },
    { label: 'Custom Range', start: '', end: '' }
  ];

  const handleDateRangeSelect = (range) => {
    onDateRangeChange(range);
    setShowDatePicker(false);
  };

  const handleCustomDateChange = (e, type) => {
    const newRange = { ...dateRange };
    newRange[type] = e.target.value;
    newRange.label = 'Custom Range';
    onDateRangeChange(newRange);
  };

  return (
    <div className="header">
      <div className="header-left">
        <h1 className="header-title">All ad accounts</h1>
        <div className="header-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`header-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="header-right">
        <button className="search-button" onClick={onSearchClick}>
          <Search size={16} />
        </button>
        <div className="date-selector-container">
          <div 
            className="date-selector"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <Calendar size={16} />
            <span className="date-text">{dateRange.label}</span>
            <span className="date-range">
              {dateRange.start && dateRange.end 
                ? `${new Date(dateRange.start).toLocaleDateString()} - ${new Date(dateRange.end).toLocaleDateString()}`
                : 'Select dates'
              }
            </span>
            <ChevronDown size={14} className={`chevron ${showDatePicker ? 'up' : ''}`} />
          </div>
          
          {showDatePicker && (
            <div className="date-picker-dropdown">
              <div className="date-presets">
                {dateRanges.map((range, index) => (
                  <button
                    key={index}
                    className={`date-preset ${dateRange.label === range.label ? 'active' : ''}`}
                    onClick={() => handleDateRangeSelect(range)}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
              
              <div className="custom-date-inputs">
                <div className="date-input-group">
                  <label>Start Date:</label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => handleCustomDateChange(e, 'start')}
                  />
                </div>
                <div className="date-input-group">
                  <label>End Date:</label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => handleCustomDateChange(e, 'end')}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header; 