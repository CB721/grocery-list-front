import React from 'react';
import "./style.scss";

function Footer(props) {
    const date = new Date();
    const currentYear = date.getFullYear();

    return (
        <div className="footer">
            <span aria-label={"copyright " + currentYear + " Clint Brodar"}>Copyright &copy; {currentYear} Clint Brodar</span>
        </div>
    )
}

export default Footer;