import eventListener from "./game/event/_handler";
import { runInterval } from "./core/system/_run";
import { world } from "@minecraft/server";

const ev = world.afterEvents.worldInitialize.subscribe(() => {
    eventListener();
    runInterval();
    world.afterEvents.worldInitialize.unsubscribe(ev);
})