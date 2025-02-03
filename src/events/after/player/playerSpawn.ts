import { ResetUtils } from "../../../utils/reset";

import { world } from "@minecraft/server";
import { HudElement, PlayerSpawnAfterEvent } from "@minecraft/server"

export default abstract class playerSpawn {
    static subscribe = () => {
        return world.afterEvents.playerSpawn.subscribe(ev => {
            const player = ev.player
            if (ev.initialSpawn) {
                player.onScreenDisplay.setHudVisibility(0, [
                    HudElement.ItemText,
                    HudElement.StatusEffects,
                    HudElement.Armor
                ]);
                ResetUtils.playerData(player);
            }
        })
    }
    static unsubscribe = (ev: (args: PlayerSpawnAfterEvent) => void) => world.afterEvents.playerSpawn.unsubscribe(ev)
}