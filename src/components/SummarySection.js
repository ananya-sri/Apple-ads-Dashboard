import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './SummarySection.css';

const SummarySection = ({ collapsed, onToggle }) => {
  const kpiData = [
    { value: '0.00%', change: '0%', label: 'Conversions ROAS' },
    { value: '$6,109.89', change: '+27.42%', label: 'Conversions ROAS', positive: true },
    { value: '0.00%', change: '0%', label: 'Conversions ROAS' },
    { value: '$2,101', change: '0%', label: 'Conversions ROAS' },
    { value: '$2.91', change: '0%', label: 'Conversions ROAS' },
    { value: '$0.00', change: '0%', label: 'Conversions ROAS' },
  ];

  return (
    <div className="summary-section">
      <div className="section-header" onClick={onToggle}>
        <h3 className="section-title">Total Summary</h3>
        {collapsed ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {!collapsed && (
        <div className="kpi-grid">
          {kpiData.map((kpi, index) => (
            <div key={index} className="kpi-box">
              <div className="kpi-value">{kpi.value}</div>
              <div className={`kpi-change ${kpi.positive ? 'positive' : ''}`}>
                {kpi.change}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SummarySection; 