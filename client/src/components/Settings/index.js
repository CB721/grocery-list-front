import React, { useState, useEffect } from 'react';
import { ReactComponent as View } from "../../assets/images/view.svg";
import { ReactComponent as Send } from "../../assets/images/send.svg";
import { ReactComponent as Trash } from "../../assets/images/trash.svg";
import { convertTimeDiff } from '../../utilities/convertTimeDifference';
import Space from "../DivSpace";
import Button from "../Button";
import "./style.scss";

function Settings(props) {
    const [tab, setTab] = useState("info");
    const [connectTab, setConnectTab] = useState("current");
    const [connectEmail, setConnectEmail] = useState("");
    const [acceptedConnections, setAcceptedConnections] = useState([]);
    const [pendingConnections, setPendingConnections] = useState([]);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setConnectEmail(event.target.value);
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
                    {tab === "info" ? (
                        <div className="settings-info">
                            <div className="info-name">
                                {props.user[0].first_name}
                            </div>
                            <div className="info-name">
                                {props.user[0].last_name}
                            </div>
                            <div className="info-name">
                                {props.user[0].email}
                            </div>

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