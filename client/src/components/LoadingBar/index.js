import React, { useEffect, useState } from "react";
import "./style.scss";

function LoadingBar(props) {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        if (props.progress > 0 && progress < 1) {
            timer();
        }
        if (progress >= 100 && props.progress < 100) {
            setProgress(props.progress);
        }
        if (progress >= 100 && props.progress >= 100) {
            setProgress(100);
        }
    }, [props.progress]);
    function timer() {
        const timer = setInterval(() => {
            setProgress(progress => progress + 1);
        }, 75);
        setTimeout(() => {
            clearInterval(timer);
        }, 7499);
    }
    return (
        <div className={`loading-bar ${props.show || 'show'}`} aria-label="loading bar">
            <div className={`inner-circle`}>
                {progress}%
            </div>
        </div>
    )
}

export default LoadingBar;