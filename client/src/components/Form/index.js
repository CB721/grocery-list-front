import React from "react";
import Button from "../Button";
import Checkbox from "../Checkbox";
import "./style.scss";

function Form(props) {
    // expect array of objects with input type and value
    return (
        <div className="form">
            <div className="form-head">
                {props.type}
            </div>
            <div className="form-error">
                {props.error}
            </div>
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
                        value={input[Object.keys(input)]}
                        className={"form-input " + input.error}
                        placeholder={"Your " + Object.keys(input)[0]}
                        name={Object.keys(input)}
                        onChange={props.handleInputChange}
                        onBlur={(event) => props.validateField(event)}
                    />
                </div>
            ))}
            <div className="form-input-area">
                {props.type === "login" ? (
                    <div>
                        <div className="login-sections">
                            <div className="form-checkbox">
                                <Checkbox
                                    class={props.checkClass}
                                    toggleClass={props.toggleClass}
                                />
                            </div>
                            <div className="form-check-text">Remember me</div>
                        </div>
                        <div className="login-sections">
                            <div
                                className="form-forgot-pass"
                                onClick={props.openForgotPass}
                            >
                                Forgot Password?
                            </div>
                        </div>
                    </div>
                ) : (<div />)}
                <Button
                    text={props.type}
                    class="blue-button"
                    action={props.action}
                    disabled={props.disableButton}
                />
            </div>
        </div>
    )
}

export default Form;