import React from "react";
import { Row, Col } from "shards-react";
import "./style.scss";

function Modal(props) {
    return (
        <div>
            {props.open ? (
                <div className="cust-modal">
                    <Row>
                        <Col>
                            <div className="modal-content">
                                <Row>
                                    <Col>
                                        <div className="modal-col-3">
                                            <div 
                                            className="modal-close-x"
                                            onClick={() => props.close(false)}
                                            >
                                                <div className="x-bar-1" />
                                                <div className="x-bar-2" />
                                            </div>
                                        </div>

                                    </Col>
                                    <Col>
                                        <div className="modal-col-3">
                                            {props.name}
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="modal-col-3" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="modal-col-12">
                                            {props.message}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div>
                                            {props.content}
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