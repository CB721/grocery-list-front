import React, { useState, useEffect } from "react";
import { ReactComponent as Edit } from "../../assets/images/edit.svg";
import Button from "../Button";
import List from "../List";
import ListHeader from "../ListHeader";
import Dropdown from "../Dropdown";
import { isOnline } from "../../utilities/offlineActions";
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
    const [updateListName, setUpdateListName] = useState(false);
    const [editListItems, setEditListItems] = useState(false);
    const [itemSuggestions, setItemSuggestions] = useState([]);

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
        // if the value length is greater than 3, call api for item suggestions
        if (value.length > 3 && isOnline()) {
            props.itemSuggestion({ search: value })
                .then(res => {
                    setItemSuggestions(res);
                })
                .catch(err => console.log(err));
        }
    }
    function setNewItemToSuggestion(word) {
        setNewItem(word);
        setItemSuggestions([]);
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
            if (props.list.length) {
                completeItem["list_id"] = props.list[0].list_id;
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
        // if the user only has one store, default store selection to that store
        if (props.stores.length === 1) {
            setStoreSelect(props.stores[0]);
            setShowAdd(true);
        }
        setPriority(event.target.value);
    }
    function handleListName(event) {
        event.preventDefault();
        setListName(event.target.value);
    }
    function editListName(event) {
        event.preventDefault();
        props.addListName(list[0].list_id, listName);
        setUpdateListName(false);
    }
    function editItems() {
        setEditListItems(!editListItems);
        console.log("edit list items", editListItems);
    }
    const [singleItemName, setSingleItemName] = useState({});
    function editSingleItem(event, itemID, col) {
        event.preventDefault();
        let value = ""
        switch (col) {
            case "name":
                setSingleItemName({
                    id: itemID,
                    value: event.target.value
                });
                value = event.target.value;
                break;
            case "store":
                const filteredStore = props.stores.filter(store => {
                    if (store.name === event.target.value) {
                        return true;
                    }
                });
                value = filteredStore[0].store_id;
                break;
            case "priority":
                value = event.target.value;
                break;
            default:
                return;
        }
        props.updateItem(itemID, col, value);
    }
    return (
        <div className="create-list">
            <div
                className="create-list-header list-name"
                aria-label={list.length > 0 ? list[0].list_name || "list" : "new list"}
                onClick={() => setUpdateListName(!updateListName)}
            >
                {list.length > 0 ? `Edit ${list[0].list_name || "list"}` : "New List"}
            </div>
            {isOnline() ? (
                <div className="list-edit">
                    <Edit
                        className="edit-icon"
                        onClick={editItems}
                    />
                </div>
            ) : (<div />)}
            <div
                className="create-list-header error"
                aria-label={"error message " + inputErr}
            >
                {inputErr}
            </div>
            {savedListName.length > 0 && list.length > 0 ? (
                <div />
            ) : list.length > 0 && savedListName.length < 1 && isOnline() ? (
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
            {updateListName ? (
                <div>
                    <input
                        type="text"
                        className="form-input"
                        value={listName}
                        placeholder="New List Name"
                        name={"list_name"}
                        onChange={handleListName}
                        aria-label={"list name"}
                    />
                    <Button
                        text="Add List Name"
                        class="white-button"
                        disabled={listName.length < 1 ? true : false}
                        action={(event) => editListName(event)}
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
            <div className="dropdown-section">
                <Dropdown
                    items={itemSuggestions}
                    action={setNewItemToSuggestion}
                />
            </div>
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
            {showStores && props.stores.length > 1 ? (
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
            ) : showStores && props.stores.length === 1 ? (
                <select
                    className="store-dropdown"
                    onChange={addStore}
                    defaultValue="select"
                    aria-label="store selection"
                >
                    <option
                        value={JSON.stringify(props.stores[0])}
                        className="store-select-item"
                        aria-label={props.stores[0].name}
                    >
                        {props.stores[0].name}
                    </option>
                </select>
            ) : (<div />)}
            {showAdd ? (
                <Button
                    text="Add"
                    class="blue-button"
                    action={addItem}
                    disabled={newItem.length < 1 ? true : false}
                />
            ) : (<div />)}
            {list.length > 0 && !editListItems ? (
                <div>
                    <ListHeader
                        firstCol="Item Name"
                        secondCol="Store"
                        thirdCol="Priority"
                        fourthCol="Remove Item"
                    />
                    <Flip bottom cascade>
                        <List
                            list={list}
                            updateItemPosition={props.updateItemPosition}
                            deleteItem={props.deleteItem}
                        />
                    </Flip>
                </div>
            ) : list.length ? (
                <div>
                    <ListHeader
                        firstCol="Item Name"
                        secondCol="Store"
                        thirdCol="Priority"
                    />
                    {list.map((item, index) => (
                        <div
                            className="list-item"
                            key={index}
                        >
                            <input
                                type="text"
                                className="form-input-edit"
                                value={singleItemName.id === item.id ? singleItemName.value : item.name}
                                placeholder={item.name}
                                name={item.name + "list-item"}
                                onChange={(event) => editSingleItem(event, item.id, "name")}
                                aria-label={"change item name"}
                            />
                            <select
                                className="store-selection"
                                defaultValue={item.store_name}
                                onChange={(event) => editSingleItem(event, item.id, "store")}
                                aria-label="change item store"
                            >
                                {props.stores.map(store => (
                                    <option value={store.name} key={store.store_id}>
                                        {store.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="store-selection"
                                defaultValue={item.priority}
                                onChange={(event) => editSingleItem(event, item.id, "priority")}
                                aria-label="select a priority level"
                            >
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
                        </div>
                    ))}
                </div>
            ) : (<div />)}
        </div>
    )
}

export default CreateList;