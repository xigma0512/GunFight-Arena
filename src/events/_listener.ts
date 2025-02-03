import entityDie from "./after/entity/entityDie";
import entityHealthChange from "./after/entity/entityHealthChange";

import itemCompleteUse from "./after/item/itemCompleteUse";
import itemUse from "./after/item/itemUse";

import playerSpawn from "./after/player/playerSpawn";

import worldInit from "./after/worldInit";
import ScriptMessage from "./after/scriptMessage";

export default function eventListener() {
    const events = [
        entityHealthChange,
        entityDie,

        itemUse,
        itemCompleteUse,

        playerSpawn,

        worldInit,
        ScriptMessage,
    ];
    for (const ev of events) {
        ev.subscribe();
    }
}