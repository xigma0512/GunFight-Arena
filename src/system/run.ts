import { system } from "@minecraft/server";
import { realTime } from "./realTime/_realTime";
import { primary } from "./primary/_primary";

function run() {
    system.runInterval(() => realTime(), 1)
    system.runInterval(() => primary(), 20)
}
export { run }