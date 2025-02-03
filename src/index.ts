import runTask from "./system/task/runTask";
import eventListener from "./events/_listener";
import { system } from "@minecraft/server";

eventListener();
system.runTimeout(runTask, 100);