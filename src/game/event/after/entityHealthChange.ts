import { Container, ItemStack, Vector3, world } from "@minecraft/server";
import { EntityHealthChangedAfterEvent, Player } from "@minecraft/server"

import Property from "../../property/_handler";
import { Utils } from "../../../core/utils/utils";

abstract class entityHealthChange {
    static subscribe = () => {
        return world.afterEvents.entityHealthChanged.subscribe(ev => {

            if (ev.entity.typeId !== 'minecraft:player') return;

            const player = ev.entity as Player

            player.setSpawnPoint({
                x: player.location.x,
                y: player.location.y,
                z: player.location.z,
                dimension: player.dimension
            });
            if (ev.newValue <= 0) playerDead(player, player.location);
        })
    }
    static unsubscribe = (ev: (args: EntityHealthChangedAfterEvent) => void) => world.afterEvents.entityHealthChanged.unsubscribe(ev)
}
export default entityHealthChange


function playerDead(player: Player, location: Vector3) {
    Utils.setGameMode(player, 'spectator');
    Property.entity(player).get('alive').update(false);

    const container = player.getComponent('inventory')?.container as Container;
    for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
        const item = container.getItem(slotIndex);
        if (item === undefined) continue;
        if (item.typeId === "gunfight_arena:c4") {
            world.getDimension('overworld').spawnItem(new ItemStack("gunfight_arena:c4"), location);
            return;
        }
    }

    player.sendMessage("You've been eliminated. You will Respawn in next round.");
}