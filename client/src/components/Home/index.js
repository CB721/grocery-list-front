import React, { useEffect, useState } from 'react';
// import { Row, Col } from "shards-react";
import { Textfit } from "react-textfit";
// import CardCarousel from "../CardCarousel";
import { ReactComponent as IceCream } from "../../assets/images/ice-cream.svg";
import { ReactComponent as Potato } from "../../assets/images/potato.svg";
import { ReactComponent as Rice } from "../../assets/images/rice.svg";
import { ReactComponent as Taco } from "../../assets/images/taco.svg";
import { ReactComponent as Tomato } from "../../assets/images/tomato.svg";
import { ReactComponent as Cart } from "../../assets/images/cart.svg";
// import Space from "../DivSpace";
// import { Parallax } from 'react-parallax';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import { Zoom, Fade, Slide } from 'react-reveal';
import Benefits from "../../assets/data/benefits.json";
import Card from "../Card";
import "./style.scss";

function Home(props) {
    useEffect(() => {
        document.title = document.title + " | Home";
    }, []);

    let parallax;
    return (
        <div className="home">
            <div style={{ height: "10vh" }} />
            <Parallax pages={4} scrolling={true} ref={ref => parallax = ref}>
                <ParallaxLayer offset={0} speed={1} style={{ background: "#2F3338" }} />
                <ParallaxLayer offset={0.99} speed={1} style={{ background: "#F9FCFF" }} />
                <ParallaxLayer offset={1} speed={1} style={{ background: "rgb(159, 131, 20)" }} />
                <ParallaxLayer offset={1.99} speed={1} style={{ background: "#F9FCFF" }} />
                <ParallaxLayer offset={2} speed={1} style={{ background: "#3C91E6" }} />
                <ParallaxLayer offset={2.99} speed={1} style={{ background: "#F9FCFF" }} />
                <ParallaxLayer offset={0.4} speed={0.5} factor={0.1}>
                    <div className="center-image-text" id="landing">
                        <Zoom right cascade>
                            Create and share custom grocery lists!
                        </Zoom>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={0.99} speed={1.2} factor={0.1}>
                    <div className="center-image-text" id="app-desc">
                        <Fade right cascade>
                            Why G-List?
                        </Fade>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={0.99} speed={0.8}>
                    <div style={{ marginLeft: "25%", marginRight: "25%" }}>
                        {Benefits.map((item, index) => (
                            <Slide left key={index}>
                                <Card
                                    cardName={item.cardName}
                                    text={item.text}
                                    background={item.background}
                                    color={item.color}
                                />
                            </Slide>
                        ))}
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={1.2} speed={-0.2} style={{ pointerEvents: 'none' }}>
                    <Rice style={{ height: "10%", width: "10%", marginLeft: "12%" }} />
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={1.8} style={{ pointerEvents: 'none' }}>
                    <Taco style={{ height: "10%", width: "10%", marginLeft: "87%" }} />
                </ParallaxLayer>
                <ParallaxLayer offset={0.999} speed={0.5} style={{ opacity: 0.3, zIndex: 3 }}>
                    <Potato style={{ height: "10%", width: "10%", marginLeft: "58%" }} />
                </ParallaxLayer>
                {/* <ParallaxLayer offset={0.99999999999999999} speed={1.4} style={{ pointerEvents: 'none' }}>
                    <IceCream style={{ height: "10%", width: "10%", marginLeft: "65%" }} />
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={-0.5} style={{ pointerEvents: 'none' }}>
                    <Tomato style={{ height: "10%", width: "10%", marginLeft: "12%" }} />
                </ParallaxLayer>
                <ParallaxLayer offset={0.99999999999999999} speed={0.1} style={{ pointerEvents: 'none' }}>
                    <Cart style={{ height: "10%", width: "10%", marginLeft: "76%", fill: "white" }} />
                </ParallaxLayer> */}
            </Parallax>
        </div >
    )
}

export default Home;