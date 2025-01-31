import { world } from "@minecraft/server";
import { EntityHealthChangedAfterEvent, Player } from "@minecraft/server"

import { setGameMode } from "../../utils/_utils";
import { PropertyManager } from "../../property/_manager";

abstract class entityHealthChange {
    static subscribe = () => {
        return world.afterEvents.entityHealthChanged.subscribe(ev => {

            if (ev.entity.typeId !== 'minecraft:player') return

            const p = ev.entity as Player
            p.setSpawnPoint({ x: p.location.x, y: p.location.y, z: p.location.z, dimension: p.dimension })
            if (ev.newValue <= 0) {
                setGameMode(p, 'spectator');
                PropertyManager.entity(p).get('alive').update(false);
                p.sendMessage("You've been eliminated. You will Respawn in next round.");
            }
        })
    }
    static unsubscribe = (ev: (args: EntityHealthChangedAfterEvent) => void) => world.afterEvents.entityHealthChanged.unsubscribe(ev)
}
export default entityHealthChange