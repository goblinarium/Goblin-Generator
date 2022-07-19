import React, { useState } from "react";
import styled from "styled-components";

const MenuButton = styled.nav`
    position: absolute;
    cursor: pointer;
    left: 10px;
    top: 10px;
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

const Menu = ({ clearImageCache }) => {
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
                                checked
                                readOnly
                            ></input>
                            <label for="active-only-check">
                                &nbsp;&nbsp;Allow Only Active Campaign Options
                            </label>
                        </p>
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
