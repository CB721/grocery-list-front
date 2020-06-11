import React from 'react';
import "./style.scss";

function ListHeader(props) {
    console.log(props);
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
                            className={props.isMobile ? "list-header-col view-list-mobile hover" : "list-header-col hover"}
                            onClick={(event) => action(event, props.firstCol)}
                            style={{ cursor: "pointer" }}
                        >
                            {props.firstCol}
                        </div>
                    ) : (
                            <div className={props.isMobile ? "list-header-col view-list-mobile hover" : "list-header-col hover"} />
                        )}
                    {props.secondCol ? (
                        <div
                            className={props.isMobile ? "list-header-col view-list-mobile hover" : "list-header-col hover"}
                            onClick={(event) => action(event, props.secondCol)}
                            style={{ cursor: "pointer" }}
                        >
                            {props.secondCol}
                        </div>
                    ) : (
                            <div className={props.isMobile ? "list-header-col view-list-mobile hover" : "list-header-col hover"} />
                        )}
                    {props.thirdCol ? (
                        <div
                            className={props.isMobile ? "list-header-col view-list-mobile hover" : "list-header-col hover"}
                            onClick={(event) => action(event, props.thirdCol)}
                            style={{ cursor: "pointer" }}
                        >
                            {props.thirdCol}
                        </div>
                    ) : (
                            <div className={props.isMobile ? "list-header-col view-list-mobile hover" : "list-header-col hover"} />
                        )}
                    {props.fourthCol ? (
                        <div
                            className={props.isMobile ? "list-header-col view-list-mobile hover" : "list-header-col hover"}
                            onClick={(event) => action(event, props.fourthCol)}
                            style={{ cursor: "pointer" }}
                        >
                            {props.fourthCol}
                        </div>

                    ) : (
                            <div className={props.isMobile ? "list-header-col view-list-mobile hover" : "list-header-col hover"} />

                        )}
                </div>
            ) : (
                    <div className="list-headers">
                        {props.firstCol ? (
                            <div
                                className={props.isMobile ? "list-header-col view-list-mobile hover" : "list-header-col hover"}
                            >
                                {props.firstCol}
                            </div>
                        ) : (
                                <div className={props.isMobile ? "list-header-col view-list-mobile" : "list-header-col"} />
                            )}
                        {props.secondCol ? (
                            <div
                                className={props.isMobile ? "list-header-col view-list-mobile hover" : "list-header-col hover"}
                            >
                                {props.secondCol}
                            </div>
                        ) : (
                                <div className={props.isMobile ? "list-header-col view-list-mobile" : "list-header-col"} />
                            )}
                        {props.thirdCol ? (
                            <div
                                className={props.isMobile ? "list-header-col view-list-mobile hover" : "list-header-col hover"}
                            >
                                {props.thirdCol}
                            </div>
                        ) : (
                                <div className={props.isMobile ? "list-header-col view-list-mobile" : "list-header-col"} />
                            )}
                        {props.fourthCol ? (
                            <div
                                className={props.isMobile ? "list-header-col view-list-mobile hover" : "list-header-col hover"}
                            >
                                {props.fourthCol}
                            </div>
                        ) : (
                                <div className={props.isMobile ? "list-header-col view-list-mobile" : "list-header-col"} />
                            )}
                    </div>
                )}
        </div>
    )
}

export default ListHeader;