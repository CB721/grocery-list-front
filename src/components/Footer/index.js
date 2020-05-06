import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Bell } from "../../assets/images/bell.svg";
import "./style.scss";

function Footer(props) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadNotificationTotal, setUnreadNotificationTotal] = useState(0);
    const [footerOptions, setFooterOptions] = useState([]);
    const date = new Date();
    const currentYear = date.getFullYear();
    const isMobile = window.screen.availWidth < 500 ? true : false;
    let history = useHistory();
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
    useEffect(() => {
        // remove logout option from footer, it is placed in settings on mobile
        const filteredOptions = props.navOptions.filter(option => option.name !== "Logout");
        // if the first option is the profile, move it to the last option so it is placed in the middle
        if (filteredOptions[0].name === "Profile") {
            let profileOption = filteredOptions.shift();
            filteredOptions.push(profileOption);
        }
        setFooterOptions(filteredOptions);
    }, [props.navOptions])
    function goToSelectedPage(event, path) {
        event.preventDefault();
        // redirect to selected page
        history.push(path);
        // close bottom menu
        // props.expandMenu(event);
    }
    return (
        <div className="footer">
            {isMobile ? (
                <div className="footer-mobile-nav">
                    {footerOptions.map((option, index) => (
                        <div
                            className="mobile-nav-link"
                            key={index}
                            onClick={(event) => goToSelectedPage(event, option.link)}
                        >
                            {option.name}
                        </div>
                    ))}
                    {props.navOptions.some(option => option.name === "Join") ? (
                        <div />
                    ) : (
                            <div className="mobile-nav-link">
                                <Bell
                                    className="footer-bell"
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    aria-label={showNotifications ? "close notification panel" : "open notification panel"}
                                />
                                {unreadNotificationTotal > 0 ? (
                                    <p className="footer-notification" aria-label={unreadNotificationTotal + " unread notifications"}>
                                        {unreadNotificationTotal}
                                    </p>
                                ) : (<div />)}
                            </div>
                        )}
                </div>
            ) : (
                    <span aria-label={"copyright " + currentYear + " Clint Brodar"}>Copyright &copy; {currentYear} G-List</span>
                )
            }
        </div>
    )
}

export default Footer;