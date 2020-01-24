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

            {/* <Row >
                <Col>
                    <Slide bottom>
                        <div className="app-desc">
                            Whatever meggings mixtape put a bird on it biodiesel street art chia, church-key vegan vexillologist synth tumeric meditation typewriter actually. Try-hard franzen twee vaporware, thundercats PBR&B bicycle rights sartorial kitsch poutine offal hoodie post-ironic photo booth tote bag. Roof party brooklyn snackwave semiotics, waistcoat man bun tumblr photo booth normcore health goth cray live-edge poutine YOLO. Coloring book fashion axe offal chartreuse.
                        </div>
                    </Slide>
                </Col>
            </Row>
            <Space />
            <Row>
                <Col>
                    <Slide bottom>
                        <div className="app-desc">
                            Whatever meggings mixtape put a bird on it biodiesel street art chia, church-key vegan vexillologist synth tumeric meditation typewriter actually. Try-hard franzen twee vaporware, thundercats PBR&B bicycle rights sartorial kitsch poutine offal hoodie post-ironic photo booth tote bag. Roof party brooklyn snackwave semiotics, waistcoat man bun tumblr photo booth normcore health goth cray live-edge poutine YOLO. Coloring book fashion axe offal chartreuse.
                        </div>
                    </Slide>
                </Col>
                <Col sm="6">
                    <Slide bottom>
                        <div className="app-desc half">
                            Whatever meggings mixtape put a bird on it biodiesel street art chia, church-key vegan vexillologist synth tumeric meditation typewriter actually. Try-hard franzen twee vaporware, thundercats PBR&B bicycle rights sartorial kitsch poutine offal hoodie post-ironic photo booth tote bag. Roof party brooklyn snackwave semiotics, waistcoat man bun tumblr photo booth normcore health goth cray live-edge poutine YOLO. Coloring book fashion axe offal chartreuse.
                        </div>
                    </Slide>
                </Col>
            </Row> */}
        </div>
    )
}

export default Home;