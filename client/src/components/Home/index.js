import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Row, Col } from "shards-react";
import { Textfit } from "react-textfit";
import CardCarousel from "../CardCarousel";
// import aisleImg from "../../assets/images/grocery-aisle.jpeg";
import Space from "../DivSpace";
import "./style.scss";

function Home(props) {
    useEffect(() => {
        document.title = document.title + " | Home";
    }, []);
    
    return (
        <div className="home">
            <Row>
                <Col>
                    <div className="home-splash-image">
                        <div className="center-image-text">
                            <Textfit
                                mode="single"
                                min={8}
                                max={32}>
                                Create customized grocery lists based on the stores where you shop!
                        </Textfit>
                        </div>
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