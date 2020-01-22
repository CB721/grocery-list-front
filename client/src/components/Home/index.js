import React from 'react';
import { Row, Col } from "shards-react";
import aisleImg from "../../assets/images/grocery-aisle.jpeg";
import "./style.scss";

function Home(props) {
    return (
        <div className="home">
            <Row noGutters={true}>
                <Col>
                    <img src={aisleImg} alt="home list" className="home-splash-image" />
                </Col>
            </Row>
        </div>
    )
}

export default Home;