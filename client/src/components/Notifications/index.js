import React from "react";
import Slide from 'react-reveal/Slide';
import "./style.scss";

function Notifications(props) {
    function addressNotification(item) {
        props.markNotificationAsRead(item.id);
        if (item.other_user_id > 60) {

        }
        if (item.list_id) {

        }
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
                            GL
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