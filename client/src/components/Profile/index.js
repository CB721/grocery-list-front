import React, { useState, useEffect } from 'react';
import Space from "../DivSpace";
import Store from "../Store";
import CreateList from "../CreateList";
import ViewList from "../ViewList";
import Slide from 'react-reveal/Slide';
import { Row, Col } from "shards-react";
import API from "../../utilities/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import Modal from "../Modal";
import LoadingBar from "../LoadingBar";
import "./style.scss";

function Profile(props) {
    const [create, setCreate] = useState("header-col");
    const [view, setView] = useState("header-col selected");
    const [store, setStore] = useState("header-col");
    const [currentView, setCurrentView] = useState("view-lists");
    const [swipe, setSwipe] = useState("left");
    const [swipeTime, setSwipeTime] = useState(0);
    const [userStores, setUserStores] = useState([]);
    const [userList, setUserList] = useState([]);
    const [progress, setProgress] = useState(0);
    const [modal, setModal] = useState(false);

    const config = {
        onUploadProgress: progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
            console.log(percentCompleted);
        }
    };
    useEffect(() => {
        document.title = "G-List | Profile";
        if (props.user.length > 0) {
            getUserStores();
            getUserList();
        }
    }, [props.user]);
    function notification(message) {
        toast(message, {
            className: css({
                background: '#3C91E6',
                boxShadow: '0px 13px 12px -12px rgba(47,51,56,0.64)',
                borderRadius: '8px',
                border: "3px solid #F9FCFF",
                textTransform: "capitalize"
            }),
            bodyClassName: css({
                fontSize: '20px',
                color: '#F9FCFF'
            }),
            progressClassName: css({
                background: "linear-gradient(90deg, rgb(86,149,211) 0%, rgb(249,252,255) 80%)"
            })
        });
    }
    function getUserStores() {
        API.getUserStores(props.user[0].id)
            .then(res => {
                setUserStores(res.data);
            })
            .catch(err => console.log(err));
    }
    function getUserList() {
        API.getUserList(props.user[0].id)
            .then(res => {
                props.setCurrList(res.data);
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
    function addItem(item, position = userList.length + 1) {
        const listItem = {
            name: item.name,
            user_id: props.user[0].id,
            store_id: item.store.store_id,
            priority: item.priority,
            position
        }
        setProgress(0);
        setModal(true);
        API.addItem(listItem, config)
            .then(() => {
                notification(`${listItem.name} added to list`);
                setModal(false);
                setProgress(0);
                // setTimeout(() => {
                    getUserList();
                // }, 2000);
            })
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
            .then(() => {
                getUserList();
                notification("Item updated!");
            })
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
    }
    function getPreviousLists(direction) {
        return new Promise(function (resolve, reject) {
            const listInfo = {
                user_id: props.user[0].id,
                direction: direction
            }
            API.getListsByUserID(listInfo)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => reject(err));
        })
    }
    function addListName(id, name) {
        const listInfo = {
            list_name: name,
            user_id: props.user[0].id,
            list_id: id
        }
        API.updateList(listInfo)
            .then(() => {
                getUserList();
            })
            .catch(err => console.log(err));
    }
    function markListComplete(id) {
        const listInfo = {
            completed: 1,
            user_id: props.user[0].id,
            list_id: id
        }
        API.updateList(listInfo)
            .then(() => {
                getUserList();
                notification("List marked as complete");
            })
            .catch(err => console.log(err));
    }
    function deleteItem(id) {
        setProgress(0);
        setModal(true);
        API.removeItem(id, config)
            .then(res => {
                if (res.data.affectedRows > 0) {
                    getUserList();
                    notification("Item removed from list");
                    setModal(false);
                    setProgress(0);
                }
            })
            .catch(err => console.log(err));
    }
    function deleteList(id) {
        return new Promise(function (resolve, reject) {
            setProgress(0);
            setModal(true);
            API.deleteList(id, props.user[0].id, config)
                .then(res => {
                    notification("List deleted");
                    resolve(res.data);
                    setModal(false);
                    setProgress(0);
                })
                .catch(err => reject(err));
        });
    }
    function addEntirePreviousList(list_id) {
        const addList = {
            list_id,
            user_id: props.user[0].id
        }
        setProgress(0);
        setModal(true);
        API.addPreviousListToCurrent(addList, config)
            .then(() => {
                getUserList();
                notification("Previous list added to your current list");
                setModal(false);
                setProgress(0);
            })
            .catch(err => console.log(err));
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
            {modal ? (
                <Modal
                    open={modal}
                    content={<LoadingBar
                        progress={progress}
                        show={"show"}
                    />}
                />
            ) : (<div />)}
            <Space />
            <Row>
                <Col>
                    <div className="header" aria-label="profile options">
                        <div
                            className={create}
                            id="create-list"
                            onClick={(event) => toggleOptions(event)}
                            aria-label={userList.length > 0 ? "Edit list" : "Create a list"}
                        >
                            {userList.length > 0 ? "Edit List" : "Create a list"}
                        </div>
                        <div
                            className={view}
                            id="view-lists"
                            onClick={(event) => toggleOptions(event)}
                            aria-label="view lists"
                        >
                            View Lists
                        </div>
                        <div
                            className={store}
                            id="store-list"
                            onClick={(event) => toggleOptions(event)}
                            aria-label="view or add stores"
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
                                    addListName={addListName}
                                    deleteItem={deleteItem}
                                />
                            ) : currentView === "store-list" ? (
                                <Store
                                    stores={userStores}
                                    refreshStores={getUserStores}
                                    notification={notification}
                                    userID={props.user[0].id}
                                />
                            ) : (
                                        <ViewList
                                            stores={userStores}
                                            list={userList}
                                            updateItem={updateItem}
                                            updateItemPosition={updateItemPosition}
                                            getPreviousLists={getPreviousLists}
                                            markListComplete={markListComplete}
                                            getListByID={props.getListByID}
                                            addItem={addItem}
                                            addEntirePreviousList={addEntirePreviousList}
                                            deleteItem={deleteItem}
                                            deleteList={deleteList}
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