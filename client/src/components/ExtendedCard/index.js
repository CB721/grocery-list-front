import React, { Component } from 'react';
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
                        color: this.props.headerTextColor
                    }}
                    onClick={this.props.action}
                >
                    {this.props.headerText}
                </div>
                <div className="ext-card-image">
                    <video
                        loop autoPlay playsInline muted
                        aria-label={`${this.props.headerText} demo`}
                        style={{
                            objectFit: 'cover',
                            width: '100vw',
                            height: '65vh',
                        }}>
                        <source src={this.props.video} type="video/mp4" />
                    </video>
                </div>
            </div>
        )
    }
}

export default ExtendedCard;