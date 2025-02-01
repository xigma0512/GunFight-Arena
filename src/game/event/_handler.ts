import entityHealthChange from "./after/entityHealthChange";
import itemCompleteUse from "./after/itemCompleteUse";
import itemUse from "./after/itemUse";
import playerSpawn from "./after/playerSpawn";
import worldInit from "./after/worldInit";
import playerLeave from "./before/playerLeave";

export default function eventListener() {
    [
        playerSpawn,
        worldInit,
        entityHealthChange,
        itemUse,
        playerLeave,
        itemCompleteUse
    ].forEach(ev => ev.subscribe())
}