import { Random } from "random-js";

const grabRandomProperty = (target, seed) => {
    const random = new Random();
    const selection = random.integer(0, target.length);
    return target[selection];

}

export default grabRandomProperty;