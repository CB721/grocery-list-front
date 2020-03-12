import React from "react";
import "./style.scss";

function Error(props) {
    return(
        <div className="error" aria-label={"error " + props.text}>
            {props.text}
        </div>
    )
}

export default Error;