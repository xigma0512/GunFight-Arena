import { DroppedBombHandler } from "../../../game/bomb/droppedBomb";

import Property from "../../../property/_handler";
import { PlayerUtils } from "../../../utils/player";
import { BroadcastUtils } from "../../../utils/broadcast";
import { States } from "../../../declare/enums";
import Demolition from "../../../game/modes/demolition/_handler";

import { Container, Player, world } from "@minecraft/server";
import { EntityHealthChangedAfterEvent, EntityInventoryComponent } from "@minecraft/server"

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
            if (ev.newValue <= 0) {
                if (Demolition.instance.getCurrentState() === States.Demolition.Idle) return;
                playerDead(player);
            }
        })
    }
    static unsubscribe = (ev: (args: EntityHealthChangedAfterEvent) => void) => world.afterEvents.entityHealthChanged.unsubscribe(ev)
}


function playerDead(player: Player) {
    PlayerUtils.setGameMode(player, 'spectator');
    Property.entity(player).get('alive').update(false);

    const container = (player.getComponent('inventory') as EntityInventoryComponent).container as Container;
    for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
        const item = container.getItem(slotIndex);
        if (item === undefined) continue;
        if (item.typeId === "gunfight_arena:c4") return dropBomb(player);
    }
    player.sendMessage("§7You've been eliminated. You will Respawn in next round.");
    player.playSound('random.hurt');
}

function dropBomb(player: Player) {
    const [result, _] = DroppedBombHandler.instance.summon(player.location);

    if (!result) return;

    BroadcastUtils.message("§cThe Bomb Carrier was killed, Bomb Dropped.", 'message');
    BroadcastUtils.sound("block.turtle_egg.drop", {pitch: 2});
}