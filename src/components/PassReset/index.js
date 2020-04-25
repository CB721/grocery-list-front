import React, { useState, useEffect } from 'react';
import API from "../../utilities/api";
import { useHistory } from "react-router-dom";
import LoadingBar from "../LoadingBar";
import { Row, Col } from "shards-react";
import { isEmail, isByteLength, isMobilePhone } from 'validator';
import Form from "../Form";
import Button from "../Button";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import "./style.scss";

function PassReset(props) {
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState();
    const [tempPass, setTempPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [confirmErr, setConfirmErr] = useState("");
    const [disable, setDisabled] = useState(true);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);
    const [resetOption, setResetOption] = useState("");

    const emailInputs = [
        { email: email },
        { "temp password": tempPass },
        { "new password": newPass },
        {
            "confirm password": confirmPass,
            error: confirmErr
        }
    ];
    const textInputs = [
        { number: number },
        { "code": tempPass },
        { "new password": newPass },
        {
            "confirm password": confirmPass,
            error: confirmErr
        }
    ];
    const config = {
        onUploadProgress: progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
        }
    };
    function notification(message) {
        toast(message, {
            className: css({
                background: '#3C91E6',
                boxShadow: '0px 13px 12px -12px rgba(47,51,56,0.64)',
                borderRadius: '8px',
                border: "3px solid #F9FCFF",
                textTransform: "capitalize"
            }),
            bodyClassName: css({
                fontSize: '20px',
                color: '#F9FCFF'
            }),
            progressClassName: css({
                background: "linear-gradient(90deg, rgb(86,149,211) 0%, rgb(249,252,255) 80%)"
            })
        });
    }
    let history = useHistory();
    useEffect(() => {
        setError(props.error);
    }, [props.error]);
    useEffect(() => {
        document.title = "G-List | Password Reset";
    }, []);
    function validateField(event) {
        const type = event.target.name;
        const value = event.target.value;
        // set error message for individual input fields
        switch (type) {
            case "email":
                if (!isEmail(value)) {
                    setError("Invalid email provided");
                } else {
                    setError("");
                }
                break;
            case "temp password":
                if (!isByteLength(value, { min: 8, max: 32 })) {
                    setError("Temporary password must be between 8 and 32 characters");
                } else {
                    setError("");
                }
                break;
            case "new password":
                if (!isByteLength(value, { min: 8, max: 16 })) {
                    setError("Password must be between 8 and 16 characters");
                } else {
                    setError("");
                }
                break;
            case "confirm password,error":
                if (!isByteLength(value, { min: 8, max: 16 })) {
                    setError("Password must be between 8 and 16 characters");
                } else if (value !== newPass) {
                    setError("Passwords must match");
                } else {
                    setError("");
                }
                break;
            case "number":
                if (!isMobilePhone(value) || value.toString().length < 10) {
                    setError("Invalid phone number");
                } else {
                    setError("");
                }
                break;
            case "code":
                if (value.length !== 6) {
                    setError("Invalid code");
                } else {
                    setError("");
                }
                break;
            default:
                return;
        }
        // check that all fields are completed with no errors before activating submit button
        if ((email || number) && tempPass && newPass && confirmPass && (newPass === confirmPass) && error.length < 1) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }
    function handleInputChange(event) {
        let value = event.target.value.trim();
        const name = event.target.name.trim();
        if (name === "email") {
            setEmail(value);
        } else if (name === "temp password") {
            setTempPass(value)
        } else if (name === "new password") {
            setNewPass(value);
        } else if (name === "confirm password,error") {
            setConfirmPass(value);
        } else if (name === "number") {
            setNumber(value);
        } else if (name === "code") {
            setTempPass(value);
        }
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        if (newPass === confirmPass && resetOption === "email") {
            const data = {
                email,
                temp: tempPass,
                update: newPass
            }
            setShowProgress(true);
            setProgress(0);
            API.updatePasswordReset(data, config)
                .then(res => {
                    setShowProgress(false);
                    setProgress(0);
                    if (res.data === "User password updated") {
                        notification("Password succesfully updated!");
                        history.push("/login");
                    }
                })
                .catch(err => {
                    setShowProgress(false);
                    setProgress(0);
                    setError(err.response.data);
                });
        } else if (newPass === confirmPass && resetOption === "mobile") {
            const data = {
                number,
                code: tempPass,
                update: newPass
            }
            setShowProgress(true);
            setProgress(0);
            API.updatePasswordTextReset(data, config)
                .then(res => {
                    setShowProgress(false);
                    setProgress(0);
                    if (res.data === "success") {
                        notification("Password succesfully updated!");
                        history.push("/login");
                    }
                })
                .catch(err => {
                    setShowProgress(false);
                    setProgress(0);
                    setError(err.response.data);
                });
        } else {
            setConfirmErr("input-error");
            setError("New passwords do not match");
        }
    }
    return (
        <div className="pass-reset">
            {showProgress ? (
                <LoadingBar
                    progress={progress}
                    show={"show"}
                />
            ) : (<div />)}
            <Row>
                <Col>
                    {!resetOption ? (
                        <div className="reset-options">
                            <p className="options">
                                Select a reset option
                            </p>
                            {/* place a button for each option */}
                            <Button
                                text="Mobile"
                                class="blue-button"
                                action={() => setResetOption("mobile")}
                            />
                            <Button
                                text="Email"
                                class="green-button"
                                action={() => setResetOption("email")}
                            />
                        </div>
                    ) : resetOption === "mobile" ? (
                        <Form
                            inputs={textInputs}
                            type="Password Reset"
                            disableButton={disable}
                            error={error}
                            validateField={validateField}
                            handleInputChange={handleInputChange}
                            action={handleFormSubmit}
                        />
                    ) : resetOption === "email" ? (
                        <Form
                            inputs={emailInputs}
                            type="Password Reset"
                            disableButton={disable}
                            error={error}
                            validateField={validateField}
                            handleInputChange={handleInputChange}
                            action={handleFormSubmit}
                        />
                    ) : (<div />)}
                </Col>
            </Row>
        </div>
    )
}

export default PassReset;