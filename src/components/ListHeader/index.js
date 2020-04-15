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
                    {props.firstCol ? (
                        <div
                            className="list-header-col hover"
                            onClick={(event) => action(event, props.firstCol)}
                            style={{ cursor: "pointer" }}
                        >
                            {props.firstCol}
                        </div>
                    ) : (
                            <div className="list-header-col" />
                        )}
                    {props.secondCol ? (
                        <div
                            className="list-header-col hover"
                            onClick={(event) => action(event, props.secondCol)}
                            style={{ cursor: "pointer" }}
                        >
                            {props.secondCol}
                        </div>
                    ) : (
                            <div className="list-header-col" />
                        )}
                    {props.thirdCol ? (
                        <div
                            className="list-header-col hover"
                            onClick={(event) => action(event, props.thirdCol)}
                            style={{ cursor: "pointer" }}
                        >
                            {props.thirdCol}
                        </div>
                    ) : (
                            <div className="list-header-col" />
                        )}
                    {props.fourthCol ? (
                        <div
                            className="list-header-col hover"
                            onClick={(event) => action(event, props.fourthCol)}
                            style={{ cursor: "pointer" }}
                        >
                            {props.fourthCol}
                        </div>

                    ) : (
                            <div className="list-header-col" />

                        )}
                </div>
            ) : (
                    <div className="list-headers">
                        {props.firstCol ? (
                            <div
                                className="list-header-col hover"
                            >
                                {props.firstCol}
                            </div>
                        ) : (
                                <div className="list-header-col" />
                            )}
                        {props.secondCol ? (
                            <div
                                className="list-header-col hover"
                            >
                                {props.secondCol}
                            </div>
                        ) : (
                                <div className="list-header-col" />
                            )}
                        {props.thirdCol ? (
                            <div
                                className="list-header-col hover"
                            >
                                {props.thirdCol}
                            </div>
                        ) : (
                                <div className="list-header-col" />
                            )}
                        {props.fourthCol ? (
                            <div
                                className="list-header-col hover"
                            >
                                {props.fourthCol}
                            </div>

                        ) : (
                                <div className="list-header-col" />

                            )}
                    </div>
                )}
        </div>
    )
}

export default ListHeader;