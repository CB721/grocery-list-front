import React, { useState, useEffect } from "react";
import List from "../List";
import Flip from "react-reveal";
import userList from "../../assets/data/list.json";
import "./style.scss";

function ViewList(props) {
    const [currentView, setCurrentView] = useState("current");
    const [current, setCurrent] = useState("option-header selected");
    const [prev, setPrev] = useState("option-header");

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
                        list={userList}
                    />
                </Flip>
            ) : (<div />)}
        </div>
    )
}

export default ViewList;