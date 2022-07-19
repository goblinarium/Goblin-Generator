import { Random } from "random-js";

const grabRandomProperty = (target, seed) => {
    const random = new Random();
    const selection = random.integer(0, target.length - 1);
    const item = target[selection];
    if(item == null) {
        throw new Error('Bounds Miscalculation')
    }
    return item;
};

export default grabRandomProperty;
