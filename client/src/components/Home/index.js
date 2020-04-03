import React, { useEffect, useState, createRef, useRef } from 'react';
import { useHistory } from "react-router-dom";
// import { ReactComponent as IceCream } from "../../assets/images/ice-cream.svg";
// import { ReactComponent as Potato } from "../../assets/images/potato.svg";
// import { ReactComponent as Rice } from "../../assets/images/rice.svg";
// import { ReactComponent as Taco } from "../../assets/images/taco.svg";
// import { ReactComponent as Tomato } from "../../assets/images/tomato.svg";
// import { ReactComponent as Cart } from "../../assets/images/cart.svg";
// import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import { Zoom, Fade, Slide } from 'react-reveal';
import Benefits from "../../assets/data/benefits.json";
import Card from "../Card";
import ExtendedCard from "../ExtendedCard";
import "./style.scss";
import addStoreDesktop from "../../assets/video/add-store-desktop.mp4";
import addStoreMobile from "../../assets/video/add-store-mobile.mp4";
import createListDesktop from "../../assets/video/create-list-desktop.mp4";
import createListMobile from "../../assets/video/create-list-mobile.mp4";
import filterStoreDesktop from "../../assets/video/filter-by-store-desktop.mp4";
import filterStoreMobile from "../../assets/video/filter-by-store-mobile.mp4";
import prevListDesktop from "../../assets/video/previous-list-desktop.mp4";
import prevListMobile from "../../assets/video/previous-list-mobile.mp4";
import recipeDesktop from "../../assets/video/recipes-desktop.mp4";
import recipeMobile from "../../assets/video/recipes-mobile.mp4";
import sendListDesktop from "../../assets/video/send-receive-list-desktop.mp4";
import sendListMobile from "../../assets/video/send-receive-list-mobile.mp4";
import requestDesktop from "../../assets/video/send-receive-request-desktop.mp4";
import requestMobile from "../../assets/video/send-receive-request-mobile.mp4";
import updateItemDesktop from "../../assets/video/update-item-desktop.mp4";
import updateItemMobile from "../../assets/video/update-item-mobile.mp4";

function Home(props) {
    const [isMobile, setIsMobile] = useState(false);
    const desktop = [createListDesktop, addStoreDesktop, filterStoreDesktop, prevListDesktop, updateItemDesktop, recipeDesktop, requestDesktop, sendListDesktop];
    const mobile = [createListMobile, addStoreMobile, filterStoreMobile, prevListMobile, updateItemMobile, recipeMobile, requestMobile, sendListMobile];
    useEffect(() => {
        document.title = document.title + " | Home";
    }, []);
    useEffect(() => {
        if (window.screen.width < 500) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [window.screen]);
    let history = useHistory();
    // // iterate once for the highlight cards
    // const highlightRefs = Benefits.reduce((acc, val) => {
    //     acc[val.cardName] = createRef();
    //     return acc;
    // }, {});
    // // iterate again for the sections themselves
    // const sectionRefs = Benefits.reduce((acc, val) => {
    //     acc[val.cardName + "Ext"] = createRef();
    //     return acc;
    // }, {});
    // console.log(sectionRefs);
    function handleClick(name) {
        window.location.href = `#${name}`;
        // console.log(sectionRefs[name + "Ext"]);
        // sectionRefs[name + "Ext"].current.scrollIntoView({
        //     behavior: 'smooth',
        //     block: 'start'
        // });
    }
    function goToJoin(event) {
        event.preventDefault();
        history.push("/join");
    }
    return (
        <div className="home">
            <div className="divider" />
            <div className="home-sections black-bg">
                <div className="banner">
                    <Zoom right cascade>
                        Create and share custom grocery lists!
                    </Zoom>
                </div>
            </div>
            <div className="divider">Why G-List?</div>
            <div className="home-sections">
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
                            // referral={highlightRefs[item.cardName]}
                            />
                        </Slide>
                    ))}
                </div>
            </div>
            <div
                className="divider"
                style={{ margin: "5vh 0", cursor: "pointer" }}
                onClick={(event) => goToJoin(event)}
            >
                Join Today!
            </div>
            <div className="home-sections blue-bg">
                <div className="about" id="about">
                    About G-List
                </div>
                <div className="about-details">
                    <p>
                        Sed pulvinar nibh quis tristique dictum. Sed sed nisl pellentesque, elementum justo quis, egestas elit. Phasellus felis augue, molestie ac fermentum in, molestie vitae tellus.
                    </p>
                    <p>
                        In facilisis urna eu gravida faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae interdum eros. Vestibulum feugiat vitae nisi et ullamcorper.
                    </p>
                    <p>
                        Nunc suscipit arcu nec odio pretium condimentum. Integer lobortis enim finibus, pulvinar ipsum eget, posuere dui. Nullam consequat lorem vestibulum diam sollicitudin, in vulputate libero volutpat.
                    </p>
                </div>
            </div>
            <div
                className="divider"
                style={{ margin: "5vh 0", cursor: "pointer" }}
                onClick={(event) => goToJoin(event)}
            >
                Join Today!
            </div>
            {isMobile ? (
                <div>
                    {Benefits.map((item, index) => (
                        <div className="home-sections" key={index} style={{ background: item.background, borderRadius: "8px" }} id={item.cardName}>
                            <ExtendedCard
                                headerColor={item.color}
                                headerTextColor={item.color}
                                headerText={item.cardName}
                                video={mobile[index]}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                    <div>
                        {Benefits.map((item, index) => (
                            <div className="home-sections" key={index} style={{ background: item.background, borderRadius: "8px" }} id={item.cardName}>
                                <ExtendedCard
                                    headerColor={item.color}
                                    headerTextColor={item.color}
                                    headerText={item.cardName}
                                    video={desktop[index]}
                                />
                            </div>
                        ))}
                    </div>
                )}
            <div
                className="divider"
                style={{ margin: "5vh 0", cursor: "pointer" }}
                onClick={(event) => goToJoin(event)}
            >
                Join Today!
            </div>
        </div>
    )
}

export default Home;