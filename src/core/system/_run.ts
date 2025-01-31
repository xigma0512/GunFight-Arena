import { system } from "@minecraft/server";
import primarySystemRun from "./primary";
import realTimeSystenRun from "./realTime";

export function runInterval() {
    system.runInterval(() => primarySystemRun(), 20);
    system.runInterval(() => realTimeSystenRun(), 1)
}