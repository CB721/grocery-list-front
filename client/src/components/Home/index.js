import React, { useEffect, useState, createRef, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { ReactComponent as IceCream } from "../../assets/images/ice-cream.svg";
import { ReactComponent as Potato } from "../../assets/images/potato.svg";
import { ReactComponent as Rice } from "../../assets/images/rice.svg";
import { ReactComponent as Taco } from "../../assets/images/taco.svg";
import { ReactComponent as Tomato } from "../../assets/images/tomato.svg";
import { ReactComponent as Cart } from "../../assets/images/cart.svg";
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import { Zoom, Fade, Slide } from 'react-reveal';
import Benefits from "../../assets/data/benefits.json";
import Card from "../Card";
import ExtendedCard from "../ExtendedCard";
import "./style.scss";

function Home(props) {
    useEffect(() => {
        document.title = document.title + " | Home";
    }, []);
    let history = useHistory();
    // iterate once for the highlight cards
    const highlightRefs = Benefits.reduce((acc, val) => {
        acc[val.cardName] = createRef();
        return acc;
    }, {});
    // iterate again for the sections themselves
    const sectionRefs = Benefits.reduce((acc, val) => {
        acc[val.cardName + "Ext"] = createRef();
        return acc;
    }, {});
    console.log(sectionRefs);
    function handleClick(name) {
        console.log(sectionRefs[name + "Ext"]);
        // sectionRefs[name + "Ext"].current.scrollIntoView({
        //     behavior: 'smooth',
        //     block: 'start'
        // });
    }
    let parallax;
    return (
        <div className="home">
            <div style={{ height: "10vh" }} />
            <Parallax pages={10} scrolling={true} ref={ref => parallax = ref}>
                <ParallaxLayer offset={0} speed={1} style={{ background: "#2F3338" }} />
                <ParallaxLayer offset={0.99} speed={1} style={{ background: "#F9FCFF" }} />
                <ParallaxLayer offset={1.99} speed={1} style={{ background: "rgb(107, 41, 214)" }}>
                    <ExtendedCard
                        referral={sectionRefs[Benefits[0].cardName + "Ext"]}
                        headerColor={Benefits[0].color}
                        headerTextColor={Benefits[0].color}
                        headerText={Benefits[0].cardName}
                        action={handleClick}
                    />
                </ParallaxLayer>
                <ParallaxLayer offset={2} speed={0.9} style={{ background: "rgb(159, 131, 20)" }}>
                    <ExtendedCard
                        referral={sectionRefs[Benefits[1].cardName + "Ext"]}
                        headerColor={Benefits[1].color}
                        headerTextColor={Benefits[1].color}
                        headerText={Benefits[1].cardName}
                    />
                </ParallaxLayer>
                <ParallaxLayer offset={2.99} speed={1} style={{ background: "#3C91E6" }}>
                    <ExtendedCard
                        referral={sectionRefs[Benefits[2].cardName + "Ext"]}
                        headerColor={Benefits[2].color}
                        headerTextColor={Benefits[2].color}
                        headerText={Benefits[2].cardName}
                    />
                </ParallaxLayer>
                <ParallaxLayer offset={3} speed={0.9} style={{ background: "rgb(159, 20, 20)" }}>
                    <ExtendedCard
                        referral={sectionRefs[Benefits[3].cardName + "Ext"]}
                        headerColor={Benefits[3].color}
                        headerTextColor={Benefits[3].color}
                        headerText={Benefits[3].cardName}
                    />
                </ParallaxLayer>
                {/* <ParallaxLayer offset={1} speed={0.9} style={{ background: "rgb(159, 131, 20)" }} /> */}
                {/* <ParallaxLayer offset={1.99} speed={1} style={{ background: "#F9FCFF" }} /> */}
                {/* <ParallaxLayer offset={2} speed={1} style={{ background: "#3C91E6" }} /> */}
                {/* <ParallaxLayer offset={2.99} speed={1} style={{ background: "#F9FCFF" }} /> */}
                <ParallaxLayer offset={0.4} speed={0.5} factor={0.1}>
                    <div
                        className="center-image-text"
                        id="landing"
                        onClick={() => {
                            history.push("/join");
                        }}
                    >
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
                <ParallaxLayer offset={0.999} speed={0.8}>
                    <div style={{ marginLeft: "25%", marginRight: "25%" }}>
                        {Benefits.map((item, index) => (
                            <Slide left key={index}>
                                <Card
                                    cardName={item.cardName}
                                    text={item.text}
                                    background={item.background}
                                    color={item.color}
                                    index={index}
                                    action={handleClick}
                                    referral={highlightRefs[item.cardName]}
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
                <ParallaxLayer offset={1.1} speed={0.3} style={{ pointerEvents: 'none' }}>
                    <Potato style={{ height: "10%", width: "10%", marginLeft: "79%" }} />
                </ParallaxLayer>
                <ParallaxLayer offset={1.5} speed={1.5} style={{ pointerEvents: 'none' }}>
                    <IceCream style={{ height: "10%", width: "10%", marginLeft: "7%" }} />
                </ParallaxLayer>
                <ParallaxLayer offset={1.8} speed={1.3} style={{ pointerEvents: 'none' }}>
                    <Tomato style={{ height: "10%", width: "10%", marginLeft: "82%" }} />
                </ParallaxLayer>
                <ParallaxLayer offset={0.9999} speed={0.5} style={{ pointerEvents: 'none' }}>
                    <Cart style={{ height: "10%", width: "10%", marginLeft: "76%", fill: "#3C91E6" }} />
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}

export default Home;