import entityHealthChange from "./after/entityHealthChange";
import itemCompleteUse from "./after/itemCompleteUse";
import itemUse from "./after/itemUse";
import playerSpawn from "./after/playerSpawn";
import worldInit from "./after/worldInit";
import playerLeave from "./before/playerLeave";

export default function eventListener() {
    const events = [
        playerSpawn,
        worldInit,
        entityHealthChange,
        itemUse,
        playerLeave,
        itemCompleteUse
    ];
    for (const ev of events) {
        ev.subscribe();
    }
}