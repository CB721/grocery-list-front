import React from 'react';
import Card from "../Card";
import "./style.scss";

function CardCarousel(props) {
    return (
        <div className="card-carousel">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    )
}

export default CardCarousel;