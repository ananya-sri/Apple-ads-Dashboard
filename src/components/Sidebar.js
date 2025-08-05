import React from 'react';
import { 
  Home, 
  Grid, 
  Search, 
  Zap, 
  Clock, 
  Settings, 
  HelpCircle, 
  User 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: false },
    { icon: Grid, label: 'Apps', active: false },
    { icon: Search, label: 'Search', active: false },
    { icon: Zap, label: 'Performance', active: false },
    { icon: Clock, label: 'History', active: false },
    { icon: Settings, label: 'Settings', active: true },
    { icon: HelpCircle, label: 'Help', active: false },
    { icon: User, label: 'Profile', active: false },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              className={`sidebar-item ${item.active ? 'active' : ''}`}
              title={item.label}
            >
              <IconComponent size={20} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar; 