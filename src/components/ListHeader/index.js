import React from 'react';
import Button from "../Button";
import "./style.scss";

function ListHeader(props) {
    function action(event, col) {
        event.preventDefault();
        if (props.action && typeof (props.action) === "function") {
            props.action(col);
        }
    }
    return (
        <div>
            {props.action ? (
                <div className="list-headers">
                    <div
                        className="list-header-col"
                        onClick={(event) => action(event, props.firstCol)}
                        style={{cursor: "pointer"}}
                    >
                        {props.firstCol}
                    </div>
                    <div
                        className="list-header-col"
                        onClick={(event) => action(event, props.secondCol)}
                        style={{cursor: "pointer"}}
                    >
                        {props.secondCol}
                    </div>
                    <div
                        className="list-header-col"
                        onClick={(event) => action(event, props.thirdCol)}
                        style={{cursor: "pointer"}}
                    >
                        {props.thirdCol}
                    </div>
                    <div
                        className="list-header-col"
                        onClick={(event) => action(event, props.fourthCol)}
                        style={{cursor: "pointer"}}
                    >
                        {props.fourthCol}
                    </div>
                </div>
            ) : (
                    <div className="list-headers">
                        <div
                            className="list-header-col"
                            onClick={(event) => action(event, props.firstCol)}
                        >
                            {props.firstCol}
                        </div>
                        <div
                            className="list-header-col"
                            onClick={(event) => action(event, props.secondCol)}
                        >
                            {props.secondCol}
                        </div>
                        <div
                            className="list-header-col"
                            onClick={(event) => action(event, props.thirdCol)}
                        >
                            {props.thirdCol}
                        </div>
                        <div
                            className="list-header-col"
                            onClick={(event) => action(event, props.fourthCol)}
                        >
                            {props.fourthCol}
                        </div>
                    </div>
                )}
        </div>
    )
}

export default ListHeader;