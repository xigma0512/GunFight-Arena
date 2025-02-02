import entityDie from "./after/entityDie";
import entityHealthChange from "./after/entityHealthChange";
import itemCompleteUse from "./after/itemCompleteUse";
import itemUse from "./after/itemUse";
import playerSpawn from "./after/playerSpawn";
import worldInit from "./after/worldInit";
import playerLeave from "./before/playerLeave";

export default function eventListener() {
    const events = [
        worldInit,

        playerSpawn,
        playerLeave,
        itemUse,
        itemCompleteUse,

        entityHealthChange,
        entityDie
    ];
    for (const ev of events) {
        ev.subscribe();
    }
}