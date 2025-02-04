import { Player, PlayerInteractWithEntityBeforeEvent, system, world } from "@minecraft/server";
import { DroppedBombHandler } from "../../game/bomb/droppedBomb";
import { BroadcastUtils } from "../../utils/broadcast";

export default abstract class playerInteractWithEntity {
    static subscribe = () => {
        return world.beforeEvents.playerInteractWithEntity.subscribe(ev => {
            if (ev.target.typeId !== "gunfight_arena:dropped_bomb") return;
            system.run(() => pickUpBomb(ev.player));
        })
    }
    static unsubscribe = (ev: (args: PlayerInteractWithEntityBeforeEvent) => void) => world.beforeEvents.playerInteractWithEntity.unsubscribe(ev)
}

function pickUpBomb(owner: Player) {
    const [result, _] = DroppedBombHandler.instance.remove(owner);

    if (!result) return;

    owner.sendMessage("§aSuccessfully Picked Up the Bomb");
    owner.playSound("armor.equip_netherite");
    BroadcastUtils.message("§l§eBomb has been pick up.", 'message');
}