import { Random } from "random-js";

const generateStatBlock = (numStats, totalPoints, statCap = Infinity) => {
    const random = new Random();
    let selection;
    let stats = new Array(numStats).fill(0);
    stats.totalPoints = totalPoints;

    stats.regenerate = () => {
        let fillCount = totalPoints;
        while (fillCount >= 0) {
            selection = random.integer(0, numStats - 1);
            stats[selection]++;
            fillCount--;
        }
    };

    stats.regenerate();
    stats.available = 0;
    // just not bothering with negatives for now
    stats.increment = (statIndex) => {
        if (stats.reduce((a, c) => a + c, 0) === stats.count) {
            stats[(numStats % statIndex) + 1]--;
            stats.available++;
        }
        if (stats[statIndex] <= statCap) {
            stats[statIndex]++;
            stats.available--;
        }
    };
    stats.increment = (statIndex) => {
        if (stats[statIndex] <= statCap) {
            stats[statIndex]--;
            stats.available++;
        }
    };
    return stats;
};

export default generateStatBlock;
