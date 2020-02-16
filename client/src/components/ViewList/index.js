import React, { useState, useEffect } from "react";
import List from "../List";
import Flip from "react-reveal";
import "./style.scss";

function ViewList(props) {
    const [currentView, setCurrentView] = useState("current");
    const [current, setCurrent] = useState("option-header selected");
    const [prev, setPrev] = useState("option-header");
    // default value will change to data from db
    // save full list to state
    const [list, setList] = useState([]);
    const [displayList, setDisplayList] = useState(list);
    const [stores, setStores] = useState([]);
    const [previousLists, setPreviousLists] = useState([]);


    useEffect(() => {
        setList(props.list);
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
        console.log(event.target.value);
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
            {currentView === "current" ? (
                <div>
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
                    <Flip bottom cascade>
                        <List
                            viewList={true}
                            list={displayList}
                            toggleClass={toggleClass}
                            changePriority={changePriority}
                            updateItemPosition={props.updateItemPosition}
                        />
                    </Flip>
                </div>
            ) : (
                    <div>
                    <select
                        className="store-filter"
                        default="DESC"
                        onChange={(event) => viewListByDate(event)}
                    >
                        <option value="DESC">Newest First</option>
                        <option value="ASC">Oldest First</option>
                    </select>
                        {previousLists.length > 0 ? (
                            <List
                                viewList={false}
                                list={previousLists}
                            />
                        ) : (<div />)}
                    </div>
                )}
        </div>
    )
}

export default ViewList;