import React from 'react';
import Card from "../Card";
import "./style.scss";

function Hightlight({ currBenefit }) {
    console.log(currBenefit);
    return (
        <div className={`highlight ${currBenefit.color}`}>
            <div className="display">

            </div>
            <div className="description">
                {currBenefit.cardName}
            </div>
        </div>
    );
}

export default Hightlight;