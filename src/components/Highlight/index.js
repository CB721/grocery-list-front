import React from 'react';
import "./style.scss";

function Hightlight({ currBenefit, svgs }) {
    console.log(svgs);
    return (
        <div className={`highlight ${currBenefit.color}`}>
            <div className="display">
                {svgs}
            </div>
            <div className="description">
                {currBenefit.cardName}
            </div>
        </div>
    );
}

export default Hightlight;