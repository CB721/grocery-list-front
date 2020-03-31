import React, { Component } from 'react';
import './style.scss';

class ExtendedCard extends Component {
    render() {
        return (
            <div
                ref={this.props.referral}
                className={`extended-card ${this.props.headerText}`}
                id={this.props.headerText}
            >
                <div
                    className="ext-card-header"
                    style={{
                        border: `3px solid ${this.props.headerColor}`,
                        color: this.props.headerTextColor
                    }}
                    onClick={this.props.action}
                >
                    {this.props.headerText}
                </div>
                <div className="ext-card-image">
                    <img src={"https://images.unsplash.com/photo-1517092756309-24071485f6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=940&q=80"} alt={this.props.headerText} />
                </div>
            </div>
        )
    }
}

export default ExtendedCard;