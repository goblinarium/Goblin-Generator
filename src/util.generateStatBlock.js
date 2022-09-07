import { Random } from "random-js";

const generateStatBlock = (numStats, totalPoints, statCap = Infinity) => {
    const random = new Random();
    let selection;
    let stats = new Array(numStats).fill(0);
    stats.totalPoints = totalPoints;
    stats.statCap = statCap;

    stats.regenerate = () => {
        let fillCount = totalPoints;
        while (fillCount >= 0) {
            // mmmm, efficent
            //if (stats[selection] < statCap - 1) {
            selection = random.integer(0, numStats - 1);
            stats[selection]++;
            fillCount--;
            //}
        }
    };

    stats.regenerate();
    stats.available = 0;
    // just not bothering with negatives for now
    stats.increment = (statIndex) => {
        if (stats.reduce((a, c) => a + c, 0) >= stats.totalPoints) {
            stats[(numStats % statIndex) + 1]--;
            stats.available++;
        }
        if (stats[statIndex] <= statCap - 1) {
            stats[statIndex]++;
            stats.available--;
        }
    };
    stats.decrement = (statIndex) => {
        stats[statIndex]--;
        stats.available++;
    };
    return stats;
};

export default generateStatBlock;
