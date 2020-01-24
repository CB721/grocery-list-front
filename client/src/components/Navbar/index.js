import React, { useState } from 'react';
import { Row, Col, Fade } from "shards-react";
import { Textfit } from "react-textfit";
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
    return (
        <Row>
            <Col>
                <div className="nav">
                    <div className="nav-items" />
                    <div className="app-text">
                        <Textfit
                            mode="single"
                            min={16}
                            max={48}
                        >
                            G-List
                        </Textfit>
                    </div>
                    <div className="nav-items">
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