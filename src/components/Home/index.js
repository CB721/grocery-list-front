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
import "./style.scss";

function Home(props) {
    const [currBenefitIndex, setCurrBenefitIndex] = useState(0);
    const [backButtonClass, setBackButtonClass] = useState("direction-button grey");
    const [nextButtonClass, setNextButtonClass] = useState(`direction-button ${Benefits[1].color}`);
    const [newUserEmail, setNewUserEmail] = useState("");
    const [currSVGs, setCurrSVGs] = useState(<div className="image-area">
        <Apple />
        <Burger />
        <Orange />
        <IceCream />
        <Rice />
        <Taco />
        <Grapes />
    </div>);
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
        // set the svgs based on which benefit is seleted
        switch (currBenefitIndex) {
            case 0:
                setCurrSVGs(<div className="image-area">
                    <Apple />
                    <Burger />
                    <Orange />
                    <IceCream />
                    <Rice />
                    <Taco />
                    <Grapes />
                </div>);
                break;
            case 1:
                setCurrSVGs(<div className="image-area">
                    <HandWithPhone />
                    <ListIcon />
                </div>);
                break;
            case 2:
                setCurrSVGs(<div className="image-area">
                    <StoreIcon />
                    <BlueCar />
                    <RedCar />
                    <Road />
                    <Cart />
                    <Trees />
                </div>);
                break;
            case 3:
                setCurrSVGs(<div className="image-area">
                    <SendIcon />
                    <Woman />
                    <ManIcon />
                    <Phone />
                    <Cereal />
                </div>);
                break;
            case 4:
                setCurrSVGs(<div className="image-area">
                    <RecipeBook />
                    <ChefHat />
                    <Bread />
                    <Wine />
                    <Tomato />
                    <Potato />
                </div>);
                break;
            default:
                return;
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
                            svgs={currSVGs}
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