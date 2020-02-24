import React, { useState, useEffect } from 'react';
import { Row, Col, Fade } from "shards-react";
import { ReactComponent as Bell } from "../../assets/images/bell.svg";
import SideMenu from "../SideMenu";
import Notifcations from "../Notifications";
import "./style.scss";

function Navbar(props) {
    const [menuExpand, setMenuExpand] = useState("burger-menu");
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadNotificationTotal, setUnreadNotificationTotal] = useState(0);

    useEffect(() => {
        // if there are any notifications
        if (props.notifications.length > 0) {
            // check for how many are unread and update total
            let total = 0;
            for (let i = 0; i < props.notifications.length; i++) {
                if (props.notifications[i].acknowledged === 0) {
                    total += 1;
                }
            }
            setUnreadNotificationTotal(total);
        }
    }, [props.notifications]);

    function expandMenu(event) {
        event.preventDefault();
        if (menuExpand === "burger-menu") {
            setMenuExpand("burger-menu change");
            setShowNotifications(false);
        } else {
            setMenuExpand("burger-menu");
        }
    }
    function goToHome(event) {
        event.preventDefault();
        window.location.href = "/";
    }
    return (
        <Row>
            <Col>
                <div className="nav">
                    <div className="nav-items" />
                    <div className="app-text" onClick={(event) => goToHome(event)}>
                        G-List
                    </div>
                    <div className="nav-items">
                        {props.isLogged > 0 ? (
                            <div className="notification-section">
                                <Bell
                                    className="notification-bell"
                                    onClick={() => setShowNotifications(!showNotifications)}
                                />
                                {unreadNotificationTotal > 0 ? (
                                    <p className="notification">
                                        {unreadNotificationTotal}
                                    </p>
                                ) : (<div />)}
                            </div>
                        ) : (<div />)}
                        {showNotifications ? (
                            <Notifcations
                                items={props.notifications}
                                markNotificationAsRead={props.markNotificationAsRead}
                                deleteNotification={props.deleteNotification}
                            />
                        ) : (<div />)}
                        <div className={menuExpand} onClick={(event) => expandMenu(event)}>
                            <div className="bar1" />
                            <div className="bar2" />
                            <div className="bar3" />
                        </div>
                        {menuExpand === "burger-menu change" ? (
                            <Fade>
                                <SideMenu options={props.options} expandMenu={expandMenu} />
                            </Fade>
                        ) : (<div />)}
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Navbar;