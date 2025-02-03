import config from "../../config";
import { ResetUtils } from "../../utils/reset";

import { world } from "@minecraft/server";
import { WorldInitializeAfterEvent } from "@minecraft/server"

export default abstract class worldInit {
    static subscribe = () => {
        return world.afterEvents.worldInitialize.subscribe(ev => {
            ResetUtils.inGameData();
            world.setDefaultSpawnLocation(config.lobby_spawn);
            world.gameRules.showDeathMessages = false;
            world.gameRules.showTags = false;
            world.gameRules.keepInventory = true;

            console.warn("world initialize");
        })
    }
    static unsubscribe = (ev: (args: WorldInitializeAfterEvent) => void) => world.afterEvents.playerSpawn.unsubscribe(ev)
}