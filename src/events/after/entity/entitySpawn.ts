import { EntitySpawnAfterEvent, world } from "@minecraft/server";
import { DroppedBombHandler } from "../../../game/bomb/droppedBomb";
import { BroadcastUtils } from "../../../utils/broadcast";

export default abstract class entitySpawn {
    static subscribe = () => {
        return world.afterEvents.entitySpawn.subscribe(ev => {
            world.getDimension('overworld').getEntities({ type: 'minecraft:item', name: 'C4' }).forEach(entity => {
                const [result, _] = DroppedBombHandler.instance.summon(entity.location);
                if (!result) return;

                entity.remove();
                BroadcastUtils.message("§eBomb has been dropped.", 'message');
            });
        })
    }
    static unsubscribe = (ev: (args: EntitySpawnAfterEvent) => void) => world.afterEvents.entitySpawn.unsubscribe(ev)
}