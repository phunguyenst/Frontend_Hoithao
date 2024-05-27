import Notification from "./Notification"
import React, { useEffect, useState } from 'react'
import EventDataService from "../../services/event.service";

export default function EventNotification() {
  const [notifications, setNotifications] = useState([])
  useEffect(() => {
    EventDataService.getEventNotifications().then(response => {
      setNotifications(response.data);
      console.log(response.data)
    }).catch(e => console.log(e));
  }, [])
  return(
      <Notification 
        notifications = {notifications}
        setNotifications={setNotifications}/>
  )
}