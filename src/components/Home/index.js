import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Highlight from "../Highlight";
import Benefits from "../../assets/data/benefits.json";
import Button from "../Button";
import "./style.scss";

function Home(props) {
    const [currBenefitIndex, setCurrBenefitIndex] = useState(0);
    const [backButtonClass, setBackButtonClass] = useState("direction-button grey");
    const [nextButtonClass, setNextButtonClass] = useState("direction-button orange");
    useEffect(() => {
        document.title = "G-List | Home";
    }, []);
    // let history = useHistory();
    // function goToJoin(event) {
    //     event.preventDefault();
    //     if (props.user && props.user.length > 0) {
    //         history.push("/profile");
    //     } else {
    //         history.push("/join");
    //     }
    // }
    // function goToPrivacy(event) {
    //     event.preventDefault();
    //     history.push("/privacy");
    // }
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
                        />
                        <button 
                            id="submit-new-user"
                        >
                            Join!
                        </button>
                    </form>
                    <div id="existing-user">
                        <p>Already have an account?</p>
                        <button
                            id="login-exisiting-user"
                        >
                            Login
                        </button>
                    </div>
                    <div id="privacy-section">
                        <p>We are all about privacy!  Check out what we think</p>
                        <button
                            id="view-privacy"
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