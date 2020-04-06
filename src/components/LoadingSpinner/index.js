import React from "react";
import "./style.scss";

function LoadingSpinner() {
    return (
        <div className="loader" aria-label="loading spinner">
            <div className="face face1">
                <div className="circle">

                </div>
            </div>
            <div className="face face2">
                <div className="circle">

                </div>
            </div>
        </div>
    )
}

export default LoadingSpinner;