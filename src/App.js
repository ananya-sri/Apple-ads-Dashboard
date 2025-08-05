import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import NotificationPanel from './components/NotificationPanel';
import SearchModal from './components/SearchModal';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Apps');
  const [selectedRows, setSelectedRows] = useState([]);
  const [collapsedSections, setCollapsedSections] = useState({
    totalSummary: false,
    chart: false
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: '2025-07-05',
    end: '2025-07-11',
    label: 'Last 7 Days'
  });
  const [filters, setFilters] = useState({
    spend: { min: 0, max: 50000 },
    impressions: { min: 0, max: 10000000 },
    cpm: { min: 0, max: 10 }
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

  // Add sample notifications
  useEffect(() => {
    const sampleNotifications = [
      { id: 1, type: 'success', message: 'Campaign "Summer Sale" is performing above average', time: '2 min ago' },
      { id: 2, type: 'warning', message: 'Budget limit reached for "App Launch" campaign', time: '15 min ago' },
      { id: 3, type: 'info', message: 'New keyword suggestions available', time: '1 hour ago' }
    ];
    setNotifications(sampleNotifications);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Add notification for tab change
    addNotification('info', `Switched to ${tab} tab`);
  };

  const handleRowSelection = (rowId) => {
    setSelectedRows(prev => 
      prev.includes(rowId) 
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === 2) {
      setSelectedRows([]);
      addNotification('info', 'Deselected all rows');
    } else {
      setSelectedRows(['row1', 'row2']);
      addNotification('success', 'Selected all rows');
    }
  };

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const addNotification = (type, message) => {
    const newNotification = {
      id: Date.now(),
      type,
      message,
      time: 'Just now'
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowSearchModal(false);
    addNotification('info', `Searching for: ${query}`);
  };

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
    addNotification('info', `Date range updated to ${newRange.label}`);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    addNotification('info', 'Filters applied');
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    addNotification('info', `Sorted by ${key}`);
  };

  const handleBulkAction = (action) => {
    if (selectedRows.length === 0) {
      addNotification('warning', 'Please select rows first');
      return;
    }
    addNotification('success', `${action} applied to ${selectedRows.length} selected rows`);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-container">
        <Header 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          onSearchClick={() => setShowSearchModal(true)}
        />
        <MainContent 
          activeTab={activeTab}
          selectedRows={selectedRows}
          onRowSelection={handleRowSelection}
          onSelectAll={handleSelectAll}
          collapsedSections={collapsedSections}
          onToggleSection={toggleSection}
          searchQuery={searchQuery}
          filters={filters}
          onFilterChange={handleFilterChange}
          sortConfig={sortConfig}
          onSort={handleSort}
          onBulkAction={handleBulkAction}
          addNotification={addNotification}
        />
      </div>
      <NotificationPanel 
        notifications={notifications}
        onRemove={removeNotification}
      />
      {showSearchModal && (
        <SearchModal 
          onSearch={handleSearch}
          onClose={() => setShowSearchModal(false)}
        />
      )}
    </div>
  );
}

export default App; 