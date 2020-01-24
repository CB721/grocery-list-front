import React from 'react';
import { Textfit } from "react-textfit";
import Slide from 'react-reveal/Slide';
import { Fade } from "shards-react";
import "./style.scss";

function SideMenu(props) {
    return (
        <Fade in={true}>
            <div className="side-menu-bg" onClick={(event) => props.expandMenu(event)}>
                <Slide right>
                    <div className="menu-side" />
                    <div className="side-menu">
                        {props.options.map((option, index) => (
                            <div className="nav-options" key={index}>
                                <a href={option.link}>
                                    <Textfit
                                        mode="single"
                                        min={8}
                                        max={16}>
                                        {option.name}
                                    </Textfit>
                                </a>
                            </div>
                        ))}
                    </div>
                </Slide>
            </div>
        </Fade>
    )
}

export default SideMenu;