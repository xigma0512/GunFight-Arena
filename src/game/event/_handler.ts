import entityHealthChange from "./after/entityHealthChange";
import entityHurt from "./after/entityHurt";
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
        itemCompleteUse,
        entityHurt
    ].forEach(ev => ev.subscribe())
}