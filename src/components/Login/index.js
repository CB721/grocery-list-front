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
    const forgotPassText = [{ number: forgotText }];
    const [forgotPassDisable, setForgotPassDisable] = useState(true);
    const [modalContent, setModalContent] = useState("");
    const [forgotOption, setForgotOption] = useState("");
    const [carrier, setCarrier] = useState("");

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
            case "number":
                if (!isMobilePhone(value) || value.toString().length < 10) {
                    setError("Invalid phone number");
                } else {
                    setError("");
                    if (carrier) {
                        setForgotPassDisable(false);
                    } else {
                        setForgotPassDisable(true);
                    }
                }
                break;
            default:
                return;
        }
        // check that all fields are completed with no errors before activating submit button
        if (email && password && !error.length) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        if ((forgotEmail && !error.length) || (forgotText && carrier && !error.length)) {
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
        setShowProgress(true);
        setProgress(0);
        API.passwordReset(data, config)
            .then(res => {
                setShowProgress(false);
                setProgress(0);
                // if a success response is received
                if (res.data === "Password reset sent to your email") {
                    alert(res.data);
                    closeModal();
                    // send to reset page
                    history.push("/reset");
                }
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                setError(err.response.data);
                setForgotEmail("");
            });
    }
    function submitTextPass(event) {
        event.preventDefault();
        // only if both the number and carrier have been selected and validated
        if (forgotText && carrier) {
            // create data for post
            const data = {
                number: forgotText,
                carrier
            };
            // show loading bar
            setShowProgress(true);
            setProgress(0);
            API.textReset(data, config)
                .then(res => {
                    // hide loading bar
                    setShowProgress(false);
                    setProgress(0);
                    // if a success response is received
                    if (res.data === "Password reset sent to your mobile device") {
                        alert(res.data);
                        closeModal();
                        // send to reset page
                        history.push("/reset");
                    }
                })
                .catch(err => {
                    setShowProgress(false);
                    setProgress(0);
                    setError(err.response.data);
                    setForgotText("");
                })
        } else {
            setError("Complete all fields to continue");
        }
    }
    function handleInputForgotPassword(event) {
        let value = event.target.value.trim();
        setForgotEmail(value);
    }
    function handleInputText(event) {
        let value = event.target.value.trim();
        setForgotText(value);
    }
    function forgotPassModal() {
        setError("");
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
                action={() => setForgotOption("mobile")}
            />
            <Button
                text="Send to email"
                class="green-button"
                action={() => setForgotOption("email")}
            />
        </div>)
        setModalContent(optionsDiv);
    }
    function closeModal() {
        setModal(false);
        setModalContent();
        setForgotOption("");
        setError("");
    }
    function selectCarrier(event) {
        event.preventDefault();
        setCarrier(event.target.value);
        if (forgotText && !error) {
            setForgotPassDisable(false);
        } else {
            setForgotPassDisable(true);
        }
    }
    return (
        <div className="login">
            {showProgress ? (
                <LoadingBar
                    progress={progress}
                    show={"show"}
                />
            ) : (<div />)}
            {modal && !forgotOption ? (
                <Modal
                    open={modal}
                    close={closeModal}
                    content={modalContent}
                />
                // depending on which option they select, populate the modal with the according form
            ) : modal && forgotOption === "mobile" ? (
                <Modal
                    open={modal}
                    close={closeModal}
                    content={<Form
                        inputs={forgotPassText}
                        type="Send to mobile"
                        handleInputChange={handleInputText}
                        disableButton={forgotPassDisable}
                        error={error}
                        validateField={validateField}
                        action={(event) => submitTextPass(event)}
                        selectCarrier={selectCarrier}
                    />}
                />
            ) : modal && forgotOption === "email" ? (
                <Modal
                    open={modal}
                    close={closeModal}
                    content={<Form
                        inputs={forgotPassInput}
                        type="Send to email"
                        handleInputChange={handleInputForgotPassword}
                        disableButton={forgotPassDisable}
                        error={error}
                        validateField={validateField}
                        action={(event) => submitForgotPassword(event)}
                    />}
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