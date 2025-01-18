import { world } from "@minecraft/server";
import { EntityDieAfterEvent, Player } from "@minecraft/server"

import { PropertyManager } from "../../property/_manager";
import { Team } from "../../declare/enums";
import { PTeamScore } from "../../property/world/team_score";

abstract class entityDie {
    static subscribe = () => {
        return world.afterEvents.entityDie.subscribe(ev => {

            const player = ev.deadEntity as Player;
            if (player.typeId !== 'minecraft:player') return

            const team = PropertyManager.entity(player).get('team').value
            const pscore = PropertyManager.world().get('team_score') as PTeamScore
            if (team == Team.Blue) pscore.updateTeamScore(Team.Red, 1)
            if (team == Team.Red) pscore.updateTeamScore(Team.Blue, 1)
        })
    }
    static unsubscribe = (ev: (args: EntityDieAfterEvent) => void) => world.afterEvents.entityDie.unsubscribe(ev)
}
export default entityDie