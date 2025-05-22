import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('notification', (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>
            {notif.message} - {new Date(notif.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationCenter;
