import React, { useState, useEffect } from "react";
import { Textfit } from "react-textfit";
import { ReactComponent as Trash } from "../../assets/images/trash.svg";
import Form from "../Form";
import Flip from 'react-reveal/Flip';
import API from "../../utilities/api";
import LoadingBar from "../LoadingBar";
import Modal from "../Modal";
import LoadingSpinner from "../LoadingSpinner";
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
    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState("hide");
    const [modal, setModal] = useState(false);
    const [cache, setCache] = useState([]);

    const config = {
        onUploadProgress: progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
        }
    };
    useEffect(() => {
        switch (currentView) {
            case "view":
                setAdd("option-header");
                setView("option-header selected");
                setSearch("");
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
    }, [props.stores]);
    function toggleOptions(event) {
        event.preventDefault();
        setCurrentView(event.currentTarget.id);
    }
    function handleInputChange(event) {
        event.preventDefault();
        const { value, name } = event.target;
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
        // if there is text in the search bar, show the loading bar
        if (value.length > 0) {
            setShowProgress("show");
        } else {
            setShowProgress("hide");
        }
        // if the text goes below the threshold for searching, reset progress bar
        if (value.length <= 4) {
            setProgress(value.length * 25);
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
    // function validateField(event) {
    //     const type = event.target.name;
    //     const value = event.target.value;
    //     // set error message for individual input fields
    //     console.log(type, value);
    // }
    useEffect(() => {
        getCache();
    }, []);
    function getCache() {
        const savedCache = localStorage.getItem("storeSearches");
        if (savedCache) {
            setCache(JSON.parse(savedCache));
        }
    }
    function searchCache() {
        return new Promise((resolve, reject) => {
            let newResults = [];
            for (let i = 0; i <= cache.length; i++) {
                // if the item in cache includes what is being searched or if what is being searched includes the item in cache
                if (i === cache.length) {
                    resolve(newResults);
                } else if (cache[i].search && (cache[i].search.includes(search) || search.includes(cache[i].search))) {
                    // add results to current results
                    newResults = [...results, cache[i].results];
                    // flatten array
                    function flatDeep(arr, d = 1) {
                        return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
                            : arr.slice();
                    };
                    newResults = flatDeep(newResults, Infinity);
                    // save to state
                    setResults(newResults);
                }
            }
        });
    }
    function getSearchResults() {
        const data = {
            search,
        }
        if (props.coords) {
            data["coords"] = props.coords;
        }
        // check if there is a cache in state / local storage and the manually add a store option hasn't been triggered and nothing has been added to the results yet
        // search the cache for any items that include the current search value
        searchCache()
            .then(res => {
                // if no results were found in the cache, search the api
                if (!res.length) {
                    API.searchPlaces(data, config)
                        .then(res => {
                            setResults(res.data);
                            // set a cache to avoid excessive calls to the api
                            if (res.data.length) {
                                const cacheResult = {
                                    results: res.data,
                                    search
                                }
                                let newCache = [cacheResult];
                                if (cache.length > 0) {
                                    newCache = [...cache, cacheResult];
                                }
                                console.log(newCache);
                                // save to state
                                setCache(newCache);
                                // save to local storage
                                localStorage.setItem("storeSearches", JSON.stringify(newCache));
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            // save what the user attempted to search to local storage to prepopulate the search field with on refresh
                            localStorage.setItem("storeSearchErr", search);
                        });
                } else {
                    console.log("api not searched");
                }
            });
    }
    useEffect(() => {
        const errSearch = localStorage.getItem("storeSearchErr");
        if (errSearch) {
            setSearch(errSearch);
        }
    }, []);
    function saveStore(event, store) {
        event.preventDefault();
        const storeData = {
            id: store.id,
            name: store.structured_formatting.main_text,
            address: store.structured_formatting.secondary_text,
            user_id: props.userID
        }
        setProgress(0);
        setModal(true);
        API.saveStore(storeData, config)
            .then(res => {
                if (res.data.affectedRows > 0) {
                    // notify user of sucessfully added store
                    props.refreshStores();
                    setCurrentView("view");
                    setModal(false);
                    setProgress(0);
                    props.notification(`${storeData.name} saved to your stores`);
                }
            })
            .catch(err => console.log(err.response.data));
    }
    function removeStore(event, id) {
        event.preventDefault();
        setProgress(0);
        setModal(true);
        API.deleteUserStore(id, config)
            .then(res => {
                if (res.data.affectedRows > 0) {
                    // notify user of successfully removed store
                    props.refreshStores();
                    props.notification("Store removed");
                    setModal(false);
                    setProgress(0);
                }
            })
            .catch(err => console.log(err));
    }
    function customStore(event) {
        event.preventDefault();
        // unique id to append count total to
        // this will ensure a unique id is created for the custom store
        let uniqueIDChoices = "dbcad414febafecbdfd2bc48438c7c649acdae36";
        let uniqueID = "";
        for (let i = 0; i < uniqueIDChoices.length; i++) {
            let randomCharacter = Math.floor(Math.random() * uniqueIDChoices.length);
            uniqueID += randomCharacter;
        }
        // get count of stores already saved to db
        API.getStoreCount()
            .then(res => {
                let numberStr = (res.data).toString();
                uniqueID += numberStr;
                // limit unique id to 60 characters
                if (uniqueID.length > 60) {
                    uniqueID = uniqueID.substring(uniqueID.length - 60, uniqueID.length);
                }
                // repack info from user for save store function
                const store = {
                    id: uniqueID,
                    structured_formatting: {
                        main_text: storeName,
                        secondary_text: storeAddress
                    }
                }
                saveStore(event, store);
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="store">
            {modal ? (
                <Modal
                    open={modal}
                    content={<LoadingBar
                        progress={progress}
                        show={"show"}
                    />}
                />
            ) : (<div />)}
            <div className="store-options" aria-label="store options">
                <div
                    className={view}
                    id="view"
                    onClick={(event) => toggleOptions(event)}
                    aria-label="view your saved stores"
                >
                    View Stores
                </div>
                <div
                    className={add}
                    id="add"
                    onClick={(event) => toggleOptions(event)}
                    aria-label="save a new store"
                >
                    Add a Store
                </div>
            </div>
            {currentView === "view" ? (
                <div className="list" aria-label="saved stores list">
                    {props.stores.length > 0 ? (
                        <div>
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
                                            aria-label="remove store from saved list"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (<LoadingSpinner />)}
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
                            aria-label="search for a new store"
                        />
                        {results.length > 0 ? (
                            <Flip bottom cascade>
                                <div className="store-results-section" aria-label="store search results">
                                    {results.map((result, index) => (
                                        <div
                                            key={result.id + index}
                                            className="search-result"
                                            onClick={(event) => saveStore(event, result)}
                                            aria-label="save store"
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
                        ) : (<LoadingBar
                            progress={progress}
                            show={showProgress}
                        />)}
                    </div>
                )}
            {currentView === "add" && manualStore ? (
                <Form
                    inputs={inputs}
                    type={"Custom Store"}
                    handleInputChange={handleInputChange}
                    action={customStore}
                    disableButton={disableFormButton}
                    validateField={validateCustomStore}
                />
            ) : (<div />)}
        </div>
    )
}

export default Store;