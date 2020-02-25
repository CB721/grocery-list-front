import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { isEmail, isByteLength } from 'validator';
import { Row, Col } from "shards-react";
import Form from "../Form";
import Space from "../DivSpace";
import "./style.scss";

function Login(props) {
    useEffect(() => {
        document.title = document.title + " | Login";
    }, []);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const inputs = [{ email: email }, { password: password }];
    const [checkClass, setCheckClass] = useState("blue");
    const [disable, setDisabled] = useState(true);
    const [error, setError] = useState("");
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        setError(props.error);
    }, [props.error]);
    function toggleClass(event) {
        event.preventDefault();
        if (checkClass === "done green") {
            setCheckClass("blue");
            setRemember(false);
        } else {
            setCheckClass("done green");
            setRemember(true);
        }
    }
    function handleInputChange(event) {
        let value = event.target.value.trim();
        const name = event.target.name.trim();
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
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
    let history = useHistory();
    function handleFormSubmit() {
        props.userLogin(email, password, remember)
            .then(res => {
                console.log(res);
                history.push("/profile");
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="login">
            <Space />
            <Row>
                <Col>
                    <Form
                        inputs={inputs}
                        type="login"
                        checkClass={checkClass}
                        toggleClass={toggleClass}
                        handleInputChange={handleInputChange}
                        disableButton={disable}
                        error={error}
                        validateField={validateField}
                        action={handleFormSubmit}
                    />
                </Col>
            </Row>
            <Space />

        </div>
    )
}

export default Login;