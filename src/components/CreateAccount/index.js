import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { isEmail, isByteLength, isEmpty } from 'validator';
import { Row, Col } from "shards-react";
import Form from "../Form";
import Space from "../DivSpace";
import Modal from "../Modal";
import LoadingBar from "../LoadingBar";
import API from '../../utilities/api';
import "./style.scss";

function CreateAccount(props) {
    useEffect(() => {
        document.title = "G-List | Create Account";
    }, []);
    useEffect(() => {
        if (props.user.length === 1) {
            history.push("/profile");
        }
    }, [props.user]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const inputs = [
        { "first name": firstName },
        { "last name": lastName },
        { email: email },
        { "new password": password }
    ];
    const [disable, setDisabled] = useState(true);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);
    const [modal, setModal] = useState(false);

    const config = {
        onUploadProgress: progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
        }
    };

    function handleInputChange(event) {
        let value = event.target.value.trim();
        const name = event.target.name.trim();
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "new password":
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
            case "new password":
                if (!isByteLength(value, { min: 8, max: 16 })) {
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
                if (isEmpty(value)) {
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
    let history = useHistory();
    function handleFormSubmit(event) {
        event.preventDefault();
        const user = {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        }
        setProgress(0);
        setModal(true);
        API.createUser(user, config)
            .then(res => {
                if (res.data.affectedRows > 0) {
                    setModal(false);
                    history.push("/login");
                    setProgress(0);
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="create-account">
            {modal ? (
                <Modal
                    open={modal}
                    content={<LoadingBar
                        progress={progress}
                        show={"show"}
                    />}
                />
            ) : (<div />)}
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
                        action={handleFormSubmit}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default CreateAccount;