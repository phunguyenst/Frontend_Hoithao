import React, { useState } from 'react';
import { NotificationContext } from './NotificationContext';

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};