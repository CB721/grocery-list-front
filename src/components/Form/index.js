import React from "react";
import Button from "../Button";
import Checkbox from "../Checkbox";
import "./style.scss";

function Form(props) {
    function setAutoComplete(input) {
        if (input === "temp password" || input === "new password" || input === "confirm password") {
            return "new-password"
        } else if (input === "password") {
            return "current-password"
        } else if (input === "first name") {
            return "given-name"
        } else if (input === "last name") {
            return "family-name"
        } else {
            return input;
        }
    }
    // expect array of objects with input type and value
    return (
        <form className="form" id={props.type}>
            <div className="form-head">
                {props.type}
            </div>
            {props.error ? (
                <div className="form-error">
                    {props.error}
                </div>
            ) : (
                    <div />
                )}
            {props.inputs.map((input, index) => (
                <div className="form-input-area" key={index}>
                    <p
                        className={"form-input-headers " + input.error}
                    >
                        {Object.keys(input)[0]}
                    </p>
                    <input
                        type={
                            Object.keys(input)[0] === "temp password" ||
                                Object.keys(input)[0] === "new password" ||
                                Object.keys(input)[0] === "confirm password" ?
                                "password" : Object.keys(input)
                        }
                        autoComplete={setAutoComplete(Object.keys(input)[0])}
                        value={input[Object.keys(input)]}
                        className={"form-input " + input.error}
                        placeholder={"Your " + Object.keys(input)[0]}
                        name={Object.keys(input)}
                        onChange={props.handleInputChange}
                        onBlur={(event) => props.validateField(event)}
                        aria-labelledby={props.type + Object.keys(input)}
                    />
                </div>
            ))}
            <div className="form-input-area">
                {props.type === "login" ? (
                    <div>
                        <div className="login-sections">
                            <div className="form-remember-me">
                                <div className="form-checkbox">
                                    <Checkbox
                                        class={props.checkClass}
                                        toggleClass={props.toggleClass}
                                    />
                                </div>
                                <div className="form-check-text" aria-label="remember me checkbox">
                                    Remember me
                                </div>
                            </div>
                        </div>
                        <div className="login-sections">
                            <div
                                className="form-forgot-pass"
                                onClick={props.openForgotPass}
                                aria-label="forgot password link"
                            >
                                Forgot Password?
                            </div>
                        </div>
                    </div>
                ) : props.type === "Send to mobile" ? (
                    <select
                        className="carrier-select"
                        defaultValue="select"
                        onChange={props.selectCarrier}
                        aria-label="Select your phone carrier"
                    >
                        <option className="store-select-item" value="select" disabled={true} aria-label="Select your phone carrier">
                            Select your phone carrier
                        </option>
                        <option className="store-select-item" value="att" aria-label="at&t">
                            AT&T
                        </option>
                        <option className="store-select-item" value="sprint" aria-label="sprint">
                            Sprint
                        </option>
                        <option className="store-select-item" value="tmobile" aria-label="t-mobile">
                            T-Mobile
                        </option>
                        <option className="store-select-item" value="verizon" aria-label="verizon">
                            Verizon
                        </option>
                    </select>
                ) : (<div />)}
                <Button
                    text={props.type}
                    class="blue-button"
                    action={props.action}
                    disabled={props.disableButton}
                />
            </div>
        </form>
    )
}

export default Form;