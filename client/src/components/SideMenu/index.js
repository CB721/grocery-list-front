import React from 'react';
import { useHistory } from 'react-router-dom';
import { Textfit } from "react-textfit";
import Slide from 'react-reveal/Slide';
import { Fade } from "shards-react";
import "./style.scss";

function SideMenu(props) {
    let history = useHistory();
    function goToSelectedPage(event, path) {
        event.preventDefault();
        if (path === "/signout") {
            props.logout()
                .then(() => {
                    history.push(path);
                    props.expandMenu(event);
                })
                .catch(err => {
                    console.log(err);
                    history.push(path);
                    props.expandMenu(event);
                });
        } else {
            // redirect to selected page
            history.push(path);
            // close side menu
            props.expandMenu(event);
        }
    }
    return (
        <Fade in={true}>
            <div className="side-menu-bg" aria-label="side menu">
                <Slide right>
                    <div className="menu-side" onClick={(event) => props.expandMenu(event)} />
                    <div className="side-menu" aria-label="side menu options">
                        {props.options.map((option, index) => (
                            <div className="nav-options" key={index} aria-label={"go to the " + option.name + " page"}>
                                <div onClick={(event) => goToSelectedPage(event, option.link)}>
                                    <Textfit
                                        mode="single"
                                        min={6}
                                        max={16}
                                    >
                                        {option.name}
                                    </Textfit>
                                </div>
                            </div>
                        ))}
                    </div>
                </Slide>
            </div>
        </Fade>
    )
}

export default SideMenu;