import React, { useEffect, useState, createRef, useRef } from 'react';
import { useHistory } from "react-router-dom";
// import { ReactComponent as IceCream } from "../../assets/images/ice-cream.svg";
// import { ReactComponent as Potato } from "../../assets/images/potato.svg";
// import { ReactComponent as Rice } from "../../assets/images/rice.svg";
// import { ReactComponent as Taco } from "../../assets/images/taco.svg";
// import { ReactComponent as Tomato } from "../../assets/images/tomato.svg";
// import { ReactComponent as Cart } from "../../assets/images/cart.svg";
// import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import { Zoom, Slide } from 'react-reveal';
import Benefits from "../../assets/data/benefits.json";
import Card from "../Card";
import ExtendedCard from "../ExtendedCard";
import "./style.scss";
import addStore from "../../assets/images/walkthrough_gifs/add-store-mobile.gif";
import createList from "../../assets/images/walkthrough_gifs/add-store-mobile.gif";
import filterStore from "../../assets/images/walkthrough_gifs/add-store-mobile.gif";
import prevList from "../../assets/images/walkthrough_gifs/add-store-mobile.gif";
import updateItem from "../../assets/images/walkthrough_gifs/add-store-mobile.gif";
import recipes from "../../assets/images/walkthrough_gifs/add-store-mobile.gif";
import request from "../../assets/images/walkthrough_gifs/add-store-mobile.gif";
import sendList from "../../assets/images/walkthrough_gifs/add-store-mobile.gif";

function Home(props) {
    const walkthroughs = [createList, addStore, filterStore, prevList, updateItem, recipes, request, sendList];

    useEffect(() => {
        document.title = "G-List | Home";
    }, []);
    let history = useHistory();
    function handleClick(name) {
        window.location.href = `#${name.split(" ")[0]}`;
    }
    function goToJoin(event) {
        event.preventDefault();
        if (props.user && props.user.length > 0) {
            history.push("/profile");
        } else {
            history.push("/join");
        }
    }
    function goToPrivacy(event) {
        event.preventDefault();
        history.push("/privacy");
    }
    return (
        <div className="home">
            <div className="divider" />
            <div className="home-sections" style={{ height: "80vh" }}>
                <div className="banner">
                    <Zoom right cascade>
                        Create and share custom grocery lists!
                    </Zoom>
                </div>
            </div>
            <div className="divider">Why G-List?</div>
            <div className="home-sections">
                <div style={{ marginLeft: "15%", marginRight: "15%" }}>
                    {Benefits.map((item, index) => (
                        <Slide left key={index}>
                            <Card
                                cardName={item.cardName}
                                text={item.text}
                                background={item.background}
                                color={item.color}
                                index={index}
                                action={handleClick}
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
                        So you've gone ahead and have planned out what you want from the store before you leave.  But week after week you have to re-create the same list. What about the pasta sauce you can only get at one store?  Or the fresh produce you get at your local farmer's market?
                    </p>
                    <p>
                        How can you keep track of where you get everything you need and how urgently you need it? Often, you get the same items at the same stores.  Why would you continue to write a new list each time?
                    </p>
                    <p>
                        Introducing G-List, the grocery list app to help you shop more effeciently allowing you to spend more time to focus on the important stuff.
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
            {Benefits.map((item, index) => (
                <div className="home-sections" key={index} style={{ borderRadius: "8px", marginBottom: "5vh" }} id={item.cardName.split(" ")[0]}>
                    <ExtendedCard
                        headerColor={item.color}
                        headerTextColor={item.color}
                        headerText={item.cardName}
                        image={walkthroughs[index]}
                        background={item.background}
                    />
                </div>
            ))}
            <div
                className="divider"
                style={{ margin: "5vh 0", cursor: "pointer" }}
                onClick={(event) => goToPrivacy(event)}
            >
                View Our Privacy Statement
            </div>
        </div>
    )
}

export default Home;