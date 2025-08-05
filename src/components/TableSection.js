import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Filter, Columns, Download, Square, ArrowUpDown } from 'lucide-react';
import './TableSection.css';

const TableSection = ({ 
  selectedRows, 
  onRowSelection, 
  onSelectAll, 
  searchQuery,
  filters,
  onFilterChange,
  sortConfig,
  onSort,
  onBulkAction,
  addNotification
}) => {
  const [showDropdowns, setShowDropdowns] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [showColumns, setShowColumns] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const tableData = useMemo(() => [
    {
      id: 'row1',
      name: 'All Group Name',
      spend: 22498,
      impressions: 5417869,
      cpm: 4.17,
      taps: 49020,
      cpt: 4.17,
      ttr: 0.17,
      downloads: 49020,
      cpa: 1.17
    },
    {
      id: 'row2',
      name: 'App name',
      spend: 22498,
      impressions: 5417869,
      cpm: 4.17,
      taps: 49020,
      cpt: 4.17,
      ttr: 0.17,
      downloads: 49020,
      cpa: 1.17,
      hasIcon: true
    },
    {
      id: 'row3',
      name: 'App name',
      spend: 22498,
      impressions: 5417869,
      cpm: 4.17,
      taps: 49020,
      cpt: 4.17,
      ttr: 0.17,
      downloads: 49020,
      cpa: 1.17,
      hasIcon: true
    }
  ], []);

  const columns = [
    { key: 'name', label: 'All Group Name', sortable: true },
    { key: 'spend', label: 'Spend', sortable: true, type: 'currency' },
    { key: 'impressions', label: 'Impressions', sortable: true, type: 'number' },
    { key: 'cpm', label: 'CPM', sortable: true, type: 'currency' },
    { key: 'taps', label: 'Taps', sortable: true, type: 'number' },
    { key: 'cpt', label: 'CPT', sortable: true, type: 'currency' },
    { key: 'ttr', label: 'TTR', sortable: true, type: 'percentage' },
    { key: 'downloads', label: 'Downloads (Total)', sortable: true, type: 'number' },
    { key: 'cpa', label: 'Average CPA (Total)', sortable: true, type: 'percentage' }
  ];

  // Filter and sort data
  useEffect(() => {
    let filtered = [...tableData];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(row => 
        row.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply numeric filters
    filtered = filtered.filter(row => {
      return (
        row.spend >= filters.spend.min && row.spend <= filters.spend.max &&
        row.impressions >= filters.impressions.min && row.impressions <= filters.impressions.max &&
        row.cpm >= filters.cpm.min && row.cpm <= filters.cpm.max
      );
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (sortConfig.direction === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }

    setFilteredData(filtered);
  }, [tableData, searchQuery, filters, sortConfig]);

  const toggleDropdown = (dropdown) => {
    setShowDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleActionClick = (action) => {
    if (selectedRows.length === 0) {
      addNotification('warning', 'Please select rows first');
      return;
    }
    onBulkAction(action);
    setShowDropdowns({});
  };

  const handleDownload = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'apple-search-ads-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    addNotification('success', 'Data exported successfully');
  };

  const generateCSV = () => {
    const headers = columns.map(col => col.label).join(',');
    const rows = filteredData.map(row => 
      columns.map(col => {
        const value = row[col.key];
        if (col.type === 'currency') return `$${value.toFixed(2)}`;
        if (col.type === 'percentage') return `${value.toFixed(2)}%`;
        if (col.type === 'number') return value.toLocaleString();
        return value;
      }).join(',')
    );
    return [headers, ...rows].join('\n');
  };

  const formatValue = (value, type) => {
    switch (type) {
      case 'currency':
        return `$${value.toFixed(2)}`;
      case 'percentage':
        return `${value.toFixed(2)}%`;
      case 'number':
        return value.toLocaleString();
      default:
        return value;
    }
  };

  const handleSort = (key) => {
    onSort(key);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters };
    if (typeof value === 'object') {
      newFilters[filterType] = { ...newFilters[filterType], ...value };
    } else {
      newFilters[filterType] = value;
    }
    onFilterChange(newFilters);
  };

  return (
    <div className="table-section">
      <div className="table-actions">
        <div className="action-buttons">
          <div className="dropdown-container">
            <button 
              className="action-button"
              onClick={() => toggleDropdown('actions')}
            >
              + Actions
              <ChevronDown size={16} />
            </button>
            {showDropdowns.actions && (
              <div className="dropdown-menu">
                <button onClick={() => handleActionClick('Edit')}>Edit Selected</button>
                <button onClick={() => handleActionClick('Delete')}>Delete Selected</button>
                <button onClick={() => handleActionClick('Duplicate')}>Duplicate Selected</button>
                <button onClick={() => handleActionClick('Pause')}>Pause Selected</button>
                <button onClick={() => handleActionClick('Activate')}>Activate Selected</button>
              </div>
            )}
          </div>

          <div className="dropdown-container">
            <button 
              className="action-button"
              onClick={() => toggleDropdown('rules')}
            >
              Rules
              <ChevronDown size={16} />
            </button>
            {showDropdowns.rules && (
              <div className="dropdown-menu">
                <button onClick={() => addNotification('info', 'Create Rule clicked')}>Create Rule</button>
                <button onClick={() => addNotification('info', 'Manage Rules clicked')}>Manage Rules</button>
                <button onClick={() => addNotification('info', 'Rule Templates clicked')}>Rule Templates</button>
              </div>
            )}
          </div>

          <div className="dropdown-container">
            <button 
              className="action-button"
              onClick={() => toggleDropdown('quickEdit')}
            >
              Quick Edit
              <ChevronDown size={16} />
            </button>
            {showDropdowns.quickEdit && (
              <div className="dropdown-menu">
                <button onClick={() => addNotification('info', 'Bulk Edit clicked')}>Bulk Edit</button>
                <button onClick={() => addNotification('info', 'Quick Actions clicked')}>Quick Actions</button>
                <button onClick={() => addNotification('info', 'Mass Update clicked')}>Mass Update</button>
              </div>
            )}
          </div>

          <div className="dropdown-container">
            <button 
              className="action-button"
              onClick={() => toggleDropdown('labels')}
            >
              Labels
              <ChevronDown size={16} />
            </button>
            {showDropdowns.labels && (
              <div className="dropdown-menu">
                <button onClick={() => addNotification('info', 'Add Label clicked')}>Add Label</button>
                <button onClick={() => addNotification('info', 'Manage Labels clicked')}>Manage Labels</button>
                <button onClick={() => addNotification('info', 'Label Templates clicked')}>Label Templates</button>
              </div>
            )}
          </div>

          <div className="dropdown-container">
            <button 
              className={`action-button ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              Filters
            </button>
          </div>

          <div className="dropdown-container">
            <button 
              className={`action-button ${showColumns ? 'active' : ''}`}
              onClick={() => setShowColumns(!showColumns)}
            >
              <Columns size={16} />
              Columns
            </button>
          </div>

          <button className="action-button" onClick={handleDownload}>
            <Download size={16} />
            Export
          </button>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Spend Range:</label>
              <div className="range-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.spend.min}
                  onChange={(e) => handleFilterChange('spend', { min: Number(e.target.value) })}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.spend.max}
                  onChange={(e) => handleFilterChange('spend', { max: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="filter-group">
              <label>Impressions Range:</label>
              <div className="range-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.impressions.min}
                  onChange={(e) => handleFilterChange('impressions', { min: Number(e.target.value) })}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.impressions.max}
                  onChange={(e) => handleFilterChange('impressions', { max: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="filter-group">
              <label>CPM Range:</label>
              <div className="range-inputs">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Min"
                  value={filters.cpm.min}
                  onChange={(e) => handleFilterChange('cpm', { min: Number(e.target.value) })}
                />
                <span>-</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Max"
                  value={filters.cpm.max}
                  onChange={(e) => handleFilterChange('cpm', { max: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="table-container">
        <div className="table-header">
          <div className="selection-info">
            Selected {selectedRows.length} of {filteredData.length}
            {searchQuery && <span className="search-indicator"> (filtered by: "{searchQuery}")</span>}
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox" 
                    checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                    onChange={onSelectAll}
                  />
                </th>
                {columns.map((column) => (
                  <th key={column.key}>
                    <div className="header-cell">
                      <span>{column.label}</span>
                      {column.sortable && (
                        <button 
                          className={`sort-button ${sortConfig.key === column.key ? 'active' : ''}`}
                          onClick={() => handleSort(column.key)}
                        >
                          <ArrowUpDown size={14} />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} className={selectedRows.includes(row.id) ? 'selected' : ''}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedRows.includes(row.id)}
                      onChange={() => onRowSelection(row.id)}
                    />
                  </td>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.key === 'name' ? (
                        <div className="name-cell">
                          {row.hasIcon && <Square size={12} className="app-icon" />}
                          {row[column.key]}
                        </div>
                      ) : (
                        formatValue(row[column.key], column.type)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableSection; 