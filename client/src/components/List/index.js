import React from "react";
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
                        {item.name}
                    </div>
                    <div className="list-item-col">
                        {item.store}
                    </div>
                    <div className="list-item-col">
                        {item.priority}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default List;