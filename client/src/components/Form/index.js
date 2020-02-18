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
            {props.inputs.map((input, index) => (
                <div className="form-input-area" key={index}>
                    <p className="form-input-headers">{Object.keys(input)}</p>
                    <input
                        type={Object.keys(input)}
                        value={input[Object.keys(input)]}
                        className="form-input"
                        placeholder={"Your " + Object.keys(input)}
                        name={Object.keys(input)}
                        onChange={props.handleInputChange}
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
                            {/* on click, take to reset password page */}
                            <div className="form-forgot-pass">Forgot Password?</div>
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