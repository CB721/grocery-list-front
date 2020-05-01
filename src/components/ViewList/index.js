import React, { useState, useEffect } from "react";
import List from "../List";
import StaticList from "../StaticList";
import Button from "../Button";
import Modal from "../Modal";
import LoadingSpinner from "../LoadingSpinner";
import ListHeader from "../ListHeader";
import "./style.scss";

function ViewList(props) {
    const [currentView, setCurrentView] = useState("current");
    const [current, setCurrent] = useState("option-header selected");
    const [prev, setPrev] = useState("option-header");
    const [list, setList] = useState([]);
    const [displayList, setDisplayList] = useState(list);
    const [stores, setStores] = useState([]);
    const [previousLists, setPreviousLists] = useState([]);
    const [showComplete, setShowComplete] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalList, setModalList] = useState([]);
    const [modalMessage, setModalMessage] = useState("");
    const [listMessage, setListMessage] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [sortListBy, setSortListBy] = useState("");

    useEffect(() => {
        setList(props.list);
        // check if all items have been purchased
        for (let i = 0; i <= props.list.length; i++) {
            // if it has gone through the entire list, all items have been marked complete
            if (i === props.list.length) {
                setShowComplete(true);
            }
            else if (!props.list[i].purchased) {
                setShowComplete(false);
                break;
            }
        }
        // if it has been over 5 seconds, display a message replacing the loading bar
        if (props.list.length < 1) {
            setTimeout(() => {
                setListMessage("Create a list to get started!");
            }, 7500);
        }
    }, [props.list]);
    useEffect(() => {
        if (window.screen.availWidth < 500) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [window.screen]);
    useEffect(() => {
        setDisplayList(list);
    }, [list])
    // filter list by store
    function viewByStore(event) {
        event.preventDefault();
        const storeFilter = event.target.value;
        setSortListBy("");
        if (storeFilter === "All") {
            setDisplayList(list);
        } else {
            const copy = [...list];
            const newList = [];
            // iterate over list and add to list
            for (let i = 0; i < copy.length; i++) {
                if (copy[i].store_name === storeFilter) {
                    newList.push(copy[i]);
                }
            }
            setDisplayList(newList);
        }
    }
    function viewListByDate(event) {
        event.preventDefault();
        if (event.target.value === "DESC") {
            getPreviousLists("DESC");
        } else {
            getPreviousLists("ASC");
        }
    }
    useEffect(() => {
        let storeList = ["All"];
        // iterate over list
        for (let i = 0; i < props.list.length; i++) {
            let storeName = props.list[i].store_name;
            // if store name is not already in the list, add to the list
            if (storeList.indexOf(storeName) < 0) {
                storeList.push(storeName);
            }
        }
        setStores(storeList);
    }, [props.list]);

    useEffect(() => {
        switch (currentView) {
            case "current":
                setPrev("option-header");
                setCurrent("option-header selected");
                break;
            case "prev":
                setPrev("option-header selected");
                setCurrent("option-header");
                getPreviousLists("DESC");
                break;
            default:
                return;
        }
    }, [currentView]);
    function getPreviousLists(order) {
        props.getPreviousLists(order)
            .then(res => setPreviousLists(res))
            .catch(err => console.log(err));
    }
    function toggleOptions(event) {
        event.preventDefault();
        setCurrentView(event.currentTarget.id);
    }
    function toggleClass(event, id = 1) {
        event.preventDefault();
        let status = true;
        let itemID = 0;
        // get id from iterating over the list
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                itemID = i;
                break;
            }
        }
        if (list[itemID].purchased) {
            status = false;
        }
        props.updateItem(id, "purchased", status);
    }
    function changePriority(event, id = 1) {
        event.preventDefault();
        props.updateItem(id, "priority", event.target.value);
    }
    function openModal(item) {
        props.getListByID(item.id)
            .then(res => {
                if (res.length > 0) {
                    setModalList(res);
                    setModal(true);
                    setModalMessage("Click An Item To Add To Current List");
                } else {
                    setModal(false);
                }
            })
            .catch(err => console.log(err));
    }
    function addToCurrentList(item) {
        const listItem = {
            name: item.name,
            store: {
                store_id: item.store_id
            },
            priority: "Normal"
        }
        setModalMessage(`${item.name} added!`);
        setTimeout(() => {
            setModalMessage("Click An Item To Add To Current List");
        }, 3000);
        props.addItem(listItem);
    }
    function deleteList(event, id) {
        event.preventDefault();
        props.deleteList(id)
            .then(res => {
                if (res === "List deleted") {
                    getPreviousLists("DESC");
                }
            })
            .catch(err => console.log(err));
    }
    function addEntirePreviousList() {
        props.addEntirePreviousList(modalList[0].list_id);
        setModal(false);
        setCurrentView("current");
    }
    function setColumnFilter(col) {
        switch (col) {
            case "Item Name":
                setSortListBy("name");
                break;
            case "Store":
                setSortListBy("store_name");
                break;
            case "Priority":
                setSortListBy("priority");
                break;
            case "In Cart":
                setSortListBy("purchased");
                break;
            default:
                setSortListBy("");
                return;
        }
        for (let i = 0; i < props.list.length; i++) {
            if (props.list[i] !== displayList[i]) {
                setDisplayList(props.list);
                return;
            }
        }
        // setSortListBy("");
    }
    function filterByColumn() {
        let sortList = [...list];
        if (sortListBy && sortListBy !== "purchased") {
            sortList.sort(function (a, b) {
                var itemA = a[sortListBy].toUpperCase();
                var itemB = b[sortListBy].toUpperCase();
                if (itemA < itemB) {
                    return -1;
                }
                if (itemA > itemB) {
                    return 1;
                }
                return 0;
            });
        } else if (sortListBy) {
            sortList.sort(function (a, b) {
                var itemA = a[sortListBy];
                var itemB = b[sortListBy];
                if (itemA < itemB) {
                    return -1;
                }
                if (itemA > itemB) {
                    return 1;
                }
                return 0;
            });
        } else {
            return;
        }
        setDisplayList(sortList);
    }
    useEffect(() => {
        filterByColumn();
    }, [sortListBy]);
    return (
        <div className="view-list">
            <div className="list-view-options" aria-label="list options">
                <div
                    className={current}
                    id="current"
                    onClick={(event) => toggleOptions(event)}
                    aria-label="view current list"
                >
                    Current List
                </div>
                <div
                    className={prev}
                    id="prev"
                    onClick={(event) => toggleOptions(event)}
                    aria-label="view previous lists"
                >
                    Previous Lists
                </div>
            </div>
            {modal ? (
                <Modal
                    open={modal}
                    name={modalList[0].list_name}
                    message={modalMessage}
                    close={setModal}
                    content={<StaticList
                        viewList={false}
                        list={modalList}
                        action={addToCurrentList}
                        hidetrash={"hide-trash"}
                    />}
                    button={<Button
                        text="Add All To Current List"
                        class="white-button"
                        action={addEntirePreviousList}
                    />}
                />
            ) : (<div />)}
            {currentView === "current" ? (
                <div>
                    {list.length > 0 ? (
                        <div aria-label="current list">
                            <select
                                className="store-filter"
                                defaultValue="All"
                                onChange={(event) => viewByStore(event)}
                                aria-label="filter by store name"
                            >
                                {stores.map((store, index) => (
                                    <option value={store} key={index}>
                                        {store}
                                    </option>
                                ))}
                            </select>
                            <ListHeader
                                firstCol="Item Name"
                                secondCol="Store"
                                thirdCol="Priority"
                                fourthCol="In Cart"
                                action={setColumnFilter}
                            />
                            <div>
                                {isMobile ? (
                                    <StaticList
                                        viewList={true}
                                        list={displayList}
                                        toggleClass={toggleClass}
                                        changePriority={changePriority}
                                        updateItemPosition={props.updateItemPosition}
                                        deleteItem={props.deleteItem}
                                    />
                                ) : (
                                        <List
                                            viewList={true}
                                            list={displayList}
                                            toggleClass={toggleClass}
                                            changePriority={changePriority}
                                            updateItemPosition={props.updateItemPosition}
                                            deleteItem={props.deleteItem}
                                        />
                                    )}
                            </div>
                            {showComplete && list.length > 0 ? (
                                <Button
                                    text="Mark Complete"
                                    class="white-button"
                                    action={() => props.markListComplete(list[0].list_id)}
                                />
                            ) : (<div />)}
                        </div>
                    ) : listMessage.length > 0 ? (<div className="view-list-message">
                        {listMessage}
                    </div>
                    ) : (<LoadingSpinner />)}
                </div>
            ) : (
                    <div>
                        {previousLists.length > 0 ? (
                            <div aria-label="previous lists">
                                <select
                                    className="store-filter"
                                    default="DESC"
                                    onChange={(event) => viewListByDate(event)}
                                    aria-label="view by date"
                                >
                                    <option value="DESC" aria-label="most recent">Newest First</option>
                                    <option value="ASC" aria-label="oldest">Oldest First</option>
                                </select>
                                <div style={{ textAlign: "center" }}>
                                    Click To View List
                                </div>
                                <ListHeader
                                    secondCol="List Name / Date"
                                    fourthCol="Delete List"
                                />
                                <StaticList
                                    viewList={false}
                                    list={previousLists}
                                    action={openModal}
                                    deleteItem={deleteList}
                                />
                            </div>
                        ) : (<div />)}
                    </div>
                )}
        </div>
    )
}

export default ViewList;