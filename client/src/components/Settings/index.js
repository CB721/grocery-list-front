import React, { useState, useEffect } from 'react';
import { ReactComponent as View } from "../../assets/images/view.svg";
import { ReactComponent as Send } from "../../assets/images/send.svg";
import { ReactComponent as Trash } from "../../assets/images/trash.svg";
import { convertTimeDiff } from '../../utilities/convertTimeDifference';
import { isEmail, isEmpty } from 'validator';
import Space from "../DivSpace";
import Button from "../Button";
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
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [userError, setUserError] = useState("");
    const [editMessage, setEditMessage] = useState("Click Any Field Edit");

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
                break;
            case "last":
                setEditFirst(false);
                setEditLast(true);
                setEditEmail(false);
                break;
            case "email":
                setEditFirst(false);
                setEditLast(false);
                setEditEmail(true);
                break;
            default:
                return;
        }
    }

    useEffect(() => {
        const accepted = props.connections.filter(connection => {
            // check that both a connection is no longer pending and that it has been accepted
            if (connection.pending === 0 && connection.accepted === 1) {
                return connection;
            }
        });
        const pending = props.connections.filter(connection => {
            // check that a connection is pending and has not been rejected
            if (connection.pending === 1 && connection.accepted === 0) {
                return connection;
            }
        });
        setPendingConnections(pending);
        setAcceptedConnections(accepted);
    }, [props.connections]);
    useEffect(() => {
        document.title = "G-List | Settings";
    }, []);
    useEffect(() => {
        if (editFirst || editLast || editEmail) {
            setEditMessage("Click To Stop Editing");
        } else {
            setEditMessage("Click Any Field Edit");
        }
    }, [editFirst, editLast, editEmail]);
    function exitEdit() {
        setEditFirst(false);
        setEditLast(false);
        setEditEmail(false);
    }
    function validateField(event) {
        const type = event.target.name;
        const value = event.target.value;
        // set error message for individual input fields
        switch (type) {
            case "email":
                if (!isEmail(value)) {
                    setUserError("Invalid email provided");
                } else {
                    setUserError("");
                }
                break;
            case "first":
                if (isEmpty(value)) {
                    setUserError("First name cannot be blank");
                } else {
                    setUserError("");
                }
                break;
            case "last":
                if (isEmpty(value)) {
                    setUserError("Last name cannot be blank");
                } else {
                    setUserError("");
                }
                break;
            default:
                return;
        }
    }
    return (
        <div>
            <Space />
            <div className="settings">
                <div className="setting-headers">
                    <div
                        className={tab === "info" ? "setting-tab selected" : "setting-tab"}
                        onClick={() => setTab("info")}
                    >
                        View Info
                </div>
                    <div
                        className={tab === "connections" ? "setting-tab selected" : "setting-tab"}
                        onClick={() => setTab("connections")}
                    >
                        View Connections
                    </div>
                </div>
                <div className="setting-content">
                    <div className="edit-header" onClick={exitEdit}>
                        {editMessage}
                    </div>
                    {userError.length > 0 ? (
                        <div className="edit-header err">
                            {userError}
                        </div>
                    ) : (<div />)}
                    {tab === "info" ? (
                        <div className="settings-info">
                            {editFirst ? (
                                <div>
                                    <input
                                        type="text"
                                        value={first}
                                        placeholder={props.user[0].first_name || "Your first name"}
                                        name="first"
                                        className="form-input"
                                        onChange={(event) => handleInputChange(event)}
                                        onBlur={(event) => validateField(event)}
                                    />
                                    <Button
                                        text="Submit"
                                        class="blue-button"
                                        disabled={first.length <= 0 ? true : false}
                                    />
                                </div>
                            ) : (
                                    <div
                                        className="info-name"
                                        onClick={() => editInfo("first")}
                                    >
                                        First Name: {props.user[0].first_name}
                                    </div>
                                )}
                            {editLast ? (
                                <div>
                                    <input
                                        type="text"
                                        value={last}
                                        placeholder={props.user[0].last_name || "Your last name"}
                                        name="last"
                                        className="form-input"
                                        onChange={(event) => handleInputChange(event)}
                                    />
                                    <Button
                                        text="Submit"
                                        class="blue-button"
                                        disabled={last.length <= 0 ? true : false}
                                    />
                                </div>
                            ) : (
                                    <div
                                        className="info-name"
                                        onClick={() => editInfo("last")}
                                    >
                                        Last Name: {props.user[0].last_name}
                                    </div>
                                )}
                            {editEmail ? (
                                <div>
                                    <input
                                        type="email"
                                        value={email}
                                        placeholder={props.user[0].email || "Your email address"}
                                        name="email"
                                        className="form-input"
                                        onChange={(event) => handleInputChange(event)}
                                    />
                                    <Button
                                        text="Submit"
                                        class="blue-button"
                                        disabled={email.length <= 0 ? true : false}
                                    />
                                </div>
                            ) : (
                                    <div
                                        className="info-name"
                                        onClick={() => editInfo("email")}
                                    >
                                        Email: {props.user[0].email}
                                    </div>
                                )}
                        </div>
                    ) : (<div className="settings-connections">
                        <div className="connect-header">
                            <div
                                className={connectTab === "current" ? "connect-half selected" : "connect-half"}
                                onClick={() => setConnectTab("current")}
                            >
                                Current
                            </div>
                            <div
                                className={connectTab === "pending" ? "connect-half selected" : "connect-half"}
                                onClick={() => setConnectTab("pending")}
                            >
                                Pending
                            </div>
                        </div>
                        {connectTab === "current" ? (
                            <div className="connect-users-section">
                                {acceptedConnections.length > 0 ? (
                                    <div>
                                        {acceptedConnections.map(connection => (
                                            <div
                                                className="connect-users-row"
                                                key={connection.id}
                                            >
                                                <div className="connect-user-name">
                                                    {`${connection.requestor_first_name || connection.requested_first_name} ${connection.requestor_last_name || connection.requested_last_name}`}
                                                </div>
                                                <div className="connect-user-options">
                                                    <div className="option-button">
                                                        <div className="send-list">
                                                            <Send className="icon" />
                                                        </div>
                                                        <div className="option-tooltip">
                                                            Send {connection.requestor_first_name || connection.requested_first_name} A List
                                                        </div>
                                                    </div>
                                                    <div className="option-button">
                                                        <div className="view-list">
                                                            <View className="icon" />
                                                        </div>
                                                        <div className="option-tooltip">
                                                            View All Lists From {connection.requestor_first_name || connection.requested_first_name}
                                                        </div>
                                                    </div>
                                                    <div className="option-button">
                                                        <div className="delete-user">
                                                            <Trash className="icon" />
                                                        </div>
                                                        <div className="option-tooltip">
                                                            Remove User
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (<div className="connet-users-row">
                                    <input
                                        type="email"
                                        value={connectEmail}
                                        placeholder="Type email here"
                                        name="connection-request"
                                        className="form-input"
                                        onChange={(event) => handleInputChange(event)}
                                    />
                                    <Button
                                        text="Send Connection Request"
                                        class="blue-button"
                                    />
                                </div>)}
                            </div>
                        ) : (<div className="connect-users-section">
                            <div className="connet-users-row">
                                <input
                                    type="email"
                                    value={connectEmail}
                                    placeholder="Type email here"
                                    name="connection-request"
                                    className="form-input"
                                    onChange={(event) => handleInputChange(event)}
                                />
                                <Button
                                    text="Send Connection Request"
                                    class="blue-button"
                                />
                            </div>
                            {pendingConnections.length > 0 ? (
                                <div>
                                    {pendingConnections.map(connection => (
                                        <div
                                            className="connect-users-row"
                                            key={connection.id}
                                        >
                                            <div className="connect-user-name">
                                                {`${connection.requestor_first_name || connection.requested_first_name} ${connection.requestor_last_name || connection.requested_last_name}`}
                                            </div>
                                            <div className="connect-user-options">
                                                <div className="option-button-double">
                                                    <div className="time-difference">
                                                        {`Sent ${convertTimeDiff(connection.time_difference)}`}
                                                    </div>
                                                </div>
                                                <div className="option-button">
                                                    <div className="delete-user">
                                                        <Trash className="icon" />
                                                    </div>
                                                    <div className="option-tooltip">
                                                        Cancel Request
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (<div />)}
                        </div>)}
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default Settings;