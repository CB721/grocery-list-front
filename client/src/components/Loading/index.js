import React from "react";
import "./style.scss";

function Loading(props) {
    return (
        <div className={`loading-spinner ${props.color} ${props.size}`}>
            <div className={`inner-circle s${props.progress}`}>
                {props.progress}%
            </div>
        </div>
    )
}

export default Loading;