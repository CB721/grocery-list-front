import React from "react";
import "./style.scss";

function Dropdown(props) {
    return (
        <div className="cust-dropdown">
            {props.items.map((item, index) => (
                <div
                    className="dropdown-item"
                    key={index}
                    onClick={() => props.action(item)}
                >
                    {item}
                </div>
            ))}
        </div>
    )
}

export default Dropdown;