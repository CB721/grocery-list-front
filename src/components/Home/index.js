import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Highlight from "../Highlight";
import Benefits from "../../assets/data/benefits.json";
import Button from "../Button";
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
    useEffect(() => {
        if (currBenefitIndex === 0) {
            setBackButtonClass("direction-button grey");
            setNextButtonClass(`direction-button ${Benefits[1].color}`);
        } else if (currBenefitIndex > 0 && currBenefitIndex < 7) {
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
            // if (currBenefitIndex - 2 >= 0) {
            //     setBackButtonClass("direction-button grey");
            // } else {
            //     setBackButtonClass("direction-button");
            // }
            // there 8 benefit objects to iterate through so only allow the user to go forward to a valid index
        } else if (direction === "next" && currBenefitIndex + 1 < 8) {
            setCurrBenefitIndex(currBenefitIndex + 1);
            // if (currBenefitIndex + 2 >= 7) {
            //     setNextButtonClass("direction-button grey");
            // } else {
            //     setNextButtonClass("direction-button black");
            // }
        }
    }
    return (
        <div className="home">
            <section className="home-section">
                <div className="content">
                    <header>Why G-List?</header>
                    <div id="highlight-section">
                        {/* <Road /> */}
                        <Highlight
                            currBenefit={Benefits[currBenefitIndex]}
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