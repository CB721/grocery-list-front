import React, { useState, useEffect } from "react";
import Button from "../Button";
import Flip from 'react-reveal/Flip';
import "./style.scss";

function CreateList(props) {
    const [newItem, setNewItem] = useState("");
    const [list, setList] = useState([]);
    const [showStores, setShowStores] = useState(false);
    const [storeSelect, setStoreSelect] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [priority, setPriority] = useState("normal");
    // each item should have a name and store

    function handleInputChange(event) {
        event.preventDefault();
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
        const completeItem = {
            name: newItem,
            store: storeSelect,
            priority
        }
        setNewItem("");
        setList(list => [...list, completeItem]);
    }
    function saveList(event) {
        event.preventDefault();
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
            {showAdd ? (
                <Button
                    text="Add"
                    class="blue-button"
                    action={addItem}
                />
            ) : (<div />)}
            {list.length > 0 ? (
                <Flip bottom cascade>
                    {list.map((item, index) => (
                        <div
                            className="list-item"
                            key={index}
                        >
                            <div className="list-item-col">
                                {item.name}
                            </div>
                            <div className="list-item-col">
                                {item.store}
                            </div>
                        </div>
                    ))}
                    <Button
                        text="Save"
                        class="blue-button"
                        action={saveList}
                    />
                </Flip>
            ) : (<div />)}
        </div>
    )
}

export default CreateList;