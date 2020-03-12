import React from 'react';
import { Textfit } from "react-textfit";
import "./style.scss";

function Card(props) {
    return (
        <div className="card" aria-label={props.cardName + " card"}>
            <img
                src={props.imageLink || "https://images.unsplash.com/photo-1517817748493-49ec54a32465?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"}
                alt={props.text}
                className="card-image"
            />
            <div className="card-body-text">
                <Textfit
                    mode="single"
                    min={4}
                    max={16}
                >
                    {props.text}
                </Textfit>
            </div>
            <div className="card-tooltip">
                {props.cardName}
            </div>
        </div>
    )
}

export default Card;