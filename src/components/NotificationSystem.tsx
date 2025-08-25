import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

interface NotificationProps {
  notification: {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
  onRemove: (id: string) => void;
}

const NotificationItem: React.FC<NotificationProps> = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsLeaving(true);
    setTimeout(() => onRemove(notification.id), 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStyles = () => {
    const baseStyles = "flex items-start gap-3 p-4 rounded-lg shadow-lg border transition-all duration-300 transform";
    
    switch (notification.type) {
      case 'success':
        return cn(baseStyles, "bg-green-50 border-green-200 text-green-900");
      case 'error':
        return cn(baseStyles, "bg-red-50 border-red-200 text-red-900");
      case 'warning':
        return cn(baseStyles, "bg-yellow-50 border-yellow-200 text-yellow-900");
      case 'info':
        return cn(baseStyles, "bg-blue-50 border-blue-200 text-blue-900");
      default:
        return cn(baseStyles, "bg-gray-50 border-gray-200 text-gray-900");
    }
  };

  return (
    <div
      className={cn(
        getStyles(),
        isVisible && !isLeaving ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}
      style={{
        transform: isVisible && !isLeaving ? 'translateX(0)' : 'translateX(100%)',
        opacity: isVisible && !isLeaving ? 1 : 0,
      }}
    >
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium mb-1">
          {notification.title}
        </h4>
        <p className="text-sm opacity-90">
          {notification.message}
        </p>
        
        {notification.action && (
          <button
            onClick={notification.action.onClick}
            className="mt-2 text-sm font-medium underline hover:no-underline transition-all"
          >
            {notification.action.label}
          </button>
        )}
      </div>
      
      <button
        onClick={handleRemove}
        className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-black/10 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const NotificationSystem: React.FC = () => {
  const { state, removeNotification } = useApp();
  const { notifications } = state;

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};

// Hook for programmatic notifications
export const useNotifications = () => {
  const { addNotification, removeNotification } = useApp();

  const showNotification = (notification: Omit<Parameters<typeof addNotification>[0], 'id'>) => {
    addNotification(notification);
  };

  const showSuccess = (title: string, message: string, options?: Partial<Parameters<typeof addNotification>[0]>) => {
    showNotification({
      type: 'success',
      title,
      message,
      duration: 4000,
      ...options,
    });
  };

  const showError = (title: string, message: string, options?: Partial<Parameters<typeof addNotification>[0]>) => {
    showNotification({
      type: 'error',
      title,
      message,
      duration: 6000,
      ...options,
    });
  };

  const showWarning = (title: string, message: string, options?: Partial<Parameters<typeof addNotification>[0]>) => {
    showNotification({
      type: 'warning',
      title,
      message,
      duration: 5000,
      ...options,
    });
  };

  const showInfo = (title: string, message: string, options?: Partial<Parameters<typeof addNotification>[0]>) => {
    showNotification({
      type: 'info',
      title,
      message,
      duration: 4000,
      ...options,
    });
  };

  return {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeNotification,
  };
};

