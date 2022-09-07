const DnDStatblock = ({ statblock }) => {
    return (
        <>
            <p>
                <b>Strength:</b> {statblock[0]}
            </p>
            <p>
                <b>Dexterity:</b> {statblock[1]}
            </p>
            <p>
                <b>Constitution:</b> {statblock[2]}
            </p>
            <p>
                <b>Intelligence:</b> {statblock[3]}
            </p>
            <p>
                <b>Wisdom:</b> {statblock[4]}
            </p>
            <p>
                <b>Charisma:</b> {statblock[5]}
            </p>
        </>
    );
};

export default DnDStatblock;
