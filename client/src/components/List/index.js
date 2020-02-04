import React from "react";
import Checkbox from "../Checkbox";
import "./style.scss";

function List(props) {
    return (
        <div className="list">
            {props.list.map((item, index) => (
                <div
                    className="list-item"
                    key={index}
                >
                    <div className="list-item-col">
                        {item.item_name}
                    </div>
                    <div className="list-item-col">
                        {item.store_name}
                    </div>
                    <div className="list-item-col">
                        <div className="sub-col priority">
                            {props.viewList ? (
                                <div>
                                    <select
                                        className="store-dropdown"
                                        defaultValue={item.priority}
                                        onChange={(event) => props.changePriority(event, index)}
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
                                    class={item.status}
                                    toggleClass={(event) => props.toggleClass(event, index)}
                                />
                            ) : (<div />)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default List;