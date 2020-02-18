import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Checkbox from "../Checkbox";
import convertDate from "../../utilities/convertDate";
import "./style.scss";

function List(props) {
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(props.list);
    }, [props.list]);

    function getListItemStyle(isDragging, draggableStyle) {
        const style = {
            userSelect: "none",
            background: isDragging ? "#F9FCFF" : "#3C91E6",
            color: isDragging ? "#3C91E6" : "#F9FCFF",
            cursor: isDragging ? "pointer" : "default",
            "WebkitBoxShadow": isDragging ? "0px 3px 2px -2px rgba(47,51,56,0.64)" : "",
            "MozBoxShadow": isDragging ? "0px 3px 2px -2px rgba(47,51,56,0.64)" : "",
            "boxShadow": isDragging ? "0px 3px 2px -2px rgba(47,51,56,0.64)" : "",
            ...draggableStyle
        }
        return style;
    }
    function reorder(userList, startIndex, endIndex) {
        const result = Array.from(userList);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }
    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        const items = reorder(
            list,
            result.source.index,
            result.destination.index
        )
        if (props.updateItemPosition) {
            props.updateItemPosition(items);
            setList(items);
        }
    }
    function action(event, info) {
        event.preventDefault();
        // if list has been provided a action function
        if (props.action && typeof (props.action) === "function") {
            props.action(info);
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                droppableId="droppable"
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="list"
                    >
                        {list.map((item, index) => (
                            <Draggable
                                draggableId={index.toString()}
                                index={index}
                                key={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        className="list-item"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getListItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        <div
                                            className="list-item-col"
                                            onClick={(event) => action(event, item)}
                                        >
                                            {item.name}
                                        </div>
                                        <div
                                            className="list-item-col"
                                            onClick={(event) => action(event, item)}
                                        >
                                            {item.store_name || item.list_name || convertDate(item.date_added.split("T")[0])}
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
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default List;