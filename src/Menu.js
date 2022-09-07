import React, { useState } from "react";
import styled from "styled-components";
import StatblockMenu from "./StatblockMenu";

const MenuButton = styled.nav`
    position: fixed;
    cursor: pointer;
    left: 10px;
    top: 10px;
    @media print {
        display: none;
    }
`;

const HiddenMenu = styled.div`
    position: fixed;
    height: 100vh;
    width: 50vw;
    overflow: scroll;
    top: 0;
    background-color: black;
    z-index: 2;
    transition: left 1s;
    font-family: "Impact", "Helvetica", "Helvetica Neue", arial, sans;
`;

const MenuShirt = styled.div`
    position: relative;
    padding-top: 40px;
    width: 100%;
    height: 100%;
`;

const CloseButton = styled.div`
    position: absolute;
    cursor: pointer;
    right: 10px;
    top: 10px;
`;

const MenuCloser = styled.div`
    position: fixed;
    height: 100vh;
    top: 0;
    right: 0;
    width: 50vw;
    z-index: 1;
    color: transparent;
`;

const Menu = ({
    clearImageCache,
    name,
    setName,
    getName,
    foolStatblock,
    setFoolStatblock,
    availableStatbocks,
    dnDStatblock,
    setDnDStatblock,
    selectedStatblock,
    setSelectedStatblock,
}) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <MenuButton
                onClick={() => {
                    setOpen(!open);
                }}
            >
                🍔
            </MenuButton>
            <HiddenMenu style={{ left: open ? "0" : "-50vw" }}>
                <MenuShirt>
                    <CloseButton onClick={() => setOpen(false)}>X</CloseButton>
                    <div>
                        <p>
                            <button onClick={clearImageCache}>
                                Clear Image Cache & Reload
                            </button>
                        </p>
                        <p>
                            <input
                                type="checkbox"
                                id="active-only-check"
                                name="active-only-check"
                                readOnly
                            ></input>
                            <label for="active-only-check">
                                &nbsp;&nbsp;Allow Only Active Campaign Options
                            </label>
                        </p>
                        <p>
                            <label for="name-input">Goblin Name:</label>
                            &nbsp;
                            <input
                                type="text"
                                id="name-input"
                                name="name-input"
                                value={name}
                                onChange={(val) => {
                                    setName(val.target.value);
                                }}
                            ></input>
                            <a
                                href="#"
                                onClick={() => {
                                    setName(getName());
                                }}
                            >
                                &#128260;
                            </a>
                        </p>
                        <p>
                            <label for="name-input">Goblin Name:</label>
                            <select
                                id="statblock-select"
                                name="statblock-select"
                                value={selectedStatblock}
                                onChange={(e) =>
                                    setSelectedStatblock(e.target.value)
                                }
                            >
                                {availableStatbocks.map((statblockName) => (
                                    <option value={statblockName}>
                                        {statblockName}
                                    </option>
                                ))}
                            </select>
                        </p>
                        {availableStatbocks[0] === selectedStatblock && (
                            <StatblockMenu
                                statblock={dnDStatblock}
                                setStatblock={setDnDStatblock}
                            />
                        )}
                        {availableStatbocks[1] === selectedStatblock && (
                            <StatblockMenu
                                statblock={foolStatblock}
                                setStatblock={setFoolStatblock}
                            />
                        )}
                    </div>
                </MenuShirt>
            </HiddenMenu>
            <MenuCloser
                onClick={() => setOpen(false)}
                style={{ right: open ? "0" : "-50vw" }}
            >
                .
            </MenuCloser>
        </>
    );
};

export default Menu;
