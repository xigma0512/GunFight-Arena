import { EntityDieAfterEvent, Player, world } from "@minecraft/server"
import Property from "../../../property/_handler"
import { Team } from "../../../declare/enums";
import { BroadcastUtils } from "../../../utils/broadcast";
import PTempStat from "../../../property/entity/temp_stat";

export default abstract class entityDie {
    static subscribe = () => {
        return world.afterEvents.entityDie.subscribe(ev => {
            const teamTag = (t: Team) => (t == Team.Blue ? "§b[BLUE]" : (t == Team.Red ? "§c[RED]" : "§7[Unknown]"));

            const deadEntity = ev.deadEntity as Player;
            if (deadEntity.typeId !== "minecraft:player") return;

            const deadEntityStat = Property.entity(deadEntity).get('temp_stat') as PTempStat;
            deadEntityStat.updateStat('deaths', deadEntityStat.getStat('deaths') + 1);

            const deadEntityTeam = Property.entity(deadEntity).get('team').value as Team;

            const killer = ev.damageSource.damagingEntity as Player;
            if (killer === undefined || killer.typeId !== "minecraft:player") {
                BroadcastUtils.message(`§l§4DEAD ${teamTag(deadEntityTeam)}${deadEntity.name}`, 'message');
            } else {
                const killerTeam = Property.entity(killer).get('team').value as Team;
                BroadcastUtils.message(`§l${teamTag(killerTeam)}${killer.name} §4KILLED ${teamTag(deadEntityTeam)}${deadEntity.name}`, 'message');

                const killerStat = Property.entity(killer).get('temp_stat') as PTempStat;
                killerStat.updateStat('kills', killerStat.getStat('kills') + 1);
            }
        })
    }
    static unsubscribe = (ev: (args: EntityDieAfterEvent) => void) => world.afterEvents.entityDie.unsubscribe(ev)
}