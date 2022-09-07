import characterInfo from "./constants.data";

const FoolStatblock = ({ statblock }) => {
    return (
        <>
            <p>
                <b>Common Sense:</b> {characterInfo.skillLevels[statblock[0]]}
            </p>
            <p>
                <b>Cursing:</b> {characterInfo.skillLevels[statblock[1]]}
            </p>
            <p>
                <b>Sneaking:</b> {characterInfo.skillLevels[statblock[2]]}
            </p>
            <p>
                <b>Strength:</b> {characterInfo.skillLevels[statblock[3]]}
            </p>
            <p>
                <b>Brains:</b> {characterInfo.skillLevels[statblock[4]]}
            </p>
            <p>
                <b>Coolness:</b> {characterInfo.skillLevels[statblock[5]]}
            </p>
            <p>
                <b>Luck:</b> {characterInfo.skillLevels[statblock[6]]}
            </p>
        </>
    );
};

export default FoolStatblock;
