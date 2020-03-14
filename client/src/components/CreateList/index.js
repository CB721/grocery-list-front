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
            setShowStores(false);
        }
    }, [newItem]);
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
            setShowStores(false);
            props.addItem(completeItem, list.length + 1);
        }
    }
    function changePriority(event) {
        event.preventDefault();
        setShowStores(true);
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
                aria-label={list.length > 0 ? list[0].list_name || "list" : "new list"}
            >
                {list.length > 0 ? `Edit ${list[0].list_name || "list"}` : "New List"}
            </div>
            <div
                className="create-list-header error"
                aria-label={"error message " + inputErr}
            >
                {inputErr}
            </div>
            {savedListName.length > 0 && list.length > 0 ? (
                <div />
            ) : list.length > 0 && savedListName.length < 1 ? (
                <div>
                    <input
                        type="text"
                        className="form-input"
                        value={listName}
                        placeholder="Name your list"
                        name={"list_name"}
                        onChange={handleListName}
                        aria-label={"list name"}
                    />
                    <Button
                        text="Add List Name"
                        class="white-button"
                        disabled={listName.length < 1 ? true : false}
                        action={() => props.addListName(list[0].list_id, listName)}
                    />
                </div>
            ) : (<div />)}
            <input
                type="text"
                className="form-input"
                value={newItem}
                placeholder={"Add an item"}
                onChange={handleInputChange}
                name={"item"}
                aria-label="new item"
            />
            {newItem.length > 1 ? (
                <select
                    className="store-dropdown"
                    defaultValue="select"
                    onChange={changePriority}
                    aria-label="item priority selection"
                >
                    <option className="store-select-item" value="select" disabled={true} aria-label="select a priority level">
                        Select A Priority Level
                    </option>
                    <option className="store-select-item" value="Low" aria-label="low priority">
                        Low
                    </option>
                    <option className="store-select-item" value="Normal" aria-label="normal priority">
                        Normal
                    </option>
                    <option className="store-select-item" value="High" aria-label="high-priority">
                        High
                    </option>
                </select>
            ) : (<div />)}
            {showStores && props.stores.length > 0 ? (
                <select
                    className="store-dropdown"
                    onChange={addStore}
                    defaultValue="select"
                    aria-label="store selection"
                >
                    <option className="store-select-item" value="select" disabled={true} aria-label="select a store">
                        Select A Store
                    </option>
                    {props.stores.map((store, index) => (
                        <option
                            key={store.id + index}
                            value={JSON.stringify(store)}
                            className="store-select-item"
                            aria-label={store.name}
                        >
                            {store.name}
                        </option>
                    ))}
                </select>
            ) : showStores && props.stores.length < 1 ? (
                <div className="create-add-store">
                    Add A Store To Continue
                </div>
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