import React, { useState, useEffect } from 'react';
import API from "../../utilities/api";
import { useHistory } from "react-router-dom";
import LoadingBar from "../LoadingBar";
import { Row, Col } from "shards-react";
import { isEmail, isByteLength } from 'validator';
import Form from "../Form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import "./style.scss";

function PassReset(props) {
    const [email, setEmail] = useState("");
    const [tempPass, setTempPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [confirmErr, setConfirmErr] = useState("");
    const [disable, setDisabled] = useState(true);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);
    const inputs = [
        { email: email },
        { "temp password": tempPass },
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
                } else {
                    setError("");
                }
                break;
            default:
                return;
        }
        // check that all fields are completed with no errors before activating submit button
        if (email && tempPass && newPass && confirmPass && error.length < 1) {
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
        }
    }
    function handleFormSubmit() {
        if (newPass === confirmPass) {
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
                    console.log(res.data);
                    // if (res.data === "User password updated") {
                    //     notification("Password succesfully updated!");
                    //     setTimeout(() => {
                    //         history.push("/login");
                    //     }, 3000);
                    // }
                })
                .catch(err => {
                    setError(err.response);
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
                    <Form
                        inputs={inputs}
                        type="Password Reset"
                        disableButton={disable}
                        error={error}
                        validateField={validateField}
                        handleInputChange={handleInputChange}
                        action={handleFormSubmit}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default PassReset;