import { world } from "@minecraft/server";
import { WorldInitializeAfterEvent } from "@minecraft/server"
import { Utils } from "../../../core/utils/utils";

export default abstract class worldInit {
    static subscribe = () => {
        return world.afterEvents.worldInitialize.subscribe(ev => {
            Utils.resetGameData();
            console.warn("world initialize");
        })
    }
    static unsubscribe = (ev: (args: WorldInitializeAfterEvent) => void) => world.afterEvents.playerSpawn.unsubscribe(ev)
}