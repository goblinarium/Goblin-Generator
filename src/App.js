import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import characterInfo from "./constants.data";
import Menu from "./Menu";
import generateStatBlock from "./util.generateStatBlock";
import grabRandomProperty from "./util.grabRandomProperty";

const SEED = Math.random() * 1000000;

const Sheet = styled.div`
    border: 1px solid grey;
    padding: 30px;
    margin: 50px;
    font-size: 16px;
`;

const SheetImg = styled.img`
    border: 1px solid grey;
    max-height: 100px;
    max-width: 100px;
    padding: 14px;
    margin: 8px;
    float: right;
`;

const Binder = styled.div`
    width: 50%;
`;

const SheetBlank = styled.div`
    width: 40%;
    height: 350px;
    display: inline-block;
    float: right;
    padding: 14px;
    margin: 8px;
    border: 1px solid grey;
`;

const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": atob(
            "OGpWNkVRdFZPZG1zaHJuSGlVUloycXpZZkFuY3AxOVNYa2Zqc25PTFAxOXAwb3JVNXY="
        ),
        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
    },
};

const getGoblinName = () => {
    try {
        return `${grabRandomProperty(
            characterInfo.name,
            SEED
        )} ${grabRandomProperty(characterInfo.familial, SEED).replace(
            "$",
            grabRandomProperty(characterInfo.name, SEED)
        )}`;
    } catch (err) {
        console.log(err);
    }
    return "Beef";
};

const goblinName = getGoblinName();
const STORAGE_KEY = "images";
const DEFAULT_GOBLIN =
    "https://cdn.drawception.com/images/panels/2017/8-7/pwXznQa6Pj-4.png";
const localImages = JSON.parse(localStorage.getItem(STORAGE_KEY));
let imagePromise;
if (localImages != null) {
    imagePromise = Promise.resolve(localImages);
} else {
    imagePromise = fetch(
        `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=${encodeURI(
            goblinName + " goblin"
        )}&pageNumber=1&pageSize=10&autoCorrect=true`,
        options
    )
        .then((response) => response.json())
        .then((response) => {
            return response.value.map((v) => v.url);
        });
}
const secondPromise = imagePromise.then((images) => {
    localStorage.setItem("images", JSON.stringify(images));
    const image = grabRandomProperty(images, SEED);
    return Promise.resolve(image);
});

function App() {
    const [imageUrl, setImageUrl] = useState(null);
    const [imageResolved, setImageResolved] = useState(false);
    const [name, setName] = useState(goblinName);
    const [adjective, setAdjective] = useState(
        grabRandomProperty(characterInfo.adjective, SEED)
    );
    const [race, setRace] = useState(
        grabRandomProperty(characterInfo.race, SEED)
    );
    const [location, setLocation] = useState(
        grabRandomProperty(characterInfo.location, SEED)
    );
    const [backstory, setBackstory] = useState(
        grabRandomProperty(characterInfo.backstory, SEED)
    );
    const [charClass, setCharClass] = useState(
        grabRandomProperty(characterInfo.class, SEED)
    );
    const [starSign, setStarSign] = useState(
        grabRandomProperty(characterInfo.signs, SEED)
    );
    const [kart, setKart] = useState(
        grabRandomProperty(characterInfo.karts, SEED)
    );
    const [sense, setSense] = useState(
        grabRandomProperty(characterInfo.auger, SEED)
    );
    const [jobSpecial, setJobSpecial] = useState(
        grabRandomProperty(characterInfo.job, SEED)
    );
    const [currentJob, setCurrentJob] = useState(characterInfo.job[0]);
    const [statblock, setStatblock] = useState(generateStatBlock());

    const regen = () => {
        const images = JSON.parse(localStorage.getItem(STORAGE_KEY));
        setImageUrl(grabRandomProperty(images, SEED));
        debugger;
        setName(getGoblinName());
        setAdjective(grabRandomProperty(characterInfo.adjective, SEED));
        setRace(grabRandomProperty(characterInfo.race, SEED));
        setLocation(grabRandomProperty(characterInfo.location, SEED));
        setBackstory(grabRandomProperty(characterInfo.backstory, SEED));
        setCharClass(grabRandomProperty(characterInfo.class, SEED));
        setStarSign(grabRandomProperty(characterInfo.signs, SEED));
        setKart(grabRandomProperty(characterInfo.karts, SEED));
        setSense(grabRandomProperty(characterInfo.auger, SEED));
        setJobSpecial(grabRandomProperty(characterInfo.job, SEED));
        setCurrentJob(characterInfo.job[0]);
        setStatblock(generateStatBlock());
    };

    secondPromise
        .then((image) => {
            if (!imageResolved) {
                setImageUrl(image);
                setImageResolved(true);
            }
        })
        .catch((err) => {
            if (!imageResolved) {
                console.error(err);
                setImageUrl(DEFAULT_GOBLIN);
            }
        });
    return (
        <div className="App">
            <header className="App-header">
                <Menu
                    clearImageCache={() => {
                        localStorage.removeItem(STORAGE_KEY);
                        location.reload(true);
                    }}
                ></Menu>
                <h1>GOBLINARIUM GOBLIN GENERATOR</h1>
            </header>
            <article>
                <section>
                    <h2>You are...</h2>
                    <h3>{name}</h3>
                    <p className="gobboPortrait">
                        {imageUrl && (
                            <img
                                alt={name + "the goblin"}
                                height="100"
                                src={imageUrl}
                                onError={(e) => {
                                    debugger;
                                    e.target.src = DEFAULT_GOBLIN;
                                }}
                            />
                        )}
                    </p>
                    <p>
                        {"A "}
                        {adjective + " "}
                        {race + " goblin "}
                        from {location + " "}
                        who {backstory + "!"}
                    </p>
                </section>
                <section>
                    <a
                        href="#"
                        onClick={() => {
                            if (imageResolved) {
                                regen();
                            } else {
                                location.reload(true);
                            }
                        }}
                    >
                        GIBBE MORE WORMS
                    </a>
                </section>
                <section className="sheets">
                    <Sheet>
                        <p className="sheet-name">
                            Name: {name}
                            {imageUrl && (
                                <SheetImg
                                    alt={name + "the goblin"}
                                    src={imageUrl}
                                    onError={(e) => {
                                        e.target.src = DEFAULT_GOBLIN;
                                    }}
                                />
                            )}
                        </p>
                        <p className="minor-info">
                            Backstory: {"A "}
                            {adjective + " "}
                            {race + " goblin "}
                            from {location + " "}
                            who {backstory + "!"}
                        </p>
                        <p>
                            <b>Morph:</b> {race}
                        </p>
                        <SheetBlank>Inventory/Notes</SheetBlank>
                        <p>
                            <b>Class:</b> {charClass}
                        </p>
                        <p>
                            <b>Star Sign:</b> {starSign}
                        </p>
                        <p>
                            <b>Fave Mario Kart Guy*:</b> {kart}
                        </p>
                        <p>
                            <b>Auger Sense:</b> {sense === "" ? "none" : sense}
                        </p>
                        <p>
                            <b>Job Specialization:</b> {jobSpecial}
                        </p>
                        <p>
                            <b>Current Job:</b> {currentJob}
                        </p>
                        <p>
                            <b>Common Sense:</b>{" "}
                            {characterInfo.skillLevels[statblock[0]]}
                        </p>
                        <p>
                            <b>Cursing:</b>{" "}
                            {characterInfo.skillLevels[statblock[1]]}
                        </p>
                        <p>
                            <b>Sneaking:</b>{" "}
                            {characterInfo.skillLevels[statblock[2]]}
                        </p>
                        <p>
                            <b>Strength:</b>{" "}
                            {characterInfo.skillLevels[statblock[3]]}
                        </p>
                        <p>
                            <b>Brains:</b>{" "}
                            {characterInfo.skillLevels[statblock[4]]}
                        </p>
                        <p>
                            <b>Coolness:</b>{" "}
                            {characterInfo.skillLevels[statblock[5]]}
                        </p>
                        <p>
                            <b>Luck:</b>{" "}
                            {characterInfo.skillLevels[statblock[6]]}
                        </p>
                        <p className="very-minor">
                            *if gobs knew about mario kart
                        </p>
                    </Sheet>
                </section>
            </article>
            <footer>
                <p>
                    The Goblinarium and Goblins presented here are Copyright{" "}
                    <a href="https://maxrafferty.com/">Max Rafferty</a> 2022,
                    all rights reserved. No rights for u. Hehe.
                </p>
                <p>
                    Non goblinarium generator inputs on open source loan from{" "}
                    <a href="https://whothefuckismydndcharacter.com/">
                        Who the fuck is my D&D character
                    </a>
                    , by <a href="http://twitter.com/ryanjgrant">Ryan</a>
                </p>
                <p>
                    As they say, "If you make it, make sure you make it{" "}
                    <a href="http://www.opensource.org/">Open Source</a>"
                </p>
                <p>
                    Inspired by{" "}
                    <a href="http://whatthefuckshouldimakefordinner.com/">
                        WTFSIMFD
                    </a>
                </p>
            </footer>
        </div>
    );
}

export default App;
