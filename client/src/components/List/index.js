import React, {useEffect, useState} from "react";
import Checkbox from "../Checkbox";
import "./style.scss";

function List(props) {
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(props.list);
    }, [props.list]);
    return (
        <div className="list">
            {list.map((item, index) => (
                <div
                    className="list-item"
                    key={index}
                >
                    <div className="list-item-col">
                        {item.name}
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
                                        onChange={(event) => props.changePriority(event, item.id)}
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
                                    // if item has been purchased or not, change class
                                    class={item.purchased === 0 ? "to-get" : "done"}
                                    toggleClass={(event) => props.toggleClass(event, item.id, index)}
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