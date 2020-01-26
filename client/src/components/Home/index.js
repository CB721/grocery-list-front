import React from 'react';
import { Row, Col } from "shards-react";
import { Textfit } from "react-textfit";
import Slide from 'react-reveal/Slide';
import CardCarousel from "../CardCarousel";
import aisleImg from "../../assets/images/grocery-aisle.jpeg";
import Space from "../DivSpace";
import "./style.scss";

function Home(props) {
    return (
        <div className="home">
            <Row>
                <Col>
                    <img src={aisleImg} alt="home list" className="home-splash-image" />
                    <div className="center-image-text">
                        <Textfit
                            mode="single"
                            min={8}
                            max={32}>
                            Create customized grocery lists based on the stores where you shop!
                        </Textfit>
                    </div>
                </Col>
            </Row>
            <Space />
            <Row>
                <CardCarousel />
            </Row>
            <Space />
        </div>
    )
}

export default Home;