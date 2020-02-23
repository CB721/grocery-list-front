import React, { useState, useEffect } from "react";
import List from "../List";
import Flip from "react-reveal";
import Button from "../Button";
import Modal from "../Modal";
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
    }, [props.list]);
    useEffect(() => {
        setDisplayList(list);
    }, [list])
    // filter list by store
    function viewByStore(event) {
        event.preventDefault();
        const storeFilter = event.target.value;
        if (storeFilter === "All") {
            setDisplayList(list);
        } else {
            const newList = [];
            // iterate over list and add to list
            for (let i = 0; i < list.length; i++) {
                if (list[i].store_name === storeFilter) {
                    newList.push(list[i]);
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
    function toggleClass(event, id = 1, index = 0) {
        event.preventDefault();
        let status = true;
        if (list[index].purchased) {
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
    return (
        <div className="view-list">
            <div className="list-view-options">
                <div
                    className={current}
                    id="current"
                    onClick={(event) => toggleOptions(event)}
                >
                    Current List
                </div>
                <div
                    className={prev}
                    id="prev"
                    onClick={(event) => toggleOptions(event)}
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
                    content={<List
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
                        <select
                            className="store-filter"
                            defaultValue="All"
                            onChange={(event) => viewByStore(event)}
                        >
                            {stores.map((store, index) => (
                                <option value={store} key={index}>
                                    {store}
                                </option>
                            ))}
                        </select>
                    ) : (<div />)}
                    <Flip bottom cascade>
                        <List
                            viewList={true}
                            list={displayList}
                            toggleClass={toggleClass}
                            changePriority={changePriority}
                            updateItemPosition={props.updateItemPosition}
                        />
                    </Flip>
                    {/* <div style={{ marginBottom: "25px" }}> */}
                    {showComplete && list.length > 0 ? (
                        <Button
                            text="Mark Complete"
                            class="white-button"
                            action={() => props.markListComplete(list[0].list_id)}
                        />
                    ) : (<div />)}
                    {/* </div> */}
                </div>
            ) : (
                    <div>
                        {previousLists.length > 0 ? (
                            <div>
                                <select
                                    className="store-filter"
                                    default="DESC"
                                    onChange={(event) => viewListByDate(event)}
                                >
                                    <option value="DESC">Newest First</option>
                                    <option value="ASC">Oldest First</option>
                                </select>
                                <div style={{ textAlign: "center" }}>
                                    Click To View List
                                </div>
                                <List
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