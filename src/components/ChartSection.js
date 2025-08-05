import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './ChartSection.css';

const ChartSection = ({ collapsed, onToggle }) => {
  // Sample data for the spend chart
  const chartData = [
    { date: 'Jul 5', spend: 430 },
    { date: 'Jul 6', spend: 520 },
    { date: 'Jul 7', spend: 775 },
    { date: 'Jul 8', spend: 680 },
    { date: 'Jul 9', spend: 890 },
    { date: 'Jul 10', spend: 1120 },
    { date: 'Jul 11', spend: 950 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Date: ${label}`}</p>
          <p className="value">{`Spend: $${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-section">
      <div className="section-header" onClick={onToggle}>
        <h3 className="section-title">Chart</h3>
        {collapsed ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {!collapsed && (
        <div className="chart-container">
          <h4 className="chart-title">Spend</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#666"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#666"
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="spend" 
                  stroke="#ff6b35" 
                  strokeWidth={3}
                  dot={{ fill: '#ff6b35', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#ff6b35', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartSection; 