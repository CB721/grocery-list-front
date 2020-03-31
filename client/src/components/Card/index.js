import React from 'react';
import "./style.scss";

function Card(props) {
    return (
        <div
            className="cust-card"
            aria-label={props.cardName + " card"}
            style={{ background: props.background }}
            onClick={() => props.action(props.cardName)}
            ref={props.referral}
        >
            <a
                className="card-body-text"
                style={{ color: props.color }}
                href={`#${props.cardName}`}
            >
                {props.text}
            </a>
        </div>
    )
}

export default Card;