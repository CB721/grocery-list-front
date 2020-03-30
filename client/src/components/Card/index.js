import React from 'react';
import "./style.scss";

function Card(props) {
    return (
        <div className="cust-card" aria-label={props.cardName + " card"} style={{ background: props.background }}>
            <div className="card-body-text" style={{ color: props.color }}>
                {props.text}
            </div>
        </div>
    )
}

export default Card;