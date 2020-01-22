import React from 'react';
import "./style.scss";

function Navbar(props) {
    return (
        <div className="nav">
            <div className="nav-items">
                {props.options.map((option, index) => (
                    <p key={index}>{option.name}</p>
                ))}
            </div>
            <div className="app-text">
                <p>G-List</p>
            </div>
            <div className="nav-items">
                {props.options.map((option, index) => (
                    <p className="nav-options" key={index}>
                        <a href={option.link}>
                            {option.name}
                        </a>
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Navbar;