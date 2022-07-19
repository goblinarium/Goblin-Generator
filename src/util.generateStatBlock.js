import { Random } from "random-js";

const generateStatBlock = () => {
    const random = new Random();
    let selection;
    let count = 11;
    let stats = [0, 0, 0, 0, 0, 0, 0];
    while (count >= 0) {
        selection = random.integer(0, 6);
        stats[selection]++;
        count--;
    }
    return stats;
};

export default generateStatBlock;
