import React from 'react';
import "./style.scss";

function Hightlight({ currBenefit, svg }) {
    // console.log(svg, svgs);
    return (
        <div className={`highlight ${currBenefit.color}`}>
            <div className="display">
                    {svg}
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