import React, { useState, useEffect } from 'react';
import Space from "../DivSpace";
import Button from "../Button";
import "./style.scss";

function Settings(props) {
    const [tab, setTab] = useState("info");
    const [connectEmail, setConnectEmail] = useState("");

    function handleInputChange(event) {
        const { name, value } = event.target;
        setConnectEmail(event.target.value);
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
                        {props.connections && props.connections.length > 0 ? (
                            // map over connections
                            <div>
                            </div>
                        ) : (<div>
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
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default Settings;