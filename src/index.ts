import runTask from "./core/system/runTask";
import eventListener from "./game/event/_listener";
import { system } from "@minecraft/server";

eventListener();
system.runTimeout(runTask, 100);