import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from your backend
    const fetchNotifications = async () => {
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>All Notifications</h2>
      <ul>
        {notifications.map((notif) => (
          <li key={notif.id}>
            {notif.message} - {new Date(notif.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
