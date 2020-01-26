import React from "react";
import "./style.scss";

function Checkbox(props) {
    return (
        // pass along class that checkbox is transformed into
        <div
            className={"cust-checkbox " + props.class}
            onClick={(event) => props.toggleClass(event)}
        />
    )
}

export default Checkbox;