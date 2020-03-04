import React, { useState, useEffect } from 'react';
import { Row, Col, Fade } from "shards-react";
import { ReactComponent as Bell } from "../../assets/images/bell.svg";
import SideMenu from "../SideMenu";
import Notifcations from "../Notifications";
import Modal from "../Modal";
import List from "../List";
import Button from "../Button";
import API from "../../utilities/api";
import toastNote from "../../utilities/notification";
import "./style.scss";

function Navbar(props) {
    const [menuExpand, setMenuExpand] = useState("burger-menu");
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadNotificationTotal, setUnreadNotificationTotal] = useState(0);
    const [modal, setModal] = useState(false);
    const [modalList, setModalList] = useState([]);
    const [modalMessage, setModalMessage] = useState("");

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
    function addEntirePreviousList() {
        const addList = {
            list_id: modalList[0].list_id,
            user_id: props.user[0].id
        }
        API.addPreviousListToCurrent(addList)
            .then(() => {
                toastNote.notification("Previous list added to your current list");
            })
            .catch(err => console.log(err));
    }
    function addToCurrentList(item) {
        const listItem = {
            name: item.name,
            user_id: props.user[0].id,
            store_id: item.store_id,
            priority: "Normal",
            position: props.currList.length
        }
        setModalMessage(`${item.name} added!`);
        setTimeout(() => {
            setModalMessage("Click An Item To Add To Current List");
        }, 3000);
        API.addItem(listItem)
            .then(() => {
                toastNote.notification(`${item.name} added to list`);
            })
            .catch(err => console.log(err));
    }
    function openModal(item) {
        props.getListByID(item.list_id)
            .then(res => {
                if (res.length > 0) {
                    setModalList(res);
                    setModal(true);
                    setModalMessage("Click An Item To Add To Current List");
                } else {
                    setModal(false);
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <div>
            {modal ? (
                <Modal
                    open={modal}
                    name={modalList[0].list_name}
                    message={modalMessage}
                    close={setModal}
                    content={<List
                        viewList={false}
                        list={modalList}
                        action={addToCurrentList}
                        hidetrash={"hide-trash"}
                    />}
                    button={<Button
                        text="Add All To Current List"
                        class="white-button"
                        action={addEntirePreviousList}
                    />}
                />
            ) : (<div />)}
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
                                    openModal={openModal}
                                />
                            ) : (<div />)}
                            <div className={menuExpand} onClick={(event) => expandMenu(event)}>
                                <div className="bar1" />
                                <div className="bar2" />
                                <div className="bar3" />
                            </div>
                            {menuExpand === "burger-menu change" ? (
                                <Fade>
                                    <SideMenu 
                                    options={props.options} 
                                    expandMenu={expandMenu} 
                                    logout={props.logout}
                                    />
                                </Fade>
                            ) : (<div />)}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Navbar;