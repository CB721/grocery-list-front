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
                        {item.priority}
                        {props.viewList ? (
                            <Checkbox
                                class={item.status}
                                toggleClass={props.toggleClass}
                            />
                        ) : (<div />)}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default List;