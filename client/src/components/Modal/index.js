import React from "react";
import { Row, Col } from "shards-react";
import "./style.scss";

function Modal(props) {
    return (
        <div>
            {props.open ? (
                <div className="cust-modal" aria-label="open modal">
                    <Row>
                        <Col>
                            <div className="modal-content">
                                <Row>
                                    <Col>
                                        <div className="modal-col-3">
                                            <div
                                                className="modal-close-x"
                                                onClick={() => props.close(false)}
                                                aria-label="close modal"
                                            >
                                                <div className="x-bar-1" />
                                                <div className="x-bar-2" />
                                            </div>
                                        </div>

                                    </Col>
                                    <Col>
                                        <div className="modal-col-3" aria-label={props.name}>
                                            {props.name}
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="modal-col-3" />
                                    </Col>
                                </Row>
                                {props.message ? (
                                    <Row>
                                        <Col>
                                            <div className="modal-col-12 modal-message" aria-label={props.message}>
                                                {props.message}
                                            </div>
                                        </Col>
                                    </Row>
                                ) : (<div />)}
                                <Row>
                                    <Col>
                                        <div>
                                            {props.content}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div>
                                            {props.button}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            ) : (<div />)}
        </div>
    )
}

export default Modal;