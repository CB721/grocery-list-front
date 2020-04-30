import React, { Component } from 'react';
import { Slide } from "react-reveal"
import './style.scss';

class ExtendedCard extends Component {
    render() {
        return (
            <div
                className={`extended-card ${this.props.headerText}`}
            >
                <div
                    className="ext-card-header"
                    style={{
                        border: `3px solid ${this.props.headerColor}`,
                        color: this.props.headerTextColor,
                        background: this.props.background
                    }}
                    onClick={this.props.action}
                >
                    {this.props.headerText}
                </div>
                <div className="ext-card-image">
                    <Slide left>
                        <img
                            src={this.props.image}
                            alt={this.props.headerText}
                            loading="lazy"
                        />
                    </Slide>
                </div>
            </div>
        )
    }
}

export default ExtendedCard;