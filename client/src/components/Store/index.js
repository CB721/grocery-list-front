import React, { useState, useEffect } from "react";
import { Textfit } from "react-textfit";
import { ReactComponent as Trash } from "../../assets/images/trash.svg";
import Form from "../Form";
import Error from "../Error";
import Flip from 'react-reveal/Flip';
import API from "../../utilities/api";
import "./style.scss";

function Store(props) {
    const [currentView, setCurrentView] = useState("view");
    const [add, setAdd] = useState("option-header");
    const [view, setView] = useState("option-header selected");
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [manualStore, setManualStore] = useState(false);
    const [storeAddress, setStoreAddress] = useState("");
    const [storeName, setStoreName] = useState("");
    const inputs = [{ "Store Address": storeAddress }, { "Store Name": storeName }];
    const [disableFormButton, setDisableFormButton] = useState(true);

    useEffect(() => {
        switch (currentView) {
            case "view":
                setAdd("option-header");
                setView("option-header selected");
                break;
            case "add":
                setAdd("option-header selected");
                setView("option-header");
                break;
            default:
                return;
        }
    }, [currentView]);
    useEffect(() => {
        // if there are new stores currently assigned
        // set view to add a store
        if (props.stores.length < 1) {
            setCurrentView("add");
        }
    }, []);
    function toggleOptions(event) {
        event.preventDefault();
        setCurrentView(event.currentTarget.id);
    }
    function handleInputChange(event) {
        event.preventDefault();
        let value = event.target.value;
        let name = event.target.name;
        switch (name) {
            case "Store Address":
                setStoreAddress(value);
                validateCustomStore();
                break;
            case "Store Name":
                setStoreName(value);
                validateCustomStore();
                break;
            default:
                setSearch(value);
                // only call autocomplete api after user has typed at least 4 characters
                if (search.length > 3) {
                    getSearchResults();
                } else {
                    // if user deletes characters, clear results
                    setResults([]);
                    setManualStore(false);
                }
                break;
        }
        // only display option to input a store if no results from user search
        if (search.length > 5 && results.length < 1) {
            setManualStore(true);
        } else {
            setManualStore(false);
        }
    }
    function validateCustomStore() {
        if (storeAddress.length < 1) {
            setDisableFormButton(true);
        }
        if (storeName.length < 1) {
            setDisableFormButton(true);
        }
        else {
            setDisableFormButton(false);
        }
    }
    function getSearchResults() {
        const data = {
            search,
        }
        API.searchPlaces(data)
            .then(res => {
                setResults(res.data);
            })
            .catch(err => console.log(err));
    }
    function saveStore(event, store) {
        event.preventDefault();
        console.log("save store to user profile");
        console.log(store);
        const storeData = {
            id: store.id,
            name: store.structured_formatting.main_text,
            address: store.structured_formatting.secondary_text,
            user_id: "5e3afb5803935005eeeef6e9"
        }
        API.saveStore(storeData)
            .then(res => {
                if (res.data.affectedRows > 0) {
                    // notify user of sucessfully added store
                    props.refreshStores();
                }
            })
            .catch(err => console.log(err));
    }
    function removeStore(event, id, confirm = false) {
        event.preventDefault();
        if (confirm) {
            API.deleteUserStore(id)
                .then(res => {
                    if (res.data.affectedRows > 0) {
                        // notify user of successfully removed store
                        props.refreshStores();
                    }
                })
                .catch(err => console.log(err));
        } else {
            // notify user to confirm store removal
            // call function again with confirm as true
        }
    }
    function customStore(event) {
        event.preventDefault();
        // get count of stores already saved to db
        let uniqueID = "dbcad414febafecbdfd2bc48438c7c649acdae36";
        // repack info from user for save store function
        const store = {
            id: "",
            structured_formatting: {
                main_text: storeName,
                secondary_text: storeAddress
            }
        }
        console.log(store);
    }
    return (
        <div className="store">
            <div className="store-options">
                <div
                    className={view}
                    id="view"
                    onClick={(event) => toggleOptions(event)}
                >
                    View Stores
                </div>
                <div
                    className={add}
                    id="add"
                    onClick={(event) => toggleOptions(event)}
                >
                    Add a Store
                </div>
            </div>
            {currentView === "view" ? (
                <div className="list">
                    {props.stores.map((store, index) => (
                        <div
                            className="list-item"
                            key={index}
                        >
                            <div className="store-li-col left">
                                {store.name}
                            </div>
                            <div className="store-li-col right">
                                <Trash
                                    className="edit-icon"
                                    onClick={(event) => removeStore(event, store.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                    <div className="store-search">
                        <input
                            type="text"
                            className="form-input"
                            value={search}
                            placeholder={"Search for a store"}
                            onChange={handleInputChange}
                            name={"search"}
                        />
                        {results.length > 0 ? (
                            <Flip bottom cascade>
                                <div className="store-results-section">
                                    {results.map((result, index) => (
                                        <div
                                            key={result.id + index}
                                            className="search-result"
                                            onClick={(event) => saveStore(event, result)}
                                        >
                                            <Textfit
                                                mode="single"
                                                min={10}
                                                max={18}
                                                className="store-info store-name"
                                            >
                                                {result.structured_formatting.main_text}
                                            </Textfit>
                                            <Textfit
                                                mode="single"
                                                min={12}
                                                max={16}
                                                className="store-info store-address"
                                            >
                                                {result.structured_formatting.secondary_text.split(", USA")[0]}
                                            </Textfit>
                                        </div>
                                    ))}
                                </div>
                            </Flip>
                        ) : (<div />)}
                    </div>
                )}
            {currentView === "add" && manualStore ? (
                <Form
                    inputs={inputs}
                    type={"Custom Store"}
                    handleInputChange={handleInputChange}
                    action={customStore}
                    disableButton={disableFormButton}
                />
            ) : (<div />)}
        </div>
    )
}

export default Store;