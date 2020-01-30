import React, { useState, useEffect } from "react";
import List from "../List";
import Flip from "react-reveal";
import userList from "../../assets/data/list.json";
import "./style.scss";

function ViewList(props) {
    const [currentView, setCurrentView] = useState("current");
    const [current, setCurrent] = useState("option-header selected");
    const [prev, setPrev] = useState("option-header");
    const [list, setList] = useState(userList);
    // console.log(list);
    useEffect(() => {
        switch (currentView) {
            case "current":
                setPrev("option-header");
                setCurrent("option-header selected");
                break;
            case "prev":
                setPrev("option-header selected");
                setCurrent("option-header");
                break;
        }
    }, [currentView]);

    function toggleOptions(event) {
        event.preventDefault();
        setCurrentView(event.currentTarget.id);
    }
    function toggleClass(event,index) {
        event.preventDefault();
        const newList = [];
        // iterate over list
        for (let i = 0; i < list.length; i++) {
            // on the selected item
            if (i === index) {
                if (list[index].status === "done") {
                    list[index].status = "to-get";
                } else {
                    list[index].status = "done";
                }
                // add updated item to "new" list
                newList.push(list[i]);
            } else {
                // add unchanged item to "new" list
                newList.push(list[i]);
            }
        }
        setList(newList);
        // save updated list to db
    }
    function changePriority(event, index) {
        event.preventDefault();
        const newList = [];
        // iterate over list
        for (let i = 0; i < list.length; i++) {
            // on the selected item
            if (i === index) {
                list[index].priority = event.target.value;
                // add updated item to "new" list
                newList.push(list[i]);
            } else {
                // add unchanged item to "new" list
                newList.push(list[i]);
            }
        }
        setList(newList);
        // save updated list to db
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
                <Flip bottom cascade>
                    <List
                        viewList={true}
                        list={list}
                        toggleClass={toggleClass}
                        changePriority={changePriority}
                    />
                </Flip>
            ) : (<div />)}
        </div>
    )
}

export default ViewList;