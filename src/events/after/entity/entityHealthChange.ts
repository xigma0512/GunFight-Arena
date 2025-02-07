import { Container, Vector3, world } from "@minecraft/server";
import { EntityHealthChangedAfterEvent, Player } from "@minecraft/server"
import { DroppedBombHandler } from "../../../game/bomb/droppedBomb";

import Property from "../../../property/_handler";
import { PlayerUtils } from "../../../utils/player";
import { BroadcastUtils } from "../../../utils/broadcast";

export default abstract class entityHealthChange {
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
            if (ev.newValue <= 0) playerDead(player);
        })
    }
    static unsubscribe = (ev: (args: EntityHealthChangedAfterEvent) => void) => world.afterEvents.entityHealthChanged.unsubscribe(ev)
}


function playerDead(player: Player) {
    PlayerUtils.setGameMode(player, 'spectator');
    Property.entity(player).get('alive').update(false);

    const container = player.getComponent('inventory')?.container as Container;
    for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
        const item = container.getItem(slotIndex);
        if (item === undefined) continue;
        if (item.typeId === "gunfight_arena:c4") return dropBomb(player);
    }
    player.sendMessage("You've been eliminated. You will Respawn in next round.");
}

function dropBomb(player: Player) {
    const [result, _] = DroppedBombHandler.instance.summon(player.location);

    if (!result) return;

    BroadcastUtils.message("§cThe Bomb Carrier was killed, Bomb Dropped.", 'message');
}