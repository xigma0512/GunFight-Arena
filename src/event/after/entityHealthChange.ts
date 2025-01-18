import { world } from "@minecraft/server";
import { EntityHealthChangedAfterEvent, GameMode, Player } from "@minecraft/server"

import { revival } from "../../utils/revival";

abstract class entityHealthChange {
    static subscribe = () => {
        return world.afterEvents.entityHealthChanged.subscribe(ev => {

            if (ev.entity.typeId !== 'minecraft:player') return

            const p = ev.entity as Player
            p.setSpawnPoint({ x: p.location.x, y: p.location.y, z: p.location.z, dimension: p.dimension })
            if (ev.newValue <= 0) {
                p.getComponent('inventory')?.container?.clearAll();
                p.setGameMode(GameMode.spectator);
                p.sendMessage("You've been eliminated. Respawn in 5 seconds!")
                revival(p);
            }
        })
    }
    static unsubscribe = (ev: (args: EntityHealthChangedAfterEvent) => void) => world.afterEvents.entityHealthChanged.unsubscribe(ev)
}
export default entityHealthChange