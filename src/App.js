import "./App.css";
import characterInfo from "./constants.data";
import grabRandomProperty from "./util.grabRandomProperty";

const SEED = Math.random() * 1000000;

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>GOBLINARIUM GOBLIN GENERATOR</h1>
            </header>
            <article>
                <h2>You are...</h2>
                <h3>{`${grabRandomProperty(
                    characterInfo.name,
                    SEED
                )} ${grabRandomProperty(characterInfo.familial, SEED).replace(
                    "$",
                    grabRandomProperty(characterInfo.name, SEED)
                )}`}</h3>
                <p>
                  {'A '}
                  {grabRandomProperty(characterInfo.adjective, SEED) + ' '}
                  {grabRandomProperty(characterInfo.race, SEED) + ' goblin '}
                  from{' '}
                  {grabRandomProperty(characterInfo.location, SEED) + ' '}
                  who{' '}
                  {grabRandomProperty(characterInfo.backstory, SEED) + '!'}
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
