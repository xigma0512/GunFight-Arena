import { world } from "@minecraft/server";
import { EntityHealthChangedAfterEvent, GameMode, Player } from "@minecraft/server"

import { revival } from "../../utils/revival";
import { PropertyManager } from "../../property/_manager";
import { Team } from "../../declare/enums";
import PTeamScore from "../../property/world/team_score";

function playerDead(player: Player) {
    const team = PropertyManager.entity(player).get('team').value
    const pscore = PropertyManager.world().get('team_score') as PTeamScore
    if (team == Team.Blue) pscore.updateTeamScore(Team.Red, 1)
    if (team == Team.Red) pscore.updateTeamScore(Team.Blue, 1)

    player.getComponent('inventory')?.container?.clearAll();
    player.setGameMode(GameMode.spectator);
    player.sendMessage("You've been eliminated. Respawn in 5 seconds!")
    revival(player);
}

abstract class entityHealthChange {
    static subscribe = () => {
        return world.afterEvents.entityHealthChanged.subscribe(ev => {

            if (ev.entity.typeId !== 'minecraft:player') return

            const p = ev.entity as Player
            p.setSpawnPoint({ x: p.location.x, y: p.location.y, z: p.location.z, dimension: p.dimension })
            if (ev.newValue <= 0) playerDead(p);
        })
    }
    static unsubscribe = (ev: (args: EntityHealthChangedAfterEvent) => void) => world.afterEvents.entityHealthChanged.unsubscribe(ev)
}
export default entityHealthChange