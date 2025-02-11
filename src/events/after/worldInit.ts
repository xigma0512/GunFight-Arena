import Property from "../../property/_handler";
import { ResetUtils } from "../../utils/reset";

import { Vector3, world } from "@minecraft/server";
import { WorldInitializeAfterEvent } from "@minecraft/server"

export default abstract class worldInit {
    static subscribe = () => {
        return world.afterEvents.worldInitialize.subscribe(ev => {
            ResetUtils.inGameData();
            world.setDefaultSpawnLocation(Property.world().get('spawns').get('lobby') as Vector3);
            world.gameRules.showDeathMessages = false;
            world.gameRules.showTags = false;
            world.gameRules.keepInventory = true;
        })
    }
    static unsubscribe = (ev: (args: WorldInitializeAfterEvent) => void) => world.afterEvents.playerSpawn.unsubscribe(ev)
}