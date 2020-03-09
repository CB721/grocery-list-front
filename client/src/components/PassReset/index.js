import React, { useState, useEffect } from 'react';
import API from "../../utilities/api";
import { useHistory } from "react-router-dom";
import { Row, Col } from "shards-react";
import { isEmail, isByteLength } from 'validator';
import Form from "../Form";
import "./style.scss";

function PassReset(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disable, setDisabled] = useState(true);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);
    const inputs = [{ email: email }, { "temp password": password }];
    const config = {
        onUploadProgress: progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
        }
    };
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
                if (!isByteLength(value, { min: 8, max: 16 })) {
                    setError("Password must be between 8 and 16 characters");
                } else {
                    setError("");
                }
                break;
            case "password":
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
        if (email && password && error.length < 1) {
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
        } else if (name === "temp password" || name === "password") {
            setPassword(value);
        }
    }
    function handleFormSubmit() {
        console.log("Form submitted");
        console.log(email, password);
        // check for email and password
        // if it matches what is in the db, change form
            // remove email, we know the email matches
            // temp password will now be new password
    }
    return (
        <div className="pass-reset">
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