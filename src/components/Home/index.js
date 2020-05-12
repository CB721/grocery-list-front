import React, { useEffect } from 'react';
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
import createList from "../../assets/images/walkthrough_gifs/create-list-mobile.gif";
import filterStore from "../../assets/images/walkthrough_gifs/filter-by-store-mobile.gif";
import prevList from "../../assets/images/walkthrough_gifs/previous-list-mobile.gif";
import updateItem from "../../assets/images/walkthrough_gifs/update-item-mobile.gif";
import recipes from "../../assets/images/walkthrough_gifs/recipes-mobile.gif";
import request from "../../assets/images/walkthrough_gifs/send-receive-request-mobile.gif";
import sendList from "../../assets/images/walkthrough_gifs/send-receive-list-mobile.gif";

function Home(props) {
    const walkthroughs = [createList, addStore, filterStore, prevList, updateItem, recipes, request, sendList];

    useEffect(() => {
        document.title = "G-List | Home";
    }, []);
    let history = useHistory();
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
            
        </div>
    )
}

export default Home;