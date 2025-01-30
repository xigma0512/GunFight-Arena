import entityHealthChange from "./after/entityHealthChange";
import itemUseOn from "./after/itemUseOn";
import playerSpawn from "./after/playerSpawn";
import worldInit from "./after/worldInit";

export default function eventListener() {
    [
        playerSpawn,
        worldInit,
        entityHealthChange,
        itemUseOn
    ].forEach(ev => ev.subscribe())
}