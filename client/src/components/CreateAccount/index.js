import React, { useState, useEffect } from 'react';
import { isEmail, isByteLength, isEmpty } from 'validator';
import { Row, Col } from "shards-react";
import Form from "../Form";
import Space from "../DivSpace";
import "./style.scss";

function CreateAccount(props) {
    useEffect(() => {
        document.title = document.title + " | Create Account";
    }, []);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const inputs = [
        { "first name": firstName },
        { "last name": lastName },
        { email: email },
        { password: password }
    ];
    const [disable, setDisabled] = useState(true);
    const [error, setError] = useState("");

    function handleInputChange(event) {
        let value = event.target.value.trim();
        const name = event.target.name.trim();
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "first name":
                setFirstName(value);
                break;
            case "last name":
                setLastName(value);
                break;
            default:
                return;
        }
    }
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
            case "password":
                if(!isByteLength(value, {min: 8, max: 16})) {
                    setError("Password must be between 8 and 16 characters");
                } else {
                    setError("");
                }
                break;
            case "first name":
                if (isEmpty(value)) {
                    setError("Name cannot be blank");
                } else {
                    setError("");
                }
                break;
            case "last name":
                if (isEmpty.value) {
                    setError("Name cannot be blank");
                } else {
                    setError("");
                }
                break;
            default:
                return;
        }
        // check that all fields are completed with no errors before activating submit button
        if (email && password && firstName && lastName && error.length < 1) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }
    return (
        <div className="create-account">
            <Space />
            <Row>
                <Col>
                    <Form
                        inputs={inputs}
                        type="create account"
                        handleInputChange={handleInputChange}
                        disableButton={disable}
                        error={error}
                        validateField={validateField}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default CreateAccount;