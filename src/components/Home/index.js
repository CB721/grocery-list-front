import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Highlight from "../Highlight";
import Benefits from "../../assets/data/benefits.json";
import { ReactComponent as ListIcon } from "../../assets/images/List.svg";
import { ReactComponent as StoreIcon } from "../../assets/images/store.svg";
import { ReactComponent as RecipeBook } from "../../assets/images/recipebook.svg";
import { ReactComponent as BlueCar } from "../../assets/images/bluecar.svg";
import { ReactComponent as ChefHat } from "../../assets/images/chefhat.svg";
import { ReactComponent as HandWithPhone } from "../../assets/images/handwithphone.svg";
import { ReactComponent as ManIcon } from "../../assets/images/man.svg";
import { ReactComponent as RedCar } from "../../assets/images/redcar.svg";
import { ReactComponent as Trees } from "../../assets/images/trees.svg";
import { ReactComponent as Woman } from "../../assets/images/woman.svg";
import { ReactComponent as Road } from "../../assets/images/road.svg";
import { ReactComponent as Burger } from "../../assets/images/burger.svg";
import { ReactComponent as IceCream } from "../../assets/images/ice-cream.svg";
import { ReactComponent as Orange } from "../../assets/images/orange.svg";
import { ReactComponent as Potato } from "../../assets/images/potato.svg";
import { ReactComponent as Rice } from "../../assets/images/rice.svg";
import { ReactComponent as Taco } from "../../assets/images/taco.svg";
import { ReactComponent as Tomato } from "../../assets/images/tomato.svg";
import { ReactComponent as Wine } from "../../assets/images/winebottle.svg";
import { ReactComponent as Bread } from "../../assets/images/bread.svg";
import { ReactComponent as Cart } from "../../assets/images/cart.svg";
import { ReactComponent as Grapes } from "../../assets/images/grapes.svg";
import { ReactComponent as Apple } from "../../assets/images/apple.svg";
import { ReactComponent as SendIcon } from "../../assets/images/send.svg";
import { ReactComponent as Cereal } from "../../assets/images/cerealbox.svg";
import { ReactComponent as Phone } from "../../assets/images/phone.svg";
import { ReactComponent as Bag } from "../../assets/images/grocerybag.svg";
import { ReactComponent as BagStart } from "../../assets/images/grocerybag-start.svg";
import { ReactComponent as BagMiddle } from "../../assets/images/grocerybag-middle.svg";
import { ReactComponent as BagEnd } from "../../assets/images/grocerybag-end.svg";
import { ReactComponent as FloorTiles } from "../../assets/images/floortiles.svg";
import { ReactComponent as UpdateOne } from "../../assets/images/update-1.svg";
import { ReactComponent as UpdateTwo } from "../../assets/images/update-2.svg";
import { ReactComponent as UpdateThree } from "../../assets/images/update-3.svg";
import { ReactComponent as UpdateFour } from "../../assets/images/update-4.svg";
import { ReactComponent as UpdateFive } from "../../assets/images/update-5.svg";
import { ReactComponent as UpdateSix } from "../../assets/images/update-6.svg";
import { ReactComponent as UpdateSeven } from "../../assets/images/update-7.svg";
import { ReactComponent as UpdateEight } from "../../assets/images/update-8.svg";
import { ReactComponent as UpdateNine } from "../../assets/images/update-9.svg";
import { ReactComponent as UpdateTen } from "../../assets/images/update-10.svg";
import useInterval from "../../utilities/useInterval";
import "./style.scss";

function Home(props) {
    const [currBenefitIndex, setCurrBenefitIndex] = useState(0);
    const [backButtonClass, setBackButtonClass] = useState("direction-button grey");
    const [nextButtonClass, setNextButtonClass] = useState(`direction-button ${Benefits[1].color}`);
    const [newUserEmail, setNewUserEmail] = useState("");
    useEffect(() => {
        document.title = "G-List | Home";
    }, []);
    let history = useHistory();
    function goToJoin(event) {
        event.preventDefault();
        if (props.user && props.user.length > 0) {
            history.push("/profile");
        } else {
            props.setHomeNewUserEmail(newUserEmail);
            history.push("/join");
        }
    }
    // amount of svgs for each benefit in the order that the benefit appears
    const [svgList, setSvgList] = useState([3, 10]);
    const [currSvg, setCurrSvg] = useState();
    useEffect(() => {
        if (currBenefitIndex === 0) {
            setCurrSvg(
                <div className="benefit-area">
                    <BagStart className="benefit-layer show" />
                    <BagMiddle className="benefit-layer" />
                    <BagEnd className="benefit-layer" />
                    <Bag className="benefit-bg" />
                </div>);
        } else if (currBenefitIndex === 1) {
            setCurrSvg(
                <div className="benefit-area">
                    <FloorTiles className="benefit-bg vertical" />
                </div>
            )
        }

    }, [currBenefitIndex]);

    const [currSvgIndex, setCurrSvgIndex] = useState(0);
    useInterval(() => {
        if (currBenefitIndex === 0) {
            // console.log("current benefit index: " + currBenefitIndex);
            if (currSvgIndex < 7) {
                if (currSvgIndex === 0) {
                    setCurrSvg(
                        <div className="benefit-area">
                            <BagStart className="benefit-layer show" />
                            <BagMiddle className="benefit-layer" />
                            <BagEnd className="benefit-layer" />
                            <Bag className="benefit-bg" />
                        </div>);
                } else if (currSvgIndex === 1) {
                    setCurrSvg(
                        <div className="benefit-area">
                            <BagStart className="benefit-layer" />
                            <BagMiddle className="benefit-layer show" />
                            <BagEnd className="benefit-layer" />
                            <Bag className="benefit-bg" />
                        </div>);
                } else if (currSvgIndex === 2) {
                    setCurrSvg(
                        <div className="benefit-area">
                            <BagStart className="benefit-layer" />
                            <BagMiddle className="benefit-layer" />
                            <BagEnd className="benefit-layer show" />
                            <Bag className="benefit-bg" />
                        </div>);
                }
                setCurrSvgIndex(currSvgIndex + 1);
            } else {
                setCurrSvgIndex(0);
            }
        } else if (currBenefitIndex === 1) {
            setCurrSvg(
                <div className="benefit-area">
                    <FloorTiles className="benefit-bg vertical" />
                </div>
            )
        }
    }, 200);
    function iterateSvgs() {
        let currSvgIndex = 0;
        // counter for iterating between svgs
        setInterval(() => {
            // if the counter hasn't reached the end of the svg list
            if (currBenefitIndex === 0) {
                console.log("hi");
                if (currSvgIndex < 7) {
                    if (currSvgIndex === 0) {
                        setCurrSvg(
                            <div className="benefit-area">
                                <BagStart className="benefit-layer show" />
                                <BagMiddle className="benefit-layer" />
                                <BagEnd className="benefit-layer" />
                                <Bag className="benefit-bg" />
                            </div>);
                    } else if (currSvgIndex === 1) {
                        setCurrSvg(
                            <div className="benefit-area">
                                <BagStart className="benefit-layer" />
                                <BagMiddle className="benefit-layer show" />
                                <BagEnd className="benefit-layer" />
                                <Bag className="benefit-bg" />
                            </div>);
                    } else if (currSvgIndex === 2) {
                        setCurrSvg(
                            <div className="benefit-area">
                                <BagStart className="benefit-layer" />
                                <BagMiddle className="benefit-layer" />
                                <BagEnd className="benefit-layer show" />
                                <Bag className="benefit-bg" />
                            </div>);
                    }
                    currSvgIndex++;
                } else {
                    currSvgIndex = 0;
                }
            } else if (currBenefitIndex === 1) {
                setCurrSvg(
                    <div className="benefit-area">
                        <FloorTiles className="benefit-bg vertical" />
                    </div>
                )
            }
        }, 200);
    }
    useEffect(() => {
        // set the button colors
        if (currBenefitIndex === 0) {
            setBackButtonClass("direction-button grey");
            setNextButtonClass(`direction-button ${Benefits[1].color}`);
        } else if (currBenefitIndex > 0 && currBenefitIndex < 4) {
            setBackButtonClass(`direction-button ${Benefits[currBenefitIndex - 1].color}`);
            setNextButtonClass(`direction-button ${Benefits[currBenefitIndex + 1].color}`);
        } else {
            setBackButtonClass(`direction-button ${Benefits[currBenefitIndex - 1].color}`);
            setNextButtonClass("direction-button grey");
        }
    }, [currBenefitIndex]);
    function nextBenefit(event, direction) {
        event.preventDefault();
        // if the user can can go backwards
        if (direction === "back" && currBenefitIndex - 1 > -1) {
            setCurrBenefitIndex(currBenefitIndex - 1);
        } else if (direction === "next" && currBenefitIndex + 1 < 8) {
            setCurrBenefitIndex(currBenefitIndex + 1);
        }
    }
    return (
        <div className="home">
            <section className="home-section">
                <div className="content">
                    <header>Why G-List?</header>
                    <div id="highlight-section">
                        <Highlight
                            currBenefit={Benefits[currBenefitIndex]}
                            svg={currSvg}
                        />
                    </div>
                    <div className="direction-section">
                        <button
                            className={backButtonClass}
                            onClick={event => nextBenefit(event, "back")}
                        >
                            Back
                        </button>
                        <button
                            className={nextButtonClass}
                            onClick={event => nextBenefit(event, "next")}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
            <section className="home-section">
                <div className="content">
                    <div className="header-section">
                        <header>Join today</header>
                        <header>Create a free account!</header>
                    </div>
                    <form id="new-user-section">
                        <input
                            type="username"
                            hidden
                        />
                        <input
                            type="email"
                            placeholder="Your email address"
                            id="form-input"
                            value={newUserEmail}
                            onChange={(event) => setNewUserEmail(event.target.value)}
                        />
                        <button
                            id="submit-new-user"
                            onClick={(event) => goToJoin(event)}
                        >
                            Join!
                        </button>
                    </form>
                    <div id="existing-user">
                        <p>Already have an account?</p>
                        <button
                            id="login-exisiting-user"
                            onClick={() => history.push("/login")}
                        >
                            Login
                        </button>
                    </div>
                    <div id="privacy-section">
                        <p>We are all about privacy!</p>
                        <button
                            id="view-privacy"
                            onClick={() => history.push("/privacy")}
                        >
                            View
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;