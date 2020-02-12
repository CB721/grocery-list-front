import React, { useState, useEffect } from 'react';
import Space from "../DivSpace";
import Store from "../Store";
import CreateList from "../CreateList";
import ViewList from "../ViewList";
import Slide from 'react-reveal/Slide';
// import Stores from "../../assets/data/store.json";
// import List from "../../assets/data/list.json";
import { Row, Col } from "shards-react";
import API from "../../utilities/api";
import "./style.scss";

function Profile(props) {
    const userID = "5e3afb5803935005eeeef6e9";

    const [create, setCreate] = useState("header-col");
    const [view, setView] = useState("header-col selected");
    const [store, setStore] = useState("header-col");
    const [currentView, setCurrentView] = useState("view-lists");
    const [swipe, setSwipe] = useState("left");
    const [swipeTime, setSwipeTime] = useState(0);
    const [userStores, setUserStores] = useState([]);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        document.title = document.title + " | Profile";
        getUserStores();
        getUserList();
    }, []);

    function getUserStores() {
        API.getUserStores(userID)
            .then(res => {
                setUserStores(res.data);
            })
            .catch(err => console.log(err));
    }
    function getUserList() {
        API.getUserList(userID)
            .then(res => {
                setUserList(res.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        switch (currentView) {
            case "view-lists":
                setCreate("header-col");
                setView("header-col selected");
                setStore("header-col");
                break;
            case "create-list":
                setCreate("header-col selected");
                setView("header-col");
                setStore("header-col");
                break;
            case "store-list":
                setCreate("header-col");
                setView("header-col");
                setStore("header-col selected");
                break;
        }
    }, [currentView]);

    function toggleOptions(event) {
        event.preventDefault();
        const id = event.currentTarget.id;
        // determine direction of slide effect
        switch (currentView) {
            case "view-lists":
                setSwipe("left");
                break;
            case "create-list":
                if (id === "store-list") {
                    setSwipe("right");
                } else {
                    setSwipe("left");
                }
                break;
            case "store-list":
                setSwipe("right");
                break;
        }
        setCurrentView(id);
    }
    function addItem(item, position) {
        const listItem = {
            name: item.name,
            user_id: userID,
            store_id: item.store.store_id,
            priority: item.priority,
            position
        }
        API.addItem(listItem)
            .then(getUserList())
            .catch(err => console.log(err));
    }
    function updateItem(id, column, value) {
        let listItem = {};
        switch (column) {
            case "priority":
                listItem.priority = value;
                break;
            case "purchased":
                listItem.purchased = value;
                break;
            default:
                return;
        }
        API.updateItem(id, listItem)
            .then(getUserList())
            .catch(err => console.log(err));
    }
    function updateItemPosition(items) {
        const updateItems = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].id !== userList[i].id) {
                updateItems.push({
                    id: items[i].id,
                    position: i + 1
                });
            }
        }
        for (let i = 0; i <= updateItems.length; i++) {
            if (i === updateItems.length) {
                getUserList()
            } else {
                API.updateItem(updateItems[i].id, { position: updateItems[i].position })
                    .then()
                    .catch(err => console.log(err));
            }
        }
        // console.log(items);
        // console.log(userList);
        // console.log(updateItems);
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
                        <div
                            className={create}
                            id="create-list"
                            onClick={(event) => toggleOptions(event)}
                        >
                            {userList.length > 0 ? "Add to list" : "Create a list"}
                        </div>
                        <div
                            className={view}
                            id="view-lists"
                            onClick={(event) => toggleOptions(event)}
                        >
                            View Lists
                        </div>
                        <div
                            className={store}
                            id="store-list"
                            onClick={(event) => toggleOptions(event)}
                        >
                            Stores
                        </div>
                    </div>
                </Col>
            </Row>
            <Space />
            <Row>
                <Col>
                    <Slide up>
                        <div
                            className="current-view"
                        // onTouchMove={handleSwipe}
                        >
                            {currentView === "create-list" ? (
                                <CreateList
                                    stores={userStores}
                                    addItem={addItem}
                                    list={userList}
                                    updateItemPosition={updateItemPosition}
                                />
                            ) : currentView === "store-list" ? (
                                <Store
                                    stores={userStores}
                                    refreshStores={getUserStores}
                                />
                            ) : (
                                        <ViewList
                                            stores={userStores}
                                            list={userList}
                                            updateItem={updateItem}
                                            updateItemPosition={updateItemPosition}
                                        />
                                    )}
                        </div>
                    </Slide>
                </Col>
            </Row>
        </div>
    )
}

export default Profile;