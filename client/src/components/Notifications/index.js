import React from "react";
import Slide from 'react-reveal/Slide';
import momentTimeZone from "moment-timezone";
import moment from "moment";
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

    function convertDate(date) {
        // remove negative from string
        const time = date.substr(1);
        // save hours, minutes and seconds to variables and convert to numbers
        const hours = parseInt(time.split(":")[0]);
        const minutes = parseInt(time.split(":")[1]);
        const seconds = parseInt(time.split(":")[2]);
        // string to reference for return to JSX
        let timeStr = "";
        // if it has been more than an hour, only display hours
        if (minutes > 59 || hours >= 1) {
            // if it has been more than a day, only display days
            if (hours < 24) {
                timeStr = `${hours} hours ago`;
                // if it isn't more than a day, only display singular days
            } else if (hours >= 24 && hours < 48) {
                timeStr = `1 day ago`;
            } else {
                timeStr = `${Math.floor(hours / 24)} days ago`;
            }
        // if it has been less than a minute, only display seconds
        } else if (minutes < 1 && seconds > 0) {
            timeStr = `${seconds} seconds ago`;
        // otherwise, just display minutes
        } else {
            timeStr = `${minutes} minuts ago`;
        }
        return timeStr;
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
                            <div className="note-content-section">
                                {item.content}
                            </div>
                            <div className="note-content-section gray-text">
                                {convertDate(item.time_difference)}
                            </div>
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