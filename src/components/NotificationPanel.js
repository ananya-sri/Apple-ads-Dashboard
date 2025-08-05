import React, { useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import './NotificationPanel.css';

const NotificationPanel = ({ notifications, onRemove }) => {
  useEffect(() => {
    // Auto-dismiss notifications after 5 seconds
    const timers = notifications.map(notification => {
      return setTimeout(() => {
        onRemove(notification.id);
      }, 5000);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [notifications, onRemove]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} />;
      case 'warning':
        return <AlertTriangle size={16} />;
      case 'error':
        return <AlertCircle size={16} />;
      default:
        return <Info size={16} />;
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="notification-panel">
      {notifications.map((notification) => (
        <div 
          key={notification.id} 
          className={`notification notification-${notification.type}`}
        >
          <div className="notification-icon">
            {getIcon(notification.type)}
          </div>
          <div className="notification-content">
            <div className="notification-message">{notification.message}</div>
            <div className="notification-time">{notification.time}</div>
          </div>
          <button 
            className="notification-close"
            onClick={() => onRemove(notification.id)}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationPanel; 