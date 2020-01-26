import React, { useState } from 'react';
import { Row, Col } from "shards-react";
import Form from "../Form";
import Space from "../DivSpace";
import "./style.scss";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const inputs = [{ email: email }, { password: password }];
    const [checkClass, setCheckClass] = useState("blue");

    function toggleClass(event) {
        event.preventDefault();
        if (checkClass === "done green") {
            setCheckClass("blue");
            localStorage.setItem("remToken", "");
        } else {
            setCheckClass("done green");
            localStorage.setItem("remToken", "user remember me token");
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
                    />
                </Col>
            </Row>
            <Space />

        </div>
    )
}

export default Login;