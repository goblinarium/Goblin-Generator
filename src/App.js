import React, { useState } from "react";
import "./App.css";
import characterInfo from "./constants.data";
import grabRandomProperty from "./util.grabRandomProperty";

const SEED = Math.random() * 1000000;

const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": atob(
            "OGpWNkVRdFZPZG1zaHJuSGlVUloycXpZZkFuY3AxOVNYa2Zqc25PTFAxOXAwb3JVNXY="
        ),
        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
    },
};

const goblinName = `${grabRandomProperty(
    characterInfo.name,
    SEED
)} ${grabRandomProperty(characterInfo.familial, SEED).replace(
    "$",
    grabRandomProperty(characterInfo.name, SEED)
)}`;
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
    secondPromise
        .then((image) => {
            setImageUrl(image);
        })
        .catch((err) => {
            console.error(err);
            setImageUrl(DEFAULT_GOBLIN);
        });
    return (
        <div className="App">
            <header className="App-header">
                <h1>GOBLINARIUM GOBLIN GENERATOR</h1>
            </header>
            <article>
                <h2>You are...</h2>
                <h3>{goblinName}</h3>
                <p className="gobboPortrait">
                    {imageUrl && (
                        <img
                          alt={goblinName + 'the goblin'}
                          height='100'
                            src={imageUrl}
                            onError={(e) => {
                                e.target.src = DEFAULT_GOBLIN;
                            }}
                        />
                    )}
                </p>
                <p>
                    {"A "}
                    {grabRandomProperty(characterInfo.adjective, SEED) + " "}
                    {grabRandomProperty(characterInfo.race, SEED) + " goblin "}
                    from{" "}
                    {grabRandomProperty(characterInfo.location, SEED) + " "}
                    who{" "}
                    {grabRandomProperty(characterInfo.backstory, SEED) + "!"}
                </p>
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
