import React from "react";
import "./style.scss";

function Error(props) {
    return(
        <div className="error">
            {props.text}
        </div>
    )
}

export default Error;