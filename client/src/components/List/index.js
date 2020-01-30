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
                            {item.priority}
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