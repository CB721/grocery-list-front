import React, { useState } from 'react';
import { Row, Col } from "shards-react";
import Form from "../Form";
import Space from "../DivSpace";
import "./style.scss";

function CreateAccount(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setuserName] = useState("");
    const [confirmPass, setconfirmPass] = useState("");
    const inputs = [{username: userName},{ email: email }, { password: password }, {"confirm password" : confirmPass}];

    function handleInputChange(event) {
        let value = event.target.value.trim();
        const name = event.target.name.trim();
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "username") {
            setuserName(value);
        } else if (name === "confirm password") {
            setconfirmPass(value);
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
                    />
                </Col>
            </Row>
        </div>
    )
}

export default CreateAccount;