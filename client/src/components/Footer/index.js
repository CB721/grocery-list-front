import React from 'react';
import "./style.scss";

function Footer(props) {
    const date = new Date();
    const currentYear = date.getFullYear();

    return (
        <div className="footer">
            <span>Copyright &copy; {currentYear} Clint Brodar</span>
        </div>
    )
}

export default Footer;