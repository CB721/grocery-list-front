import React, { useState, useEffect } from 'react';
import Space from "../DivSpace";
import Store from "../Store";
import CreateList from "../CreateList";
import ViewList from "../ViewList";
import Slide from 'react-reveal/Slide';
import { Row, Col } from "shards-react";
import API from "../../utilities/api";
import Modal from "../Modal";
import LoadingBar from "../LoadingBar";
import { isSavedToHome } from "../../utilities/promptSave";
import { isOnline, saveToIndexedDB, bulkSend, clearStore } from '../../utilities/offlineActions';
import moment from "moment";
import "./style.scss";

function Profile(props) {
    const [create, setCreate] = useState("header-col");
    const [view, setView] = useState("header-col selected");
    const [store, setStore] = useState("header-col");
    const [currentView, setCurrentView] = useState("view-lists");
    const [userStores, setUserStores] = useState([]);
    const [userList, setUserList] = useState([]);
    const [progress, setProgress] = useState(0);
    const [modal, setModal] = useState(false);
    const [coords, setCoords] = useState("");
    // boolean value to ensure the bulk send is only triggered once
    const [updateOffline, setUpdateOffline] = useState(false);

    const config = {
        onUploadProgress: progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
        }
    };
    useEffect(() => {
        // check if the user has been prompted to save the pwa to their home page
        const promptUser = isSavedToHome();
        // check if the user has already saved
        if (promptUser) {
            localStorage.setItem("saveToHome", moment().toDate());
            // update last PWA prompt, value here doesn't matter because the backend will set the date
            props.updateUser({ last_pwa_prompt: true })
                .then()
                .catch(err => console.log(err));
            // if user is using a PWA, but the db has not been updated to reflect that
        } else if (!promptUser && !props.user[0].using_PWA) {
            // update user to indicate they are using a PWA
            props.updateUser({ using_PWA: 1 })
                .then()
                .catch(err => console.log(err));
        }
    }, []);
    // check for when the user is updated
    useEffect(() => {
        document.title = "G-List | Profile";
        if (props.user.length > 0 && props.user[0].id) {
            getUserStores();
            getUserList();
        }
        // get user location
        navigator.geolocation.getCurrentPosition((pos) => {
            setCoords(`${pos.coords.latitude},${pos.coords.longitude}`);
        });
    }, [props.user]);
    // check for when the device is online
    // if it is send all data saved in indexeddb to the back end
    window.addEventListener("online", async (event) => {
        try {
            if (event.type === "online") {
                setUpdateOffline(true);
            }
        } catch (err) {
            console.log(err);
        }
    }, { once: true });
    useEffect(() => {
        if (updateOffline && isOnline()) {
            bulkSend()
                .then(() => {
                    setUpdateOffline(false);
                    // get user list
                    getUserList();
                    // clear the store
                    clearStore("list_items_store");
                    // notify the user their offline data has been saved
                    props.notification("Offline data saved!");
                })
                .catch(err => console.log(err))
        }
    }, [updateOffline]);
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
            default:
                return;
        }
    }, [currentView]);

    function toggleOptions(event) {
        event.preventDefault();

        const id = event.currentTarget.id;
        setCurrentView(id);
    }
    function addItem(item, position = userList.length + 1) {
        const listItem = {
            name: item.name,
            user_id: props.user[0].id,
            store_id: item.store.store_id,
            priority: item.priority,
            position,
            list_id: item.list_id
        }
        setProgress(0);
        setModal(true);
        if (isOnline()) {
            API.addItem(listItem, config)
                .then(() => {
                    props.notification(`${listItem.name} added to list`);
                    setModal(false);
                    setProgress(0);
                    getUserList();
                })
                .catch(err => console.log(err));
        } else {
            // set date added property for list, it is expecting a string with a "T" to split on
            listItem["date_added"] = "NowT";
            setModal(false);
            setProgress(0);
            // add new item to the list to mock
            const newList = [...userList, listItem];
            // save item to indexeddb
            saveToIndexedDB(listItem, "list_items", "name")
                .then(() => {
                    // show success message
                    props.notification(`${listItem.name} added to list`);
                    // set list to new list
                    props.setCurrList(newList);
                    setUserList(newList);
                })
                .catch(err => {
                    console.log(err);
                    props.notification("Unable to save while offline");
                });
        }
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
            case "name":
                listItem.name = value;
                break;
            case "store":
                listItem.store_id = value;
                break;
            default:
                return;
        }
        API.updateItem(id, listItem)
            .then(() => {
                getUserList();
                props.notification("Item updated!");
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
                props.notification("List marked as complete");
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
                    props.notification("Item removed from list");
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
                    props.notification("List deleted");
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
                props.notification("Previous list added to your current list");
                setModal(false);
                setProgress(0);
            })
            .catch(err => console.log(err));
    }
    function itemSuggestion(searchObj) {
        return new Promise((resolve, reject) => {
            API.itemSuggestion(searchObj)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        })
    }
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
                                    updateItem={updateItem}
                                    itemSuggestion={itemSuggestion}
                                />
                            ) : currentView === "store-list" ? (
                                <Store
                                    stores={userStores}
                                    refreshStores={getUserStores}
                                    notification={props.notification}
                                    userID={props.user[0].id}
                                    coords={coords}
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