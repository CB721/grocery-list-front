import React from "react";
import Slide from 'react-reveal/Slide';
import "./style.scss";

function Notifications(props) {
    return (
        <Slide right>
            <div className="notification-list">
                {props.items.map((item) => (
                    <div
                        className={item.acknowledged > 0 ? "notification read" : "notification unread"}
                        key={item.id}
                    >
                        <div className="notification-content">
                            {item.content}
                        </div>
                        <div className="delete-notification">X</div>
                    </div>
                ))}
            </div>
        </Slide>
    )
}

export default Notifications;