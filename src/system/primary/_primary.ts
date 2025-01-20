import { effect } from "./effects";
import { status_detect } from "./status_detect";

let tickingTime = -1
const primary = () => {
    if (tickingTime > 0) tickingTime--;
    status_detect(tickingTime)
    effect();
}

const setTickingTime = (value: number) => tickingTime = value;
const getTickingTime = () => tickingTime
export { primary, setTickingTime, getTickingTime }