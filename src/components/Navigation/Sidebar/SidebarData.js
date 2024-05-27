import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title:'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
    },
    {
        title:'Events',
        path: '/events',
        icon: <BsIcons.BsFillCalendarEventFill />,
    },
    {
        title:'Friends',
        path: '/friends',
        icon: <FaIcons.FaUserFriends />,
    },
    {
        title:'Notifications',
        path: '/notifications',
        icon: <IoIcons.IoMdNotificationsOutline />,
    },
]