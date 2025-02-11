import Property from "../../../property/_handler";
import Demolition from "../../../game/modes/demolition/_handler";
import { PlantedBombHandler } from "../../../game/bomb/plantedBomb";

import { Mode, States, Team } from "../../../declare/enums";
import { BroadcastUtils } from "../../../utils/broadcast";

import { ItemCompleteUseAfterEvent, Player, world } from "@minecraft/server";
import PTempStat from "../../../property/entity/temp_stat";

export default abstract class itemCompleteUse {
    static subscribe = () => {
        return world.afterEvents.itemCompleteUse.subscribe(ev => {
            if (Property.world().get('game_mode').value != Mode.Demolition) return;

            const item = ev.itemStack;
            if (item.typeId === "gunfight_arena:c4") plantBomb(ev.source);
            if (item.typeId === "gunfight_arena:wire_stripper") defuseBomb(ev.source);
        });
    }
    static unsubscribe = (ev: (args: ItemCompleteUseAfterEvent) => void) => world.afterEvents.itemCompleteUse.unsubscribe(ev)
}

function plantBomb(player: Player) {
    const [result, error] = PlantedBombHandler.instance.summon(player);

    if (!result) return player.sendMessage(error);

    const tempStat = Property.entity(player).get('temp_stat') as PTempStat;
    tempStat.updateStat('planted', tempStat.getStat('planted') + 1);

    BroadcastUtils.message(`§l§cBomb Has Been Planted §fBy §e${player.name}.`, 'message');
    BroadcastUtils.sound('random.fuse');
    Demolition.instance.getState(States.Demolition.BombPlanted).entry();
}

function defuseBomb(player: Player) {
    const [result, error] = PlantedBombHandler.instance.remove(player);

    if (!result) return player.sendMessage(error);

    const tempStat = Property.entity(player).get('temp_stat') as PTempStat;
    tempStat.updateStat('defused', tempStat.getStat('defused') + 1);

    BroadcastUtils.message(`§l§aBomb has Been Defused §fBy §e${player.name}.`, 'message');
    BroadcastUtils.sound('note.bell');
    Demolition.instance.getState(States.Demolition.BombPlanted).exit(Team.Blue);
}