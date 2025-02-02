import eventListener from "./game/event/_listener";
import { runInterval } from "./core/system/_run";
import { system } from "@minecraft/server";

eventListener();
system.runTimeout(() => runInterval(), 100);