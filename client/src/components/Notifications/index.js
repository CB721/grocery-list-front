import React from "react";
import Slide from 'react-reveal/Slide';
import { convertTimeDiff } from '../../utilities/convertTimeDifference';
import "./style.scss";

function Notifications(props) {
    function addressNotification(item) {
        props.markNotificationAsRead(item.id);
        // if a list exists, pop up modal with option to add items from it to current list
        if (item.list_id) {
            props.openModal(item)
        }
        // add option to view and accept user connections
    }
    return (
        <Slide right>
            <div className="notification-list" aria-label="notification list">
                {props.items.map((item) => (
                    <div
                        className={item.acknowledged > 0 ? "notification read" : "notification unread"}
                        aria-label={item.acknowledged > 0 ? "notification read" : "notification unread"}
                        key={item.id}
                    >
                        <div className="notification-image" aria-label="notification image">
                            {item.other_user_id ? item.other_user_first_name.charAt(0) + item.other_user_last_name.charAt(0) : "GL"}
                        </div>
                        <div
                            className="notification-content"
                            onClick={() => addressNotification(item)}
                            aria-label="mark notification as read"
                        >
                            <div className="note-content-section" aria-label="notification content">
                                {item.content}
                            </div>
                            <div className="note-content-section gray-text" aria-label="time since notification was created">
                                {convertTimeDiff(item.time_difference)}
                            </div>
                        </div>
                        <div
                            className="delete-notification"
                            onClick={() => props.deleteNotification(item.id)}
                            aria-label="remove notification"
                        >
                            X
                        </div>
                    </div>
                ))}
            </div>
        </Slide>
    )
}

export default Notifications;