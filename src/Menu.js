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
`;

const MenuShirt = styled.div`
    position: relative;
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

const Menu = () => {
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
