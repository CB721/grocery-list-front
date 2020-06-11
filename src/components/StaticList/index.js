import React, { useEffect, useState } from "react";
import Checkbox from "../Checkbox";
import convertDate from "../../utilities/convertDate";
import { ReactComponent as Trash } from "../../assets/images/trash.svg";
import "./style.scss";

function StaticList(props) {
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(props.list);
    }, [props.list]);
    function action(event, info) {
        event.preventDefault();
        // if list has been provided a action function
        if (props.action && typeof (props.action) === "function") {
            props.action(info);
        }
    }

    return (
        <div
            className="list"
        >
            {list.map((item, index) => (
                <div
                    className="list-item"
                    key={index}
                >
                    <div
                        className={props.isMobile ? "list-item-col view-list-mobile" : "list-item-col"}
                        aria-label={item.name}
                        onClick={(event) => action(event, item)}
                    >
                        {item.name}
                    </div>
                    <div
                        className={props.isMobile ? "list-item-col view-list-mobile" : "list-item-col"}
                        aria-label={item.store_name || item.list_name || "date"}
                        onClick={(event) => action(event, item)}
                    >
                        {item.store_name || item.list_name || convertDate(item.date_added.split("T")[0])}
                    </div>
                    <div className={props.isMobile ? "list-item-col view-list-mobile" : "list-item-col"}>
                        <div className="sub-col priority">
                            {props.viewList ? (
                                <div>
                                    <select
                                        className="store-dropdown"
                                        defaultValue={item.priority}
                                        onChange={(event) => props.changePriority(event, item.id)}
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
                            ) : (
                                    <div>
                                        {item.priority}
                                    </div>
                                )}
                        </div>
                        <div className="sub-col">
                            {props.viewList ? (
                                <Checkbox
                                    // if item has been purchased or not, change class
                                    class={item.purchased === 0 ? "to-get" : "done"}
                                    toggleClass={(event) => props.toggleClass(event, item.id)}
                                />
                            ) : (
                                    <Trash
                                        className={"edit-icon " + props.hidetrash}
                                        onClick={(event) => props.deleteItem(event, item.id)}
                                        aria-label="remove item"
                                    />
                                )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StaticList;