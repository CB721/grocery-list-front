import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { isEmail, isByteLength, isMobilePhone } from 'validator';
import { Row, Col } from "shards-react";
import Form from "../Form";
import Space from "../DivSpace";
import LoadingBar from "../LoadingBar";
import Modal from "../Modal";
import "./style.scss";
import API from '../../utilities/api';
import Button from '../Button';

function Login(props) {
    useEffect(() => {
        document.title = "G-List | Login";
    }, []);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const inputs = [{ email: email }, { password: password }];
    const [checkClass, setCheckClass] = useState("blue");
    const [disable, setDisabled] = useState(true);
    const [error, setError] = useState("");
    const [remember, setRemember] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);
    const [modal, setModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const forgotPassInput = [{ email: forgotEmail }];
    const [forgotText, setForgotText] = useState("");
    const forgotPassText = [{ tel: forgotText }];
    const [forgotPassDisable, setForgotPassDisable] = useState(true);
    const [modalContent, setModalContent] = useState("");
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
    useEffect(() => {
        if (props.user.length === 1) {
            history.push("/profile");
        }
    }, [props.user]);
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
            case "tel":
                if (!isMobilePhone(value)) {
                    setError("Invalid phone number");
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
        if (forgotEmail && error.length < 1) {
            setForgotPassDisable(false);
        } else {
            setForgotPassDisable(true);
        }
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        setShowProgress(true);
        setProgress(0);
        props.userLogin(email, password, remember, config)
            .then(() => {
                setShowProgress(false);
                history.push("/profile");
                setProgress(0);
            })
            .catch(err => {
                console.log(err);
                setShowProgress(false);
                setProgress(0);
            });
    }
    function submitForgotPassword(event) {
        event.preventDefault();
        const data = {
            email: forgotEmail
        };
        API.passwordReset(data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    function submitTextPass(event) {
        event.preventDefault();
        const data = {
            number: forgotText
        };
        console.log(data);
    }
    function handleInputForgotPassword(event) {
        let value = event.target.value.trim();
        setForgotEmail(value);
    }
    function handleInputText(event) {
        let value = event.target.value.trim();
        console.log(value);
        setForgotText(value);
    }
    function forgotPassModal() {
        setModal(true);
        // prompt user for either their phone number or email
        const optionsDiv = (<div className="reset-options">
            <p className="options">
                Select a reset option
            </p>
            {/* place a button for each option */}
            <Button
                text="Send to mobile"
                class="blue-button"
                action={(event) => selectOption(event, "mobile")}
            />
            <Button
                text="Send to email"
                class="green-button"
                action={(event) => selectOption(event, "email")}
            />
        </div>)
        setModalContent(optionsDiv);
    }
    function selectOption(event, option) {
        event.preventDefault();
        // depending on which option they select, populate the modal with the according form
        if (option === "email") {
            setModalContent(<Form
                inputs={forgotPassInput}
                type="Reset Your Password"
                handleInputChange={handleInputForgotPassword}
                disableButton={forgotPassDisable}
                error={error}
                validateField={validateField}
                action={(event) => submitForgotPassword(event)}
            />)
        } else if (option === "mobile") {
            setModalContent(<Form
                inputs={forgotPassText}
                type="Reset Your Password"
                handleInputChange={handleInputText}
                disableButton={false}
                error={error}
                validateField={validateField}
                action={(event) => submitTextPass(event)}
            />)
        }
    }
    function closeModal() {
        setModal(false);
        setModalContent("");
    }
    return (
        <div className="login">
            {showProgress ? (
                <LoadingBar
                    progress={progress}
                    show={"show"}
                />
            ) : (<div />)}
            {modal ? (
                <Modal
                    open={modal}
                    close={closeModal}
                    content={modalContent}
                />
            ) : (<div />)}
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
                        openForgotPass={forgotPassModal}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Login;