import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Highlight from "../Highlight";
import Benefits from "../../assets/data/benefits.json";
import { ReactComponent as Bag } from "../../assets/images/grocerybag.svg";
import { ReactComponent as BagStart } from "../../assets/images/grocerybag-start.svg";
import { ReactComponent as BagMiddle } from "../../assets/images/grocerybag-middle.svg";
import { ReactComponent as BagEnd } from "../../assets/images/grocerybag-end.svg";
import { ReactComponent as UpdateOne } from "../../assets/images/update-1.svg";
import { ReactComponent as UpdateTwo } from "../../assets/images/update-2.svg";
import { ReactComponent as UpdateThree } from "../../assets/images/update-3.svg";
import { ReactComponent as UpdateFour } from "../../assets/images/update-4.svg";
import { ReactComponent as UpdateFive } from "../../assets/images/update-5.svg";
import { ReactComponent as UpdateSix } from "../../assets/images/update-6.svg";
import { ReactComponent as UpdateSeven } from "../../assets/images/update-7.svg";
import { ReactComponent as UpdateEight } from "../../assets/images/update-8.svg";
import { ReactComponent as UpdateNine } from "../../assets/images/update-9.svg";
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
    const [currSvg, setCurrSvg] = useState();
    const [currSvgIndex, setCurrSvgIndex] = useState(0);
    useEffect(() => {
        switch (currBenefitIndex) {
            case 0:
                setCurrSvg(
                    <div className="benefit-area">
                        <BagStart className="benefit-layer show" />
                        <BagMiddle className="benefit-layer" />
                    </div>);
                setCurrSvgIndex(0);
                break;
            case 1:
                setCurrSvg(
                    <div className="benefit-area">
                        <UpdateOne className="benefit-layer show" />
                        <UpdateTwo className="benefit-layer " />
                    </div>
                )
                setCurrSvgIndex(0);
                break;
            case 2:
                setCurrSvg(
                    <div className="benefit-area">

                    </div>
                )
                setCurrSvgIndex(0);
                break;
            default:
                return;
        }
    }, [currBenefitIndex]);

    useInterval(() => {
        if (currBenefitIndex === 0) {
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
            switch (currSvgIndex) {
                case 0:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateOne className="benefit-layer show" />
                            <UpdateTwo className="benefit-layer" />
                            <UpdateNine className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 1:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateOne className="benefit-layer show" />
                            <UpdateTwo className="benefit-layer" />
                            <UpdateNine className="benefit-layer" />

                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 2:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateOne className="benefit-layer" />
                            <UpdateTwo className="benefit-layer show" />
                            <UpdateThree className="benefit-layer" />

                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 3:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateOne className="benefit-layer" />
                            <UpdateTwo className="benefit-layer show" />
                            <UpdateThree className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 4:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateTwo className="benefit-layer" />
                            <UpdateThree className="benefit-layer show" />
                            <UpdateFour className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 5:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateThree className="benefit-layer" />
                            <UpdateFour className="benefit-layer show" />
                            <UpdateFive className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 6:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateThree className="benefit-layer" />
                            <UpdateFour className="benefit-layer show" />
                            <UpdateFive className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 7:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateFour className="benefit-layer" />
                            <UpdateFive className="benefit-layer show" />
                            <UpdateSix className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 8:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateFour className="benefit-layer" />
                            <UpdateFive className="benefit-layer show" />
                            <UpdateSix className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 9:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateFive className="benefit-layer" />
                            <UpdateSix className="benefit-layer show" />
                            <UpdateSeven className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 10:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateFive className="benefit-layer" />
                            <UpdateSix className="benefit-layer show" />
                            <UpdateSeven className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 11:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateSix className="benefit-layer" />
                            <UpdateSeven className="benefit-layer show" />
                            <UpdateEight className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 12:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateSix className="benefit-layer" />
                            <UpdateSeven className="benefit-layer show" />
                            <UpdateEight className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 13:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateSeven className="benefit-layer" />
                            <UpdateEight className="benefit-layer show" />
                            <UpdateNine className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 14:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateSeven className="benefit-layer" />
                            <UpdateEight className="benefit-layer show" />
                            <UpdateNine className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 15:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateOne className="benefit-layer" />
                            <UpdateEight className="benefit-layer" />
                            <UpdateNine className="benefit-layer show" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 16:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateOne className="benefit-layer" />
                            <UpdateEight className="benefit-layer" />
                            <UpdateNine className="benefit-layer show" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 17:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateOne className="benefit-layer" />
                            <UpdateEight className="benefit-layer" />
                            <UpdateNine className="benefit-layer show" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 18:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateOne className="benefit-layer" />
                            <UpdateEight className="benefit-layer" />
                            <UpdateNine className="benefit-layer show" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 19:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateOne className="benefit-layer" />
                            <UpdateEight className="benefit-layer" />
                            <UpdateNine className="benefit-layer show" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 20:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateOne className="benefit-layer" />
                            <UpdateEight className="benefit-layer" />
                            <UpdateNine className="benefit-layer show" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                default:
                    setCurrSvgIndex(0);
                    return;
            }
        } else if (currBenefitIndex === 2) {
            setCurrSvg(
                <div className="benefit-area">

                </div>
            )
        }
    }, 240);
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