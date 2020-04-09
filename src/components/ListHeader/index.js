import React from 'react';
import "./style.scss";

function ListHeader(props) {
    return (
        <div className="list-headers">
            <div className="list-header-col">
                {props.firstCol}
            </div>
            <div className="list-header-col">
                {props.secondCol}
            </div>
            <div className="list-header-col">
                <div className="sub-head">
                    {props.thirdCol}
                </div>
                <div className="sub-head">
                    {props.fourthCol}
                </div>
            </div>
        </div>
    )
}

export default ListHeader;