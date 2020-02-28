import React from "react";
import "./style.scss";

function LoadingBar(props) {
    return (
        <div className={`loading-bar ${props.show || 'show'}`}>
            <div className={`inner-circle s${props.progress}`}>
                {props.progress}%
            </div>
        </div>
    )
}

export default LoadingBar;