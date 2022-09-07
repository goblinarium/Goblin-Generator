import generateStatBlock from "./util.generateStatBlock";

// lol filth
const cloneStatblock = (statblock) => {
    const newStatBlock = generateStatBlock(
        statblock.length,
        statblock.totalPoints,
        statblock.statCap
    );
    newStatBlock.forEach((v, i) => {
        newStatBlock[i] = statblock[i];
    });
    newStatBlock.available = statblock.available;
    return newStatBlock;
};

const StatblockMenu = ({ statblock, setStatblock }) => {
    return (
        <>
            {statblock.map((stat, i) => {
                return (
                    <>
                        <p>
                            <a
                                href="#"
                                onClick={() => {
                                    statblock.increment(i);
                                    setStatblock(cloneStatblock(statblock));
                                }}
                            >
                                &#128316;
                            </a>
                            <span>{stat}</span>
                            <a
                                href="#"
                                onClick={() => {
                                    statblock.decrement(i);
                                    setStatblock(cloneStatblock(statblock));
                                }}
                            >
                                &#128317;
                            </a>
                        </p>
                    </>
                );
            })}
            <p></p>
        </>
    );
};

export default StatblockMenu;
