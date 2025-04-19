import { useState, useEffect, useRef } from 'react';
import { Bell, Check, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning';
  message: string;
  time: string;
  isRead: boolean;
  link?: string;
}

interface NotificationsDropdownProps {
  onClose: () => void;
}

const NotificationsDropdown = ({ onClose }: NotificationsDropdownProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      message: 'Your rental request for "Bosch Power Drill" has been approved',
      time: '10 minutes ago',
      isRead: false,
      link: '/rentals'
    },
    {
      id: '2',
      type: 'info',
      message: 'Reminder: Your rental of "Canon DSLR Camera" is due tomorrow',
      time: '1 hour ago',
      isRead: false,
      link: '/rentals'
    },
    {
      id: '3',
      type: 'warning',
      message: 'Action required: Complete your verification to increase trust score',
      time: '2 days ago',
      isRead: true,
      link: '/profile'
    }
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check size={16} className="text-green-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-yellow-500" />;
      default:
        return <Clock size={16} className="text-blue-500" />;
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 animate-fade-in"
    >
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-800">Notifications</h3>
          <span className="px-2 py-1 bg-gray-100 text-xs font-medium rounded-full">
            {notifications.filter(n => !n.isRead).length} new
          </span>
        </div>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <Link
              to={notification.link || '#'}
              key={notification.id}
              className={`block p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                !notification.isRead ? 'bg-blue-50' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${!notification.isRead ? 'font-medium' : 'text-gray-600'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            <Bell size={24} className="mx-auto mb-2 text-gray-400" />
            <p>No notifications yet</p>
          </div>
        )}
      </div>
      
      <div className="p-2 border-t border-gray-200 bg-gray-50">
        <button 
          className="w-full px-3 py-2 text-sm text-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          onClick={() => {
            setNotifications(notifications.map(n => ({ ...n, isRead: true })));
          }}
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
};

export default NotificationsDropdown;