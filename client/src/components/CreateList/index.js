import React, { useState, useEffect } from "react";
import Button from "../Button";
import List from "../List";
import Flip from 'react-reveal/Flip';
import "./style.scss";

function CreateList(props) {
    const [newItem, setNewItem] = useState("");
    const [list, setList] = useState([]);
    const [showStores, setShowStores] = useState(false);
    const [storeSelect, setStoreSelect] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [priority, setPriority] = useState("Normal");
    const [inputErr, setInputErr] = useState("");
    const [listName, setListName] = useState("");
    const [savedListName, setSavedListName] = useState("");

    useEffect(() => {
        setList(props.list);
        setShowAdd(false);
        if (props.list.length > 0) {
            setSavedListName(props.list[0].list_name || "");
        }
    }, [props.list]);
    function handleInputChange(event) {
        event.preventDefault();
        setInputErr("");
        let value = event.target.value;
        setNewItem(value);
    }
    useEffect(() => {
        if (newItem.length > 1) {
            setShowStores(true);
        } else {
            setShowAdd(false);
            setShowStores(false);
        }
    }, [newItem]);
    useEffect(() => {
        if (storeSelect) {
            setShowAdd(true);
        } else {
            setShowAdd(false);
        }
    }, [storeSelect]);
    function addStore(event) {
        event.preventDefault();
        setShowAdd(true);
        setStoreSelect(JSON.parse(event.target.value));
    }
    function addItem(event) {
        event.preventDefault();
        if (newItem.length < 1) {
            setInputErr("Add an item");
        } else {
            let completeItem = {
                name: newItem,
                store: storeSelect,
                priority
            }
            setShowAdd(false);
            setNewItem("");
            setPriority("Normal");
            props.addItem(completeItem, list.length + 1);
            completeItem = [completeItem];
            setList(list => [...list, completeItem]);
        }
    }
    // function saveList(event) {
    //     event.preventDefault();
    //     setPriority("Normal");
    //     props.addItem();
    // }
    function changePriority(event) {
        event.preventDefault();
        setPriority(event.target.value);
    }
    function handleListName(event) {
        event.preventDefault();
        setListName(event.target.value);
    }
    return (
        <div className="create-list">
            <div
                className="create-list-header"
            >
                {list.length > 0 ? `Add to ${list[0].list_name || "list"}` : "New List"}
            </div>
            <div
                className="create-list-header error"
            >
                {inputErr}
            </div>
            {savedListName.length > 0 && list.length > 0 ? (
                <div />
            ) : (
                    <div>
                        <input
                            type="text"
                            className="form-input"
                            value={listName}
                            placeholder="Name your list"
                            name={"list_name"}
                            onChange={handleListName}
                        />
                        <Button
                            text="Add List Name"
                            class="white-button"
                            disabled={listName.length < 1 ? true : false}
                            action={() => props.addListName(list[0].list_id, listName)}
                        />
                    </div>
                )}
            <input
                type="text"
                className="form-input"
                value={newItem}
                placeholder={"Add an item"}
                onChange={handleInputChange}
                name={"item"}
            />
            <select
                className="store-dropdown"
                defaultValue={priority}
                onChange={changePriority}
            >
                <option className="store-select-item" value="Low">
                    Low
                </option>
                <option className="store-select-item" value="Normal">
                    Normal
                </option>
                <option className="store-select-item" value="High">
                    High
                </option>
            </select>
            {showStores && props.stores.length > 0 ? (
                <select
                    className="store-dropdown"
                    onChange={addStore}
                >
                    {props.stores.map((store, index) => (
                        <option
                            key={store.id + index}
                            value={JSON.stringify(store)}
                            className="store-select-item"
                        >
                            {store.name}
                        </option>
                    ))}
                </select>
            ) : (<div />)}
            {list.length > 0 ? (
                <div>
                    <Flip bottom cascade>
                        <List
                            list={list}
                            updateItemPosition={props.updateItemPosition}
                            deleteItem={props.deleteItem}
                        />
                    </Flip>
                </div>
            ) : (<div />)}
            {showAdd ? (
                <Button
                    text="Add"
                    class="blue-button"
                    action={addItem}
                    disabled={newItem.length < 1 ? true : false}
                />
            ) : (<div />)}
        </div>
    )
}

export default CreateList;