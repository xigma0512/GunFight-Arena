import entityHealthChange from "./after/entityHealthChange";
import itemUseOn from "./after/itemUseOn";
import playerSpawn from "./after/playerSpawn";
import worldInit from "./after/worldInit";
import playerLeave from "./before/playerLeave";

export default function eventListener() {
    [
        playerSpawn,
        worldInit,
        entityHealthChange,
        itemUseOn,
        playerLeave
    ].forEach(ev => ev.subscribe())
}