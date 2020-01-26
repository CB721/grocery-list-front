import React from "react";
import "./style.scss";

function Button(props) {
    return(
        <button className={"cust-button " + props.class} onClick={props.action}>
            {props.text}
        </button>
    )
}

export default Button;