import React, { useState } from 'react';
import { Row, Col, Fade } from "shards-react";
import { ReactComponent as Bell } from "../../assets/images/bell.svg";
import SideMenu from "../SideMenu";
import "./style.scss";

function Navbar(props) {
    const [menuExpand, setMenuExpand] = useState("burger-menu");

    function expandMenu(event) {
        event.preventDefault();
        if (menuExpand === "burger-menu") {
            setMenuExpand("burger-menu change");
        } else {
            setMenuExpand("burger-menu");
        }
    }
    function goToHome(event) {
        event.preventDefault();
        window.location.href = "/";
    }
    return (
        <Row>
            <Col>
                <div className="nav">
                    <div className="nav-items" />
                    <div className="app-text" onClick={(event) => goToHome(event)}>
                        G-List
                    </div>
                    <div className="nav-items">
                        {props.isLogged > 0 ? (
                            <div className="notification-section">
                                <Bell className="notification-bell" />
                                {props.notifications.length > 0 ? (
                                    <p className="notification">
                                        {props.notifications.length}
                                    </p>
                                ) : (<div />)}
                            </div>
                        ) : (<div />)}
                        <div className={menuExpand} onClick={(event) => expandMenu(event)}>
                            <div className="bar1" />
                            <div className="bar2" />
                            <div className="bar3" />
                        </div>
                        {menuExpand === "burger-menu change" ? (
                            <Fade>
                                <SideMenu options={props.options} expandMenu={expandMenu} />
                            </Fade>
                        ) : (<div />)}
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Navbar;