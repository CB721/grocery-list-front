import React from "react";
import Slide from 'react-reveal/Slide';
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
            <div className="notification-list">
                {props.items.map((item) => (
                    <div
                        className={item.acknowledged > 0 ? "notification read" : "notification unread"}
                        key={item.id}
                    >
                        <div className="notification-image">
                            {item.other_user_id ? item.other_user_first_name.charAt(0) + item.other_user_last_name.charAt(0) : "GL"}
                        </div>
                        <div
                            className="notification-content"
                            onClick={() => addressNotification(item)}
                        >
                            {item.content}
                        </div>
                        <div
                            className="delete-notification"
                            onClick={() => props.deleteNotification(item.id)}
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