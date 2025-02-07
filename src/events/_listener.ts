import entityDie from "./after/entity/entityDie";
import entityHealthChange from "./after/entity/entityHealthChange";
import entitySpawn from "./after/entity/entitySpawn";

import itemCompleteUse from "./after/item/itemCompleteUse";
import itemUse from "./before/item/itemUse";

import playerSpawn from "./after/player/playerSpawn";
import playerInteractWithEntity from "./before/player/playerInteractWithEntity"
import playerLeave from "./before/player/playerLeave";

import worldInit from "./after/worldInit";
import ScriptMessage from "./after/scriptMessage";

export default function eventListener() {
    const events = [
        entityHealthChange,
        entityDie,
        entitySpawn,

        itemUse,
        itemCompleteUse,

        playerSpawn,
        playerInteractWithEntity,
        playerLeave,

        worldInit,
        ScriptMessage,
    ];
    for (const ev of events) {
        ev.subscribe();
    }
}