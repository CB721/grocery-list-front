import React from 'react';
import "./style.scss";

function Hightlight({ currBenefit, svgs }) {
    return (
        <div className={`highlight ${currBenefit.color}`}>
            <div className="display">
                {svgs}
                <div className="description">
                    {currBenefit.text}
                </div>
            </div>
            <div className="benefit-name">
                {currBenefit.cardName}
            </div>
        </div>
    );
}

export default Hightlight;