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
    const [priority, setPriority] = useState("normal");
    const [inputErr, setInputErr] = useState("");

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
        if (storeSelect.length > 0) {
            setShowAdd(true);
        } else {
            setShowAdd(false);
        }
    }, [storeSelect]);
    function addStore(event) {
        event.preventDefault();
        setShowAdd(true);
        setStoreSelect(event.target.value);
    }
    function addItem(event) {
        event.preventDefault();
        if (newItem.length < 1) {
            setInputErr("Add an item");
        } else {
            const completeItem = {
                name: newItem,
                store: storeSelect,
                priority
            }
            setNewItem("");
            setList(list => [...list, completeItem]);
        }
    }
    function saveList(event) {
        event.preventDefault();
        setPriority("normal");
        console.log("save list");
        console.log(list);
    }
    function changePriority(event) {
        event.preventDefault();
        setPriority(event.target.value);
    }
    return (
        <div className="create-list">
            <div className="create-list-header">New List</div>
            <div className="create-list-header error">{inputErr}</div>
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
                defaultValue="Normal"
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
            {showStores && props.data.length > 0 ? (
                <select
                    className="store-dropdown"
                    onChange={addStore}
                >
                    {props.data.map((store, index) => (
                        <option
                            key={store.id + index}
                            value={store.id}
                            className="store-select-item"
                        >
                            {store.store_name}
                        </option>
                    ))}
                </select>
            ) : (<div />)}
            {list.length > 0 ? (
                <div>
                    <Flip bottom cascade>
                        <List
                            list={list}
                        />
                    </Flip>
                </div>
            ) : (<div />)}
            {showAdd ? (
                <Button
                    text="Add"
                    class="blue-button"
                    action={addItem}
                />
            ) : (<div />)}
            {list.length > 0 ? (
                <Button
                    text="Save"
                    class="blue-button"
                    action={saveList}
                />
            ) : (<div />)}
        </div>
    )
}

export default CreateList;