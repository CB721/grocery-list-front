import React, { useState, useEffect } from 'react';
import { ReactComponent as View } from "../../assets/images/view.svg";
import { ReactComponent as Send } from "../../assets/images/send.svg";
import { ReactComponent as Trash } from "../../assets/images/trash.svg";
import { ReactComponent as Accept } from "../../assets/images/accept.svg";
import { convertTimeDiff } from '../../utilities/convertTimeDifference';
import { isEmail, isEmpty, isByteLength, isNumeric, isMobilePhone } from 'validator';
import API from "../../utilities/api";
import Space from "../DivSpace";
import Button from "../Button";
import Modal from "../Modal";
import StaticList from "../StaticList";
import LoadingSpinner from "../LoadingSpinner";
import LoadingBar from "../LoadingBar";
import OfflineActions from "../../utilities/offlineActions";
import "./style.scss";

function Settings(props) {
    const [tab, setTab] = useState("info");
    const [connectTab, setConnectTab] = useState("current");
    const [connectEmail, setConnectEmail] = useState("");
    const [acceptedConnections, setAcceptedConnections] = useState([]);
    const [pendingConnections, setPendingConnections] = useState([]);
    const [editFirst, setEditFirst] = useState(false);
    const [editLast, setEditLast] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPhone, setEditPhone] = useState(false);
    const [editPass, setEditPass] = useState(false);
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [newPass, setNewPass] = useState("");
    const [userError, setUserError] = useState("");
    const [editMessage, setEditMessage] = useState("");
    const [modal, setModal] = useState(false);
    const [modalList, setModalList] = useState([]);
    const [modalMessage, setModalMessage] = useState("");
    const [modalName, setModalName] = useState("Your Previous Lists");
    const [selectedConnection, setSelectedConnection] = useState([]);
    const [viewList, setViewList] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [darkToggle, setDarkToggle] = useState(false);
    const [anyStoreToggle, setAnyStoreToggle] = useState(true);
    const config = {
        onUploadProgress: progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
        }
    };
    useEffect(() => {
        if (props.tab) {
            setTab(props.tab);
        }
    }, [props.tab]);
    useEffect(() => {
        if (props.isDark) {
            setDarkToggle(true);
        } else {
            setDarkToggle(false);
        }
    }, [props.isDark]);
    useEffect(() => {
        if (window.screen.availWidth < 500) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [window.screen.availWidth]);
    function handleInputChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case "connection-request":
                setConnectEmail(value);
                break;
            case "first":
                setFirst(value);
                break;
            case "last":
                setLast(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setNewPass(value);
                break;
            case "phone":
                setPhone(value);
                break;
            default:
                return;
        }
    }
    function editInfo(field) {
        switch (field) {
            case "first":
                setEditFirst(true);
                setEditLast(false);
                setEditEmail(false);
                setEditPass(false);
                setEditPhone(false);
                break;
            case "last":
                setEditFirst(false);
                setEditLast(true);
                setEditEmail(false);
                setEditPass(false);
                setEditPhone(false);
                break;
            case "email":
                setEditFirst(false);
                setEditLast(false);
                setEditEmail(true);
                setEditPass(false);
                setEditPhone(false);
                break;
            case "password":
                setEditFirst(false);
                setEditLast(false);
                setEditEmail(false);
                setEditPass(true);
                setEditPhone(false);
                break;
            case "phone":
                setEditFirst(false);
                setEditLast(false);
                setEditEmail(false);
                setEditPass(false);
                setEditPhone(true);
                break;
            default:
                return;
        }
    }

    useEffect(() => {
        const accepted = props.connections.filter(connection => {
            // check that both a connection is no longer pending and that it has been accepted
            if (connection.pending === 0 && connection.accepted === 1) {
                return true;
            } else {
                return false
            }
        });
        const pending = props.connections.filter(connection => {
            // check that a connection is pending and has not been rejected
            if (connection.pending === 1 && connection.accepted === 0) {
                return true;
            } else {
                return false;
            }
        });
        setPendingConnections(pending);
        setAcceptedConnections(accepted);
    }, [props.connections]);
    useEffect(() => {
        document.title = "G-List | Settings";
        // check local storage for any store option
        const anyStore = localStorage.getItem("any-store-option");
        // if it doesn't exist, add it to localstorage and set to true
        if (!anyStore) {
            localStorage.setItem("any-store-option", true);
            // if it does exist, update state accordingly
        } else if (anyStore === "true") {
            setAnyStoreToggle(true);
        } else if (anyStore === "false") {
            setAnyStoreToggle(false);
        }
    }, []);
    useEffect(() => {
        if (editFirst || editLast || editEmail) {
            setEditMessage("Click Here To Stop Editing");
        } else {
            setEditMessage("Click Any Field To Edit");
        }
    }, [editFirst, editLast, editEmail]);
    function exitEdit() {
        setUserError("");
        setEditFirst(false);
        setEditLast(false);
        setEditEmail(false);
        setEditPass(false);
        setEditPhone(false);
    }
    function validateField(event) {
        const type = event.target.name;
        const value = event.target.value;
        // set error message for individual input fields
        switch (type) {
            case "email":
                if (!isEmail(value)) {
                    displayError("Invalid email provided");
                } else {
                    API.checkEmailExists(value)
                        .then(() => {
                            setUserError("");
                        })
                        .catch(err => {
                            displayError(err.response.data);
                            setEmail("");
                        });
                }
                break;
            case "first":
                if (isEmpty(value)) {
                    displayError("First name cannot be blank");
                } else {
                    setUserError("");
                }
                break;
            case "last":
                if (isEmpty(value)) {
                    displayError("Last name cannot be blank");
                } else {
                    setUserError("");
                }
                break;
            case "passowrd":
                if (!isByteLength(value, { min: 8, max: 16 })) {
                    displayError("Password must be between 8 and 16 characters");
                } else {
                    setUserError("");
                }
                break;
            case "phone":
                if (!isByteLength(value, { min: 10, max: 11 }) || !isNumeric(value, true) || !isMobilePhone(value)) {
                    displayError("Invalid phone number")
                } else {
                    setUserError("");
                }
                break;
            default:
                return;
        }
    }
    function editUser(field) {
        let update = {};
        switch (field) {
            case "first":
                update["first_name"] = first;
                break;
            case "last":
                update["last_name"] = last;
                break;
            case "email":
                update["email"] = email;
                break;
            case "password":
                update["user_password"] = newPass;
                break;
            case "phone":
                update["phone"] = phone;
                break;
            default:
                return;
        }
        if (field === "email") {
            API.checkEmailExists(email)
                .then(() => {
                    setUserError("");
                    updateUser();
                })
                .catch(err => {
                    displayError(err.response.data);
                    setEmail("");
                });
        } else {
            updateUser();
        }
        function updateUser() {
            props.updateUser(update)
                .then(() => {
                    setEditFirst(false);
                    setEditLast(false);
                    setEditEmail(false);
                    setEditPass(false);
                    props.notification("Update Successful");
                })
                .catch(err => {
                    exitEdit();
                    displayError(err);
                });
        }
    }
    function getPreviousLists(direction, connection) {
        const listInfo = {
            user_id: props.user[0].id,
            direction: direction
        }
        setSelectedConnection(connection);
        API.getListsByUserID(listInfo)
            .then(res => {
                setModal(true);
                setModalList(res.data);
                setModalMessage(`Click To Send To ${connection.requestor_first_name || connection.requested_first_name}`);
            })
            .catch(err => console.log(err));
    }
    function sendListToUser(list) {
        if (list.other_user_id) {
            API.getListByID(list.list_id, list.other_user_id)
                .then(res => {
                    setModalList(res.data);
                    setViewList(false);
                    setModalMessage("Click to add to your current list");
                })
                .catch(err => console.log(err.response.data));
        } else {
            // other user is who the list is being sent to
            let otherUserId = "";
            if (selectedConnection.requested_id !== props.user[0].id) {
                otherUserId = selectedConnection.requested_id;
            } else {
                otherUserId = selectedConnection.requestor_id;
            }
            const data = {
                other_user_id: props.user[0].id,
                user_id: otherUserId,
                list_id: list.id
            }
            API.createNotification(data)
                .then(() => {
                    setModal(false);
                    setViewList(true);
                    props.notification("List sent!");
                })
                .catch(err => console.log(err.response.data));
        }
    }
    function viewSentLists(connection) {
        setSelectedConnection(connection);
        let otherUserID = "";
        if (connection.requested_id !== props.user[0].id) {
            otherUserID = connection.requested_id;
        } else {
            otherUserID = connection.requestor_id;
        }
        API.getSentLists(props.user[0].id, otherUserID)
            .then(res => {
                setModal(true);
                setModalList(res.data);
                setModalMessage("Click a list to view");
            })
            .catch(err => console.log(err.response.data));
    }
    function addItemToCurrentList(item) {
        const completeItem = {
            name: item.name,
            store_id: item.store_id,
            priority: "Normal",
            user_id: props.user[0].id,
            position: props.currList.length
        }
        API.addItem(completeItem)
            .then(() => {
                props.notification(`${item.name} has been added to your list!`);
            })
            .catch(err => console.log(err.response.data));
    }
    function removeConnection(connection) {
        props.removeConnection(connection.id)
            .then(res => {
                props.notification("Connection removed");
            })
            .catch(err => console.log(err));
    }
    function cancelConnectionRequest(connection) {
        props.cancelConnectionRequest(connection.id)
            .then(res => {
                props.notification(res);
            })
            .catch(err => console.log(err));
    }
    function createConnection() {
        setShowProgress(true);
        setProgress(0);
        props.createConnection(connectEmail, config)
            .then(res => {
                setShowProgress(false);
                props.notification(res);
                setProgress(0);
            })
            .catch(err => {
                console.log(err);
                setProgress(0);
                setShowProgress(false);
            });
    }
    useEffect(() => {
        if (tab === "info") {
            setEditMessage("Click Any Field to Edit");
        } else {
            setEditMessage("");
        }
    }, [tab]);
    function acceptRequest(connection) {
        connection["accepted"] = 1;
        connection["pending"] = 0;
        const { first_name } = props.user[0];
        const { requestor_first_name, requested_first_name } = connection;
        let newConnectName = "";
        if (first_name !== requestor_first_name && requestor_first_name) {
            newConnectName = requestor_first_name;
        } else if (first_name !== requested_first_name && requested_first_name) {
            newConnectName = requested_first_name;
        }
        props.updateConnection(connection)
            .then(res => {
                if (res) {
                    props.notification(`You are now connected with ${newConnectName}!`)
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    function ignoreRequest(connection) {
        connection["pending"] = 0;
        props.updateConnection(connection)
            .then(res => {
                if (res) {
                    props.notification(`Connection ignored`);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    function displayError(message) {
        setUserError(message);
        setTimeout(() => {
            setUserError("");
        }, 5000);
    }
    function toggleDarkMode(event) {
        event.preventDefault();
        let update = {};
        if (darkToggle) {
            localStorage.removeItem("dark-mode");
            update["dark_mode"] = 0;
            setDarkToggle(false);
        } else {
            localStorage.setItem("dark-mode", "yes");
            update["dark_mode"] = 1;
            setDarkToggle(true);
        }
        // update UI to reflect change
        props.toggleDarkMode();
        // update db with newest change
        props.updateUser(update)
            .then()
            .catch(err => console.log(err));
    }
    function toggleAnyStore(event) {
        event.preventDefault();
        if (anyStoreToggle) {
            localStorage.setItem("any-store-option", false);
            setAnyStoreToggle(false);
        } else {
            localStorage.setItem("any-store-option", true);
            setAnyStoreToggle(true);
        }
    }
    return (
        <div aria-label="settings page">
            {modal ? (
                <Modal
                    open={modal}
                    name={modalName}
                    message={modalMessage}
                    close={setModal}
                    content={<StaticList
                        viewList={false}
                        list={modalList}
                        action={viewList ? sendListToUser : addItemToCurrentList}
                        hidetrash={"hide-trash"}
                    />}
                />
            ) : (<div />)}
            <Space />
            {showProgress ? (
                <LoadingBar
                    progress={progress}
                    show={"show"}
                />
            ) : (<div />)}
            <div className="settings">
                {props.user.length > 0 ? (
                    <div>
                        <div className="setting-headers" aria-label="setting selection">
                            <div
                                className={tab === "info" ? "setting-tab selected" : "setting-tab"}
                                onClick={() => setTab("info")}
                                aria-label="view and edit your account information"
                            >
                                Account
                            </div>
                            <div
                                className={tab === "connections" ? "setting-tab selected" : "setting-tab"}
                                onClick={() => setTab("connections")}
                                aria-label="view and edit your connections"
                            >
                                Connect
                            </div>
                            <div
                                className={tab === "options" ? "setting-tab selected" : "setting-tab"}
                                onClick={() => setTab("options")}
                                aria-label="edit view settings"
                            >
                                Options
                            </div>
                        </div>
                        <div className="setting-content">
                            {editMessage && OfflineActions.isOnline() ? (
                                <div className="edit-header" onClick={exitEdit} aria-label={editMessage}>
                                    {editMessage}
                                </div>
                            ) : (
                                    <div />
                                )}
                            {userError.length > 0 ? (
                                <div className="edit-header err" aria-label={"error " + userError}>
                                    {userError}
                                </div>
                            ) : (<div />)}

                            {tab === "info" ? (
                                <div className="settings-info">
                                    {editFirst && OfflineActions.isOnline() ? (
                                        <div aria-label="edit your first name">
                                            <input
                                                type="text"
                                                value={first}
                                                placeholder={props.user[0].first_name || "Your first name"}
                                                name="first"
                                                className="form-input"
                                                onChange={(event) => handleInputChange(event)}
                                                onBlur={(event) => validateField(event)}
                                                aria-label="new first name"
                                            />
                                            <Button
                                                text="Submit"
                                                class="blue-button"
                                                disabled={first.length <= 0 ? true : false}
                                                action={() => editUser("first")}
                                            />
                                        </div>
                                    ) : (
                                            <div
                                                className="info-name"
                                                onClick={() => editInfo("first")}
                                                aria-label="click to edit first name"
                                            >
                                                First Name: {props.user[0].first_name}
                                            </div>
                                        )}
                                    {editLast && OfflineActions.isOnline() ? (
                                        <div aria-label="edit your last name">
                                            <input
                                                type="text"
                                                value={last}
                                                placeholder={props.user[0].last_name || "Your last name"}
                                                name="last"
                                                className="form-input"
                                                onChange={(event) => handleInputChange(event)}
                                                onBlur={(event) => validateField(event)}
                                                aria-label="new last name"
                                            />
                                            <Button
                                                text="Submit"
                                                class="blue-button"
                                                disabled={last.length <= 0 ? true : false}
                                                action={() => editUser("last")}
                                            />
                                        </div>
                                    ) : (
                                            <div
                                                className="info-name"
                                                onClick={() => editInfo("last")}
                                                aria-label="click to edit last name"
                                            >
                                                Last Name: {props.user[0].last_name}
                                            </div>
                                        )}
                                    {editEmail && OfflineActions.isOnline() ? (
                                        <div aria-label="edit your email address">
                                            <input
                                                type="email"
                                                value={email}
                                                placeholder={props.user[0].email || "Your email address"}
                                                name="email"
                                                className="form-input"
                                                onChange={(event) => handleInputChange(event)}
                                                onBlur={(event) => validateField(event)}
                                                aria-label="new email address"
                                            />
                                            <Button
                                                text="Submit"
                                                class="blue-button"
                                                disabled={email.length <= 0 ? true : false}
                                                action={() => editUser("email")}
                                            />
                                        </div>
                                    ) : (
                                            <div
                                                className="info-name"
                                                onClick={() => editInfo("email")}
                                                aria-label="click to edit email address"
                                            >
                                                Email: {props.user[0].email}
                                            </div>
                                        )}
                                    {editPhone && OfflineActions.isOnline() ? (
                                        <div aria-label="edit your phone number">
                                            <input
                                                type="email"
                                                value={phone}
                                                placeholder={props.user[0].phone || "Your phone number"}
                                                name="phone"
                                                className="form-input"
                                                onChange={(event) => handleInputChange(event)}
                                                onBlur={(event) => validateField(event)}
                                                aria-label="new phone number"
                                            />
                                            <Button
                                                text="Submit"
                                                class="blue-button"
                                                disabled={phone.length <= 9 ? true : false}
                                                action={() => editUser("phone")}
                                            />
                                        </div>
                                    ) : (
                                            <div
                                                className="info-name"
                                                onClick={() => editInfo("phone")}
                                                aria-label="click to edit phone number"
                                            >
                                                Phone: {props.user[0].phone || "Add today!"}
                                            </div>
                                        )}
                                    {editPass && OfflineActions.isOnline() ? (
                                        <div aria-label="edit your password">
                                            <input
                                                type="password"
                                                value={newPass}
                                                placeholder={"Your new address"}
                                                name="password"
                                                className="form-input"
                                                onChange={(event) => handleInputChange(event)}
                                                onBlur={(event) => validateField(event)}
                                                aria-label="new password"
                                            />
                                            <Button
                                                text="Submit"
                                                class="blue-button"
                                                disabled={!isByteLength(newPass, { min: 8, max: 16 }) ? true : false}
                                                action={() => editUser("password")}
                                            />
                                        </div>
                                    ) : (
                                            <div
                                                className="info-name"
                                                onClick={() => editInfo("password")}
                                                aria-label="click to change your password"
                                            >
                                                Password
                                            </div>
                                        )}
                                </div>
                            ) : tab === "connections" ? (<div className="settings-connections" aria-label="connection section">
                                <div className="connect-header" aria-label="connection options">
                                    <div
                                        className={connectTab === "current" ? "connect-half selected" : "connect-half"}
                                        onClick={() => setConnectTab("current")}
                                        aria-label="view current connections"
                                    >
                                        Current
                                    </div>
                                    {OfflineActions.isOnline() ? (
                                        <div
                                            className={connectTab === "pending" ? "connect-half selected" : "connect-half"}
                                            onClick={() => setConnectTab("pending")}
                                            aria-label="view pending connection requests"
                                        >
                                            Pending
                                        </div>
                                    ) : (<div />)}
                                </div>
                                {connectTab === "current" ? (
                                    <div className="connect-users-section">
                                        {acceptedConnections.length > 0 ? (
                                            <div aria-label="list of connections">
                                                {acceptedConnections.map(connection => (
                                                    <div
                                                        className="connect-users-row"
                                                        key={connection.id}
                                                    >
                                                        <div className="connect-user-name" aria-label="connection name">
                                                            {`${connection.requestor_first_name || connection.requested_first_name} ${connection.requestor_last_name || connection.requested_last_name}`}
                                                        </div>
                                                        {OfflineActions.isOnline() ? (
                                                            <div className="connect-user-options">
                                                                <div className="option-button">
                                                                    <div className="send-list">
                                                                        <Send
                                                                            className="icon"
                                                                            onClick={() => getPreviousLists("DESC", connection)}
                                                                            aria-label="send connection a list"
                                                                        />
                                                                    </div>
                                                                    <div className="option-tooltip">
                                                                        Send {connection.requestor_first_name || connection.requested_first_name} A List
                                                                </div>
                                                                </div>
                                                                <div className="option-button">
                                                                    <div className="view-list">
                                                                        <View
                                                                            className="icon"
                                                                            onClick={() => viewSentLists(connection)}
                                                                            aria-label="view lists from this connection"
                                                                        />
                                                                    </div>
                                                                    <div className="option-tooltip">
                                                                        View All Lists From {connection.requestor_first_name || connection.requested_first_name}
                                                                    </div>
                                                                </div>
                                                                <div className="option-button">
                                                                    <div className="delete-user">
                                                                        <Trash
                                                                            className="icon"
                                                                            onClick={() => removeConnection(connection)}
                                                                            aria-label="remove this connection"
                                                                        />
                                                                    </div>
                                                                    <div className="option-tooltip">
                                                                        Remove User
                                                                </div>
                                                                </div>
                                                            </div>
                                                        ) : (<div />)}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (<div className="connet-users-row">
                                            {OfflineActions.isOnline() ? (
                                                <div>
                                                    <input
                                                        type="email"
                                                        value={connectEmail}
                                                        placeholder="Type email here"
                                                        name="connection-request"
                                                        className="form-input"
                                                        onChange={(event) => handleInputChange(event)}
                                                        aria-label="email address of new connection request"
                                                    />
                                                    <Button
                                                        text="Send Connection Request"
                                                        class="blue-button"
                                                        action={createConnection}
                                                    />
                                                </div>
                                            ) : (<div />)}
                                        </div>)}
                                    </div>
                                ) : (<div className="connect-users-section">
                                    <div className="connet-users-row">
                                        {OfflineActions.isOnline() ? (
                                            <div>
                                                <input
                                                    type="email"
                                                    value={connectEmail}
                                                    placeholder="Type email here"
                                                    name="connection-request"
                                                    className="form-input"
                                                    onChange={(event) => handleInputChange(event)}
                                                    aria-label="email address of new connection request"
                                                />
                                                <Button
                                                    text="Send Connection Request"
                                                    class="blue-button"
                                                    action={createConnection}
                                                />
                                            </div>
                                        ) : (<div />)}
                                    </div>
                                    {pendingConnections.length > 0 ? (
                                        <div aria-label="pending connections">
                                            {pendingConnections.map(connection => (
                                                <div
                                                    className="connect-users-row"
                                                    key={connection.id}
                                                >
                                                    <div className="connect-user-name" aria-label="connection request name">
                                                        {`${connection.requestor_first_name || connection.requested_first_name} ${connection.requestor_last_name || connection.requested_last_name}`}
                                                    </div>
                                                    <div className="connect-user-options" aria-label="pending connection options">
                                                        {isMobile ? (
                                                            <div />
                                                        ) : (
                                                                <div className="option-button">
                                                                    {connection.requested_email ? (
                                                                        <div className="time-difference" aria-label="time since connection request">
                                                                            {`Received ${convertTimeDiff(connection.time_difference)}`}
                                                                        </div>
                                                                    ) : (
                                                                            <div className="time-difference" aria-label="time since connection request">
                                                                                {`Sent ${convertTimeDiff(connection.time_difference)}`}
                                                                            </div>
                                                                        )}
                                                                </div>
                                                            )}
                                                        {/* if there is requested email, than this is a received request.  otherwise it was sent */}
                                                        {connection.requested_email ? (
                                                            <div className="option-button">
                                                                <div className="send-list">
                                                                    <Accept
                                                                        className="icon"
                                                                        onClick={() => acceptRequest(connection)}
                                                                        aria-label="accept connection request"
                                                                    />
                                                                </div>
                                                                <div className="option-tooltip">
                                                                    Accept Request
                                                            </div>
                                                            </div>
                                                        ) : (
                                                                <div />
                                                            )}
                                                        {connection.requested_email ? (
                                                            <div className="option-button">
                                                                <div className="delete-user">
                                                                    <Trash
                                                                        className="icon"
                                                                        onClick={() => ignoreRequest(connection)}
                                                                        aria-label="ignore connection request"
                                                                    />
                                                                </div>
                                                                <div className="option-tooltip">
                                                                    Ignore Request
                                                                </div>
                                                            </div>
                                                        ) : (
                                                                <div className="option-button">
                                                                    <div className="delete-user">
                                                                        <Trash
                                                                            className="icon"
                                                                            onClick={() => cancelConnectionRequest(connection)}
                                                                            aria-label="cancel connection request"
                                                                        />
                                                                    </div>
                                                                    <div className="option-tooltip">
                                                                        Cancel Request
                                                                    </div>
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (<div />)}
                                </div>)}
                            </div>) : (<div className="settings-info">
                                <div className="settings-view-options">
                                    <div className="view-options-header">
                                        Dark Mode
                                    </div>
                                    <div className="view-options-header">
                                        <div className="toggle-dark-mode">
                                            <label
                                                className="switch"
                                                onClick={(event) => toggleDarkMode(event)}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={darkToggle}
                                                />
                                                <span className="slider round dark"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="view-options-header">
                                        Any Store
                                    </div>
                                    <div className="view-options-header">
                                        <div className="toggle-dark-mode">
                                            <label
                                                className="switch"
                                                onClick={(event) => toggleAnyStore(event)}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={anyStoreToggle}
                                                />
                                                <span className="slider round any-store"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="view-options-header">
                                        Logout
                                    </div>
                                    <div className="view-options-header">
                                        <button onClick={props.logout}>Logout</button>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                ) : (<LoadingSpinner />)}
            </div>
        </div>
    )
}

export default Settings;