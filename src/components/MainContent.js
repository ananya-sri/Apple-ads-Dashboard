import React from 'react';
import HeroSection from './HeroSection';
import SummarySection from './SummarySection';
import ChartSection from './ChartSection';
import TableSection from './TableSection';
import './MainContent.css';

const MainContent = ({
  activeTab,
  selectedRows,
  onRowSelection,
  onSelectAll,
  collapsedSections,
  onToggleSection,
  searchQuery,
  filters,
  onFilterChange,
  sortConfig,
  onSort,
  onBulkAction,
  addNotification
}) => {
  return (
    <div className="main-content">
      <HeroSection />
      <SummarySection 
        collapsed={collapsedSections.totalSummary}
        onToggle={() => onToggleSection('totalSummary')}
      />
      <ChartSection 
        collapsed={collapsedSections.chart}
        onToggle={() => onToggleSection('chart')}
      />
      <TableSection 
        selectedRows={selectedRows}
        onRowSelection={onRowSelection}
        onSelectAll={onSelectAll}
        searchQuery={searchQuery}
        filters={filters}
        onFilterChange={onFilterChange}
        sortConfig={sortConfig}
        onSort={onSort}
        onBulkAction={onBulkAction}
        addNotification={addNotification}
      />
    </div>
  );
};

export default MainContent; 