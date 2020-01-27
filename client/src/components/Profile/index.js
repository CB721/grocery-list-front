import React, { useState } from 'react';
import Space from "../DivSpace";
import { Row, Col } from "shards-react";
import "./style.scss";

function Profile(props) {
    const [create, setCreate] = useState("header-col");
    const [view, setView] = useState("header-col selected");
    const [store, setStore] = useState("header-col");
    const [swipe, setSwipe] = useState(0);
    const [swipeTime, setSwipeTime] = useState(0);

    function createList(event) {
        event.preventDefault();
        if (create === "header-col") {
            setCreate("header-col selected");
            setView("header-col");
            setStore("header-col");
        } else if (create === "header-col selected") {
            setCreate("header-col");
            setView("header-col selected");
            setStore("header-col");
        }
        console.log("create list");
    }
    function addStore(event) {
        event.preventDefault();
        if (store === "header-col") {
            setCreate("header-col");
            setView("header-col");
            setStore("header-col selected");
        } else if (store === "header-col selected") {
            setCreate("header-col");
            setView("header-col selected");
            setStore("header-col");
        }
        console.log("add a store");
    }
    function viewLists(event) {
        event.preventDefault();
        if (view === "header-col") {
            setCreate("header-col");
            setView("header-col selected");
            setStore("header-col");
        }
        console.log("view lists");
    }
    // function handleSwipe(event) {
    //     const time = new Date();
    //     if (swipe === 0) {
    //         setSwipe(event.touches[0].clientX);
    //         setSwipeTime(time.getTime());
    //     }
    //     // if it has been less than a second
    //     if (time.getTime() - swipeTime < 1000) {
    //         // determine swipe direction
    //         if (swipe - event.touches[0].clientX > 45) {
    //             console.log(swipe - event.touches[0].clientX);
    //             nextOption("left");
    //             console.log("swipe left");
    //             setSwipeTime(time.getTime());
    //         } else if (swipe - event.touches[0].clientX < -45) {
    //             console.log(swipe - event.touches[0].clientX);
    //             nextOption("right");
    //             console.log("swipe right");
    //             setSwipeTime(time.getTime());
    //         }
    //     } else {
    //         console.log("too long");
    //         setSwipeTime(time.getTime());
    //     }
    // }
    // function nextOption(direction) {
    //     if (direction === "left") {
    //         if (create === "header-col selected") {
    //             console.log("all the way to the left");
    //             setCreate("header-col selected");
    //             setView("header-col");
    //             setStore("header-col");
    //         }
    //         if (view === "header-col selected") {
    //             console.log("hi");
    //             setCreate("header-col selected");
    //             setView("header-col");
    //             setStore("header-col");
    //         }
    //         if (store === "header-col selected") {
    //             setCreate("header-col");
    //             setView("header-col selected");
    //             setStore("header-col");
    //         }
    //     }
    //     if (direction === "right") {
    //         if (create === "header-col selected") {
    //             setCreate("header-col");
    //             setView("header-col selected");
    //             setStore("header-col");
    //         }
    //         if (view === "header-col selected") {
    //             setCreate("header-col");
    //             setView("header-col");
    //             setStore("header-col selected");
    //         }
    //         if (store === "header-col selected") {
    //             console.log("all the way to the right");
    //             setCreate("header-col");
    //             setView("header-col");
    //             setStore("header-col selected");
    //         }
    //     }
    // }
    return (
        <div className="profile">
            <Space />
            <Row>
                <Col>
                    <div className="header">
                        <div className={create} onClick={(event) => createList(event)}>
                            Create a list
                        </div>
                        <div className={view} onClick={(event) => viewLists(event)}>
                            View Lists
                        </div>
                        <div className={store} onClick={(event) => addStore(event)}>
                            Add a store
                        </div>
                    </div>
                </Col>
            </Row>
            <Space />
            <Row>
                <Col>
                    <div
                        className="current-view"
                        onTouchMove={handleSwipe}
                    >

                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Profile;