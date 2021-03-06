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
import { ReactComponent as FilterOne } from "../../assets/images/filter-1.svg";
import { ReactComponent as FilterTwo } from "../../assets/images/filter-2.svg";
import { ReactComponent as FilterThree } from "../../assets/images/filter-3.svg";
import { ReactComponent as FilterFour } from "../../assets/images/filter-4.svg";
import { ReactComponent as FilterFive } from "../../assets/images/filter-5.svg";
import { ReactComponent as FilterSix } from "../../assets/images/filter-6.svg";
import { ReactComponent as FilterSeven } from "../../assets/images/filter-7.svg";
import { ReactComponent as FilterEight } from "../../assets/images/filter-8.svg";
import { ReactComponent as FilterNine } from "../../assets/images/filter-9.svg";
import { ReactComponent as FilterTen } from "../../assets/images/filter-10.svg";
import { ReactComponent as FilterEleven } from "../../assets/images/filter-11.svg";
import { ReactComponent as FilterTwelve } from "../../assets/images/filter-12.svg";
import { ReactComponent as ConnectOne } from "../../assets/images/connect-1.svg";
import { ReactComponent as ConnectTwo } from "../../assets/images/connect-2.svg";
import { ReactComponent as ConnectThree } from "../../assets/images/connect-3.svg";
import { ReactComponent as ConnectFour } from "../../assets/images/connect-4.svg";
import { ReactComponent as ConnectFive } from "../../assets/images/connect-5.svg";
import { ReactComponent as ConnectSix } from "../../assets/images/connect-6.svg";
import { ReactComponent as ConnectSeven } from "../../assets/images/connect-7.svg";
import { ReactComponent as ConnectEight } from "../../assets/images/connect-8.svg";
import { ReactComponent as ConnectNine } from "../../assets/images/connect-9.svg";
import { ReactComponent as ConnectTen } from "../../assets/images/connect-10.svg";
import { ReactComponent as ConnectEleven } from "../../assets/images/connect-11.svg";
import { ReactComponent as RecipesOne } from "../../assets/images/recipes-1.svg";
import { ReactComponent as RecipesTwo } from "../../assets/images/recipes-2.svg";
import { ReactComponent as RecipesThree } from "../../assets/images/recipes-3.svg";
import { ReactComponent as RecipesFour } from "../../assets/images/recipes-4.svg";
import { ReactComponent as RecipesFive } from "../../assets/images/recipes-5.svg";
import { ReactComponent as RecipesSix } from "../../assets/images/recipes-6.svg";
import { ReactComponent as RecipesSeven } from "../../assets/images/recipes-7.svg";
import { ReactComponent as RecipesEight } from "../../assets/images/recipes-8.svg";
import { ReactComponent as RecipesNine } from "../../assets/images/recipes-9.svg";
import { ReactComponent as RecipesTen } from "../../assets/images/recipes-10.svg";
import { ReactComponent as RecipesEleven } from "../../assets/images/recipes-11.svg";
import { ReactComponent as RecipesTwelve } from "../../assets/images/recipes-12.svg";
import { ReactComponent as RecipesThirteen } from "../../assets/images/recipes-13.svg";
import { ReactComponent as RecipesFourteen } from "../../assets/images/recipes-14.svg";
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

    // the current set of svgs to be rendered
    const [currSvg, setCurrSvg] = useState();
    // the current svg to be displayed
    const [currSvgIndex, setCurrSvgIndex] = useState(0);
    // every time the benefit is changed, update the current svgs to be the first svg
    useEffect(() => {
        switch (currBenefitIndex) {
            case 0:
                setCurrSvg(
                    <div className="benefit-area">
                        <BagStart className="benefit-layer show" />
                        <BagMiddle className="benefit-layer" />
                    </div>
                );
                setCurrSvgIndex(0);
                break;
            case 1:
                setCurrSvg(
                    <div className="benefit-area">
                        <UpdateOne className="benefit-layer show" />
                        <UpdateTwo className="benefit-layer " />
                    </div>
                );
                setCurrSvgIndex(0);
                break;
            case 2:
                setCurrSvg(
                    <div className="benefit-area">
                        <FilterOne className="benefit-layer show" />
                        <FilterTwo className="benefit-layer " />
                    </div>
                );
                setCurrSvgIndex(0);
                break;
            case 3:
                setCurrSvg(
                    <div className="benefit-area">
                        <ConnectOne className="benefit-layer show" />
                        <ConnectTwo className="benefit-layer" />
                    </div>
                );
                setCurrSvgIndex(0);
                break;
            case 4:
                setCurrSvg(
                    <div className="benefit-area">
                        <RecipesOne className="benefit-layer show" />
                        <RecipesTwo className="benefit-layer" />
                    </div>
                );
                setCurrSvgIndex(0);
                break;
            default:
                setCurrSvgIndex(0);
                return;
        }
    }, [currBenefitIndex]);
    // each benefit has a set of svgs to animate through using the imported useInterval hook
    // the benefits.json file has data on the background color, the text to display and how quickly to animate through the svgs
    // based on which benefit is being displayed to the user, render the corresponding svgs
    // based on the current svg index, display the corresponding svg
    // because the svgs are animated in and out, the preceding and following svgs need to be included
    // in order to "pause" on certain frames, certain svgs are repeated
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
                            <UpdateOne className="benefit-layer" />
                            <UpdateTwo className="benefit-layer show" />
                            <UpdateThree className="benefit-layer" />

                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 2:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateTwo className="benefit-layer" />
                            <UpdateThree className="benefit-layer show" />
                            <UpdateFour className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 3:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateThree className="benefit-layer" />
                            <UpdateFour className="benefit-layer show" />
                            <UpdateFive className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 4:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateFour className="benefit-layer" />
                            <UpdateFive className="benefit-layer show" />
                            <UpdateSix className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 5:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateFive className="benefit-layer" />
                            <UpdateSix className="benefit-layer show" />
                            <UpdateSeven className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 6:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateSix className="benefit-layer" />
                            <UpdateSeven className="benefit-layer show" />
                            <UpdateEight className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 7:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateSeven className="benefit-layer" />
                            <UpdateEight className="benefit-layer show" />
                            <UpdateNine className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 8:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateOne className="benefit-layer" />
                            <UpdateEight className="benefit-layer" />
                            <UpdateNine className="benefit-layer show" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 9:
                    setCurrSvg(
                        <div className="benefit-area">
                            <UpdateOne className="benefit-layer" />
                            <UpdateEight className="benefit-layer" />
                            <UpdateNine className="benefit-layer show" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 10:
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
            switch (currSvgIndex) {
                case 0:
                    setCurrSvg(
                        <div className="benefit-area">
                            <FilterOne className="benefit-layer show" />
                            <FilterTwo className="benefit-layer" />
                            <FilterTwelve className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 1:
                    setCurrSvg(
                        <div className="benefit-area">
                            <FilterOne className="benefit-layer" />
                            <FilterTwo className="benefit-layer show" />
                            <FilterThree className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 2:
                    setCurrSvg(
                        <div className="benefit-area">
                            <FilterTwo className="benefit-layer" />
                            <FilterThree className="benefit-layer show" />
                            <FilterFour className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 3:
                    setCurrSvg(
                        <div className="benefit-area">
                            <FilterThree className="benefit-layer" />
                            <FilterFour className="benefit-layer show" />
                            <FilterFive className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 4:
                    setCurrSvg(
                        <div className="benefit-area">
                            <FilterFour className="benefit-layer" />
                            <FilterFive className="benefit-layer show" />
                            <FilterSix className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 5:
                    setCurrSvg(
                        <div className="benefit-area">
                            <FilterFive className="benefit-layer" />
                            <FilterSix className="benefit-layer show" />
                            <FilterSeven className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 6:
                    setCurrSvg(
                        <div className="benefit-area">
                            <FilterSix className="benefit-layer" />
                            <FilterSeven className="benefit-layer show" />
                            <FilterEight className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 7:
                    setCurrSvg(
                        <div className="benefit-area">
                            <FilterSeven className="benefit-layer" />
                            <FilterEight className="benefit-layer show" />
                            <FilterNine className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 8:
                    setCurrSvg(
                        <div className="benefit-area">
                            <FilterEight className="benefit-layer" />
                            <FilterNine className="benefit-layer show" />
                            <FilterTen className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 9:
                    setCurrSvg(
                        <div className="benefit-area">
                            <FilterNine className="benefit-layer" />
                            <FilterTen className="benefit-layer show" />
                            <FilterEleven className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 10:
                    setCurrSvg(
                        <div className="benefit-area">
                            <FilterTen className="benefit-layer" />
                            <FilterEleven className="benefit-layer show" />
                            <FilterTwelve className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 11:
                    setCurrSvg(
                        <div className="benefit-area">
                            <FilterOne className="benefit-layer" />
                            <FilterEleven className="benefit-layer" />
                            <FilterTwelve className="benefit-layer show" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 12:
                    setCurrSvg(
                        <div className="benefit-area">
                            <FilterOne className="benefit-layer" />
                            <FilterEleven className="benefit-layer" />
                            <FilterTwelve className="benefit-layer show" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                default:
                    setCurrSvgIndex(0);
                    return;
            }
        } else if (currBenefitIndex === 3) {
            switch (currSvgIndex) {
                case 0:
                    setCurrSvg(
                        <div className="benefit-area">
                            <ConnectOne className="benefit-layer show" />
                            <ConnectTwo className="benefit-layer" />
                            <ConnectEleven className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 1:
                    setCurrSvg(
                        <div className="benefit-area">
                            <ConnectOne className="benefit-layer" />
                            <ConnectTwo className="benefit-layer show" />
                            <ConnectThree className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 2:
                    setCurrSvg(
                        <div className="benefit-area">
                            <ConnectTwo className="benefit-layer" />
                            <ConnectThree className="benefit-layer show" />
                            <ConnectFour className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 3:
                    setCurrSvg(
                        <div className="benefit-area">
                            <ConnectThree className="benefit-layer" />
                            <ConnectFour className="benefit-layer show" />
                            <ConnectFive className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 4:
                    setCurrSvg(
                        <div className="benefit-area">
                            <ConnectFour className="benefit-layer" />
                            <ConnectFive className="benefit-layer show" />
                            <ConnectSix className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 5:
                    setCurrSvg(
                        <div className="benefit-area">
                            <ConnectFive className="benefit-layer" />
                            <ConnectSix className="benefit-layer show" />
                            <ConnectSeven className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 6:
                    setCurrSvg(
                        <div className="benefit-area">
                            <ConnectFive className="benefit-layer" />
                            <ConnectSix className="benefit-layer show" />
                            <ConnectSeven className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 7:
                    setCurrSvg(
                        <div className="benefit-area">
                            <ConnectFive className="benefit-layer" />
                            <ConnectSix className="benefit-layer show" />
                            <ConnectSeven className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 8:
                    setCurrSvg(
                        <div className="benefit-area">
                            <ConnectSix className="benefit-layer" />
                            <ConnectSeven className="benefit-layer show" />
                            <ConnectEight className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 9:
                    setCurrSvg(
                        <div className="benefit-area">
                            <ConnectSeven className="benefit-layer" />
                            <ConnectEight className="benefit-layer show" />
                            <ConnectNine className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 10:
                    setCurrSvg(
                        <div className="benefit-area">
                            <ConnectEight className="benefit-layer" />
                            <ConnectNine className="benefit-layer show" />
                            <ConnectTen className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 11:
                    setCurrSvg(
                        <div className="benefit-area">
                            <ConnectNine className="benefit-layer" />
                            <ConnectTen className="benefit-layer show" />
                            <ConnectEleven className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 12:
                    setCurrSvg(
                        <div className="benefit-area">
                            <ConnectOne className="benefit-layer" />
                            <ConnectTen className="benefit-layer" />
                            <ConnectEleven className="benefit-layer show" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                default:
                    setCurrSvgIndex(0);
                    return;
            }
        } else if (currBenefitIndex === 4) {
            switch (currSvgIndex) {
                case 0:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesOne className="benefit-layer show" />
                            <RecipesTwo className="benefit-layer" />
                            <RecipesFourteen className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 1:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesOne className="benefit-layer" />
                            <RecipesTwo className="benefit-layer show" />
                            <RecipesThree className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 2:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesTwo className="benefit-layer" />
                            <RecipesThree className="benefit-layer show" />
                            <RecipesFour className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 3:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesThree className="benefit-layer" />
                            <RecipesFour className="benefit-layer show" />
                            <RecipesFive className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 4:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesFour className="benefit-layer" />
                            <RecipesFive className="benefit-layer show" />
                            <RecipesSix className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 5:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesFive className="benefit-layer" />
                            <RecipesSix className="benefit-layer show" />
                            <RecipesSeven className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 6:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesSix className="benefit-layer" />
                            <RecipesSeven className="benefit-layer show" />
                            <RecipesEight className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 7:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesSeven className="benefit-layer" />
                            <RecipesEight className="benefit-layer show" />
                            <RecipesNine className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 8:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesEight className="benefit-layer" />
                            <RecipesNine className="benefit-layer show" />
                            <RecipesTen className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 9:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesNine className="benefit-layer" />
                            <RecipesTen className="benefit-layer show" />
                            <RecipesEleven className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 10:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesTen className="benefit-layer" />
                            <RecipesEleven className="benefit-layer show" />
                            <RecipesTwelve className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 11:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesEleven className="benefit-layer" />
                            <RecipesTwelve className="benefit-layer show" />
                            <RecipesThirteen className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 12:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesEleven className="benefit-layer" />
                            <RecipesTwelve className="benefit-layer show" />
                            <RecipesThirteen className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 13:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesTwelve className="benefit-layer" />
                            <RecipesThirteen className="benefit-layer show" />
                            <RecipesFourteen className="benefit-layer" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 14:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesOne className="benefit-layer" />
                            <RecipesThirteen className="benefit-layer" />
                            <RecipesFourteen className="benefit-layer show" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 15:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesOne className="benefit-layer" />
                            <RecipesThirteen className="benefit-layer" />
                            <RecipesFourteen className="benefit-layer show" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 16:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesOne className="benefit-layer" />
                            <RecipesThirteen className="benefit-layer" />
                            <RecipesFourteen className="benefit-layer show" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                case 17:
                    setCurrSvg(
                        <div className="benefit-area">
                            <RecipesOne className="benefit-layer" />
                            <RecipesThirteen className="benefit-layer" />
                            <RecipesFourteen className="benefit-layer show" />
                        </div>
                    );
                    setCurrSvgIndex(currSvgIndex + 1);
                    break;
                default:
                    setCurrSvgIndex(0);
                    return;
            }
        }
    }, Benefits[currBenefitIndex].delay);
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
        } else if (direction === "next" && currBenefitIndex + 1 < 5) {
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