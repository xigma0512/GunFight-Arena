import { effect } from "./effects";
import { statue_manager } from "./status_manager";

let tickingTime = -1
const primary = () => {
    if (tickingTime > 0) tickingTime--;
    statue_manager(tickingTime)
    effect();
}

const setTickingTime = (value: number) => tickingTime = value;
const getTickingTime = () => tickingTime
export { primary, setTickingTime, getTickingTime }